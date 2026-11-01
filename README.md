# Aditi's Birthday Universe ✨🎂

A beautiful, personal, and cinematic birthday website crafted with love for Aditi.

---

## 🚀 How to Run the Project

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Discover and sync assets**:
   ```bash
   npm run generate-assets
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Build for production**:
   ```bash
   npm run build
   npm run start
   ```

---

## 📝 Customization Guide

### 1. Where to Edit the Letter
Open `src/content/letter.ts` to customize:
- Salutation (`salutation: "Dearest Aditi,"`)
- Body paragraphs (`paragraphs: [...]`)
- Closing & signature (`closing`, `signature`)

### 2. Where to Edit the Central Birthday Message
Open `src/content/messages.ts` to edit:
- Central headline: `"To the person who makes ordinary moments special..."`
- Subtext and sparkle lines.

### 3. Where to Add New Memories
Add photos (`.jpg`, `.jpeg`, `.png`, `.webp`, `.gif`) or videos (`.mp4`, `.webm`, `.mov`) into:
```
memories/
```
The asset discovery script will automatically detect them and add them to the Memories Gallery.

### 4. Where to Add Aditi's Universe Photos
Add her photographs or videos into:
```
aditi/
```
These will automatically appear in **Aditi's Universe** (Gift #3).

---

## 🛠️ How the Asset Generation Script Works

The build script located at `scripts/generate-assets.mjs`:
1. Recursively scans `memories/` and `aditi/`.
2. Identifies all images and videos by file extension.
3. Synchronizes them into the Next.js `public/` directory for high-performance static delivery.
4. Generates a typed TypeScript asset manifest in `src/generated/assets-manifest.ts`.
5. Runs automatically before `npm run dev` and `npm run build` (`predev` and `prebuild` hooks), ensuring new media is immediately available without any manual code changes.

