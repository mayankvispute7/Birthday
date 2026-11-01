export type MediaType = 'image' | 'video';

export interface MediaItem {
  id: string;
  src: string;
  type: MediaType;
  filename: string;
  title: string;
}

export interface AssetManifest {
  memories: MediaItem[];
  aditi: MediaItem[];
}

