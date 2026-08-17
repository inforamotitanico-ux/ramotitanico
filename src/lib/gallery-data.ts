// src/lib/gallery-data.ts

// Import conference PDFs
import conferencePdf1 from "@/assets/conference/Humanities Conference presentation June 2026.pdf";
import conferencePdf2 from "@/assets/conference/RISE-Europe_Presentation_June 2026.pdf";

// Interface for gallery items
export interface GalleryItem {
  category: string;
  caption: string;
  src: string;
}

// Interface for PDF downloads
export interface PdfDownload {
  label: string;
  href: string;
}

// Interface for folder
export interface GalleryFolder {
  name: string;
  items: GalleryItem[];
  pdfs?: PdfDownload[];
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

// Define PDFs for each folder
export const folderPdfs: Record<string, PdfDownload[]> = {
  [FOLDERS.ONLINE_CONFERENCE]: [
    { label: "Humanities Conference Presentation", href: conferencePdf1 },
    { label: "RISE-Europe Presentation", href: conferencePdf2 },
  ],
};

// Create gallery items
const onlineConferenceItems: GalleryItem[] = conferencePhotos.map((src, i) => ({
  category: FOLDERS.ONLINE_CONFERENCE,
  caption: `Online Conference, 26–27 June 2026 — photo ${i + 1}`,
  src,
}));

// Combine all items
export const galleryItems: GalleryItem[] = [
  // You can add items from other folders here in the future
  ...onlineConferenceItems,
];

// Group items by folder
export const galleryFolders: GalleryFolder[] = [
  {
    name: FOLDERS.ONLINE_CONFERENCE,
    items: onlineConferenceItems,
    pdfs: folderPdfs[FOLDERS.ONLINE_CONFERENCE],
  },
  // Add more folders here in the future:
  // {
  //   name: "Workshop — July 2026",
  //   items: workshopItems,
  //   pdfs: workshopPdfs,
  // },
];

// Helper functions
export const getFolderByName = (name: string): GalleryFolder | undefined => {
  return galleryFolders.find(folder => folder.name === name);
};

export const getItemsByFolder = (folderName: string): GalleryItem[] => {
  const folder = getFolderByName(folderName);
  return folder ? folder.items : [];
};

export const getPdfsByFolder = (folderName: string): PdfDownload[] => {
  const folder = getFolderByName(folderName);
  return folder ? folder.pdfs || [] : [];
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

// Get all folder names
export const getFolderNames = (): string[] => {
  return galleryFolders.map(folder => folder.name);
};

// Check if a folder has PDFs
export const folderHasPdfs = (folderName: string): boolean => {
  const folder = getFolderByName(folderName);
  return folder ? !!folder.pdfs && folder.pdfs.length > 0 : false;
};