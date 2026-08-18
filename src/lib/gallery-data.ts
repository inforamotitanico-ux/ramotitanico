// src/lib/gallery-data.ts

// Interface for gallery items
export interface GalleryItem {
  category: string;
  caption: string;
  src: string;
}

// Interface for folder
export interface GalleryFolder {
  name: string;
  items: GalleryItem[];
}

// Import all conference images using Vite's import.meta.glob
const conferenceGlob = import.meta.glob("/src/assets/conference/*.jpeg", {
  eager: true,
  import: "default",
}) as Record<string, string>;

// Filter out banner image and sort
const conferencePhotos = Object.entries(conferenceGlob)
  .filter(([path]) => !path.endsWith("/banner.jpeg"))
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, url]) => url);

// Define folder names
export const FOLDERS = {
  ONLINE_CONFERENCE: "Online Conference — 26–27 June 2026",
} as const;

// Create gallery items
const onlineConferenceItems: GalleryItem[] = conferencePhotos.map((src, i) => ({
  category: FOLDERS.ONLINE_CONFERENCE,
  caption: `Online Conference, 26–27 June 2026 — photo ${i + 1}`,
  src,
}));

// Combine all items
export const galleryItems: GalleryItem[] = [
  ...onlineConferenceItems,
];

// Group items by folder
export const galleryFolders: GalleryFolder[] = [
  {
    name: FOLDERS.ONLINE_CONFERENCE,
    items: onlineConferenceItems,
  },
];

// Helper functions
export const getFolderByName = (name: string): GalleryFolder | undefined => {
  return galleryFolders.find(folder => folder.name === name);
};

export const getItemsByFolder = (folderName: string): GalleryItem[] => {
  const folder = getFolderByName(folderName);
  return folder ? folder.items : [];
};

export const getFolderCount = (): number => {
  return galleryFolders.length;
};

export const getTotalItemsCount = (): number => {
  return galleryItems.length;
};

export const getFolderItemCount = (folderName: string): number => {
  const folder = getFolderByName(folderName);
  return folder ? folder.items.length : 0;
};

export const getFolderNames = (): string[] => {
  return galleryFolders.map(folder => folder.name);
};

// Check if a folder has any items
export const folderHasItems = (folderName: string): boolean => {
  const folder = getFolderByName(folderName);
  return folder ? folder.items.length > 0 : false;
};