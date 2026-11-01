/**
 * Utility functions for asset handling
 */

export function isVideoAsset(filename: string): boolean {
  const ext = filename.split('.').pop()?.toLowerCase();
  return ext === 'mp4' || ext === 'webm' || ext === 'mov';
}

export function formatMediaTitle(filename: string): string {
  // Strip extension
  const withoutExt = filename.replace(/\.[^/.]+$/, '');
  // Format numbers or snake/kebab-case into title
  return withoutExt.replace(/[-_]/g, ' ');
}

