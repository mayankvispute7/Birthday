import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif']);
const VIDEO_EXTENSIONS = new Set(['.mp4', '.webm', '.mov']);

function naturalCompare(a, b) {
  return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
}

function ensureDirSync(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function copyRecursive(srcDir, destDir) {
  if (!fs.existsSync(srcDir)) return;
  ensureDirSync(destDir);

  const entries = fs.readdirSync(srcDir, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(srcDir, entry.name);
    const destPath = path.join(destDir, entry.name);

    if (entry.isDirectory()) {
      copyRecursive(srcPath, destPath);
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (IMAGE_EXTENSIONS.has(ext) || VIDEO_EXTENSIONS.has(ext)) {
        // Copy only if destination does not exist or size/mtime differs
        let shouldCopy = true;
        if (fs.existsSync(destPath)) {
          const srcStat = fs.statSync(srcPath);
          const destStat = fs.statSync(destPath);
          if (srcStat.size === destStat.size && Math.abs(srcStat.mtimeMs - destStat.mtimeMs) < 1000) {
            shouldCopy = false;
          }
        }
        if (shouldCopy) {
          fs.copyFileSync(srcPath, destPath);
        }
      }
    }
  }
}

function scanDir(dirPath, urlPrefix) {
  if (!fs.existsSync(dirPath)) return [];

  const results = [];
  const seenPaths = new Set();

  function traverse(currentDir, currentUrl) {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });

    // Sort naturally for consistent order
    entries.sort((a, b) => naturalCompare(a.name, b.name));

    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);

      if (entry.isDirectory()) {
        traverse(fullPath, `${currentUrl}/${encodeURIComponent(entry.name)}`);
      } else if (entry.isFile()) {
        const ext = path.extname(entry.name).toLowerCase();
        let type = null;

        if (IMAGE_EXTENSIONS.has(ext)) {
          type = 'image';
        } else if (VIDEO_EXTENSIONS.has(ext)) {
          type = 'video';
        }

        if (type) {
          const srcUrl = `${currentUrl}/${encodeURIComponent(entry.name)}`;
          if (!seenPaths.has(srcUrl)) {
            seenPaths.add(srcUrl);
            results.push({
              id: `${type}-${results.length + 1}`,
              src: srcUrl,
              type,
              filename: entry.name,
              title: path.parse(entry.name).name,
            });
          }
        }
      }
    }
  }

  traverse(dirPath, urlPrefix);
  return results;
}

function main() {
  console.log('[Asset Discovery] Starting asset scanning and sync...');

  // Identify source folders (handle both "Assest" and "assets", "bday/*", etc.)
  const possibleAssetsDirs = [
    path.join(projectRoot, 'Assest'),
    path.join(projectRoot, 'assets'),
    path.join(projectRoot, 'bday', 'Assest'),
    path.join(projectRoot, 'bday', 'assets'),
  ];
  const sourceAssetsDir = possibleAssetsDirs.find(d => fs.existsSync(d));

  const possibleMemoriesDirs = [
    path.join(projectRoot, 'memories'),
    path.join(projectRoot, 'bday', 'memories'),
  ];
  const sourceMemoriesDir = possibleMemoriesDirs.find(d => fs.existsSync(d));

  const possibleAditiDirs = [
    path.join(projectRoot, 'aditi'),
    path.join(projectRoot, 'bday', 'aditi'),
  ];
  const sourceAditiDir = possibleAditiDirs.find(d => fs.existsSync(d));

  // Destination folders in public/
  const publicAssetsDir = path.join(projectRoot, 'public', 'assets');
  const publicMemoriesDir = path.join(projectRoot, 'public', 'memories');
  const publicAditiDir = path.join(projectRoot, 'public', 'aditi');

  ensureDirSync(publicAssetsDir);
  ensureDirSync(publicMemoriesDir);
  ensureDirSync(publicAditiDir);

  // Sync files from root source directories to public/ directories
  if (sourceAssetsDir) {
    console.log(`[Asset Discovery] Syncing assets from: ${sourceAssetsDir}`);
    copyRecursive(sourceAssetsDir, publicAssetsDir);
  }
  if (sourceMemoriesDir) {
    console.log(`[Asset Discovery] Syncing memories from: ${sourceMemoriesDir}`);
    copyRecursive(sourceMemoriesDir, publicMemoriesDir);
  }
  if (sourceAditiDir) {
    console.log(`[Asset Discovery] Syncing aditi from: ${sourceAditiDir}`);
    copyRecursive(sourceAditiDir, publicAditiDir);
  }

  // Scan public directories for manifest
  const memoriesAssets = scanDir(publicMemoriesDir, '/memories');
  const aditiAssets = scanDir(publicAditiDir, '/aditi');

  console.log(`[Asset Discovery] Found ${memoriesAssets.length} memories media items.`);
  console.log(`[Asset Discovery] Found ${aditiAssets.length} aditi media items.`);

  // Write TypeScript manifest
  const generatedDir = path.join(projectRoot, 'src', 'generated');
  ensureDirSync(generatedDir);

  const manifestContent = `// AUTO-GENERATED FILE. DO NOT EDIT DIRECTLY.
// Generated by scripts/generate-assets.mjs
import type { AssetManifest } from '@/types/assets';

export const assetManifest: AssetManifest = {
  memories: ${JSON.stringify(memoriesAssets, null, 2)},
  aditi: ${JSON.stringify(aditiAssets, null, 2)},
};
`;

  const manifestPath = path.join(generatedDir, 'assets-manifest.ts');
  fs.writeFileSync(manifestPath, manifestContent, 'utf-8');
  console.log(`[Asset Discovery] Successfully written manifest to: ${manifestPath}`);
}

main();

