// src/lib/gallery-data.ts

// Interface for gallery items
export interface GalleryItem {
  category: string;
  caption: string;
  src: string;
  type: "image" | "video";
  poster?: string; // optional poster image for videos
}

// Interface for folder
export interface GalleryFolder {
  name: string;
  items: GalleryItem[];
}

// ---------- Folder 1: Online Conference ----------
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

// ---------- Folder 2: Conference 2 (images + videos) ----------
const conference2ImagesGlob = import.meta.glob(
  "/src/assets/conference_2/*.{jpeg,jpg,png,webp}",
  { eager: true, import: "default" }
) as Record<string, string>;

const conference2VideosGlob = import.meta.glob(
  "/src/assets/conference_2/*.{mp4,webm,ogg,mov}",
  { eager: true, import: "default" }
) as Record<string, string>;

// Optional: posters for videos (same base name, image extension)
const conference2PostersGlob = import.meta.glob(
  "/src/assets/conference_2/posters/*.{jpeg,jpg,png,webp}",
  { eager: true, import: "default" }
) as Record<string, string>;

const conference2Images = Object.entries(conference2ImagesGlob)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, url]) => url);

const conference2Videos = Object.entries(conference2VideosGlob)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([path, url]) => {
    const filename = path.split("/").pop() || "";
    const base = filename.replace(/\.[^.]+$/, "");
    const posterEntry = Object.entries(conference2PostersGlob).find(
      ([p]) => p.split("/").pop()?.replace(/\.[^.]+$/, "") === base
    );
    return { src: url, poster: posterEntry?.[1] };
  });

// Define folder names
export const FOLDERS = {
  ONLINE_CONFERENCE: "Online Conference — 26–27 June 2026",
  CONFERENCE_2: "2nd Directioanl Conference 3-4 Oct 2026",
} as const;

// ---------- Build gallery items ----------
const onlineConferenceItems: GalleryItem[] = conferencePhotos.map((src, i) => ({
  category: FOLDERS.ONLINE_CONFERENCE,
  caption: `Online Conference, 26–27 June 2026 — photo ${i + 1}`,
  src,
  type: "image",
}));

const conference2Items: GalleryItem[] = [
  ...conference2Images.map((src, i) => ({
    category: FOLDERS.CONFERENCE_2,
    caption: `2nd Conference — photo ${i + 1}`,
    src,
    type: "image" as const,
  })),
  ...conference2Videos.map((v, i) => ({
    category: FOLDERS.CONFERENCE_2,
    caption: `2nd Conference — video ${i + 1}`,
    src: v.src,
    type: "video" as const,
    poster: v.poster,
  })),
];

// Combine all items
export const galleryItems: GalleryItem[] = [
  ...onlineConferenceItems,
  ...conference2Items,
];

// Group items by folder
export const galleryFolders: GalleryFolder[] = [
  {
    name: FOLDERS.ONLINE_CONFERENCE,
    items: onlineConferenceItems,
  },
  {
    name: FOLDERS.CONFERENCE_2,
    items: conference2Items,
  },
];

// ---------- Helper functions ----------
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

// Filter items by media type
export const getItemsByType = (type: "image" | "video"): GalleryItem[] => {
  return galleryItems.filter(item => item.type === type);
};