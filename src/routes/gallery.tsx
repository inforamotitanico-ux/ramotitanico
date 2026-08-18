import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHero } from "@/components/ui/page-hero";
import { SectionTitle } from "@/components/ui/section-title";
import { Folder, File, Image, FileText, ChevronRight, X } from "lucide-react";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Ramotitanico" },
      { name: "description", content: "Photos and documents from Ramotitanico events, conferences, and activities." },
      { property: "og:title", content: "Gallery — Ramotitanico" },
      { property: "og:description", content: "Explore photos and resources from Ramotitanico's global academic events." },
      { property: "og:url", content: "/gallery" },
    ],
    links: [{ rel: "canonical", href: "/gallery" }],
  }),
  component: GalleryPage,
});

// Define the gallery folders structure
const galleryFolders = [
  {
    name: "Conference 2024",
    description: "Photos from the International Conference on Education & Research 2024",
    items: [
      { id: 1, type: "image", src: "/images/conference-1.jpg", title: "Opening Ceremony" },
      { id: 2, type: "image", src: "/images/conference-2.jpg", title: "Keynote Session" },
      { id: 3, type: "image", src: "/images/conference-3.jpg", title: "Panel Discussion" },
      { id: 4, type: "image", src: "/images/conference-4.jpg", title: "Networking" },
    ],
    pdfs: [
      { id: 101, name: "Programme Guide", url: "/pdfs/conference-2024-programme.pdf" },
      { id: 102, name: "Abstract Book", url: "/pdfs/conference-2024-abstracts.pdf" },
    ]
  },
  {
    name: "Workshop 2024",
    description: "Research Methodology Workshop",
    items: [
      { id: 5, type: "image", src: "/images/workshop-1.jpg", title: "Workshop Session" },
      { id: 6, type: "image", src: "/images/workshop-2.jpg", title: "Group Activity" },
    ],
    pdfs: [
      { id: 103, name: "Workshop Materials", url: "/pdfs/workshop-2024-materials.pdf" },
    ]
  },
];

// Helper function to get items by folder
const getItemsByFolder = (folderName: string) => {
  const folder = galleryFolders.find(f => f.name === folderName);
  return folder ? folder.items : [];
};

// Helper function to get PDFs by folder
const getPdfsByFolder = (folderName: string) => {
  const folder = galleryFolders.find(f => f.name === folderName);
  return folder ? folder.pdfs : [];
};

function GalleryPage() {
  const [openFolder, setOpenFolder] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<{ src: string; title: string } | null>(null);

  // Get items for the open folder
  const photosInFolder = openFolder ? getItemsByFolder(openFolder) : [];
  const pdfsInFolder = openFolder ? getPdfsByFolder(openFolder) : [];

  // Find current folder object for display
  const currentFolder = openFolder
    ? galleryFolders.find(f => f.name === openFolder)
    : null;

  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="Events, Activities & Resources."
        description="Explore photos and documents from our conferences, workshops, and academic events."
      />

      <section className="container-page py-20">
        {!openFolder ? (
          // Folder Grid View
          <>
            <SectionTitle
              eyebrow="Explore"
              title="Browse Our Archives."
              description="Click on a folder to view photos and resources from our events."
            />
            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {galleryFolders.map((folder) => (
                <button
                  key={folder.name}
                  onClick={() => setOpenFolder(folder.name)}
                  className="group rounded-2xl border border-border bg-card p-6 text-left shadow-[var(--shadow-card)] transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-elevated)]"
                >
                  <div className="flex items-center gap-4">
                    <span className="grid h-14 w-14 place-items-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <Folder className="h-7 w-7" />
                    </span>
                    <div className="flex-1">
                      <h3 className="font-display font-semibold text-primary">{folder.name}</h3>
                      <p className="text-sm text-muted-foreground">{folder.description}</p>
                      <p className="mt-1 text-xs text-muted-foreground/60">
                        {folder.items.length} photos · {folder.pdfs?.length || 0} documents
                      </p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
                  </div>
                </button>
              ))}
            </div>
          </>
        ) : (
          // Photos View inside a folder
          <>
            <div className="flex items-center justify-between border-b border-border pb-6">
              <div>
                <button
                  onClick={() => setOpenFolder(null)}
                  className="mb-2 inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  ← Back to folders
                </button>
                <h2 className="font-display text-2xl font-semibold text-primary">{openFolder}</h2>
                {currentFolder && (
                  <p className="text-sm text-muted-foreground">{currentFolder.description}</p>
                )}
              </div>
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                {photosInFolder.length} photos
              </span>
            </div>

            {/* Photos Grid */}
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {photosInFolder.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedImage({ src: item.src, title: item.title })}
                  className="group relative aspect-square overflow-hidden rounded-xl border border-border bg-secondary/30 transition-all hover:shadow-lg"
                >
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/5 to-secondary/20">
                    <Image className="h-12 w-12 text-muted-foreground/30" />
                  </div>
                  <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100">
                    <p className="w-full p-4 text-sm font-medium text-white">{item.title}</p>
                  </div>
                </button>
              ))}
            </div>

            {/* PDFs Section */}
            {pdfsInFolder.length > 0 && (
              <div className="mt-12">
                <h3 className="font-display text-xl font-semibold text-primary mb-4">Documents</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  {pdfsInFolder.map((pdf) => (
                    <a
                      key={pdf.id}
                      href={pdf.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-card)]"
                    >
                      <span className="grid h-12 w-12 place-items-center rounded-lg bg-primary/10 text-primary">
                        <FileText className="h-6 w-6" />
                      </span>
                      <div className="flex-1">
                        <h4 className="text-sm font-semibold text-primary">{pdf.name}</h4>
                        <p className="text-xs text-muted-foreground">PDF Document</p>
                      </div>
                      <File className="h-4 w-4 text-muted-foreground" />
                    </a>
                  ))}
                </div>
              </div>
            )}

            {photosInFolder.length === 0 && pdfsInFolder.length === 0 && (
              <div className="mt-20 text-center">
                <Folder className="mx-auto h-16 w-16 text-muted-foreground/30" />
                <p className="mt-4 text-muted-foreground">No items in this folder yet.</p>
              </div>
            )}
          </>
        )}
      </section>

      {/* Image Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
          >
            <X className="h-6 w-6" />
          </button>
          <div className="max-h-[80vh] max-w-4xl">
            <div className="flex h-96 w-full items-center justify-center rounded-lg bg-secondary/20">
              <Image className="h-20 w-20 text-white/20" />
            </div>
            {selectedImage.title && (
              <p className="mt-4 text-center text-sm text-white/80">{selectedImage.title}</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}