// src/routes/gallery.tsx
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Download, Folder, X } from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { 
  galleryFolders, 
  getItemsByFolder, 
  getPdfsByFolder,
  getFolderNames,
  type GalleryItem,
  type GalleryFolder
} from "@/lib/gallery-data";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Ramotitanico" },
      { name: "description", content: "Photographs from Ramotitanico conferences, workshops, cultural events, and certificate ceremonies." },
      { property: "og:title", content: "Gallery — Ramotitanico" },
      { property: "og:description", content: "A visual record of our international academic programmes." },
      { property: "og:url", content: "/gallery" },
    ],
    links: [{ rel: "canonical", href: "/gallery" }],
  }),
  component: GalleryPage,
});

function GalleryPage() {
  const [openFolder, setOpenFolder] = useState<string | null>(null);
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);

  // Get folder names
  const folderNames = getFolderNames();

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
        title="Moments from Our Programmes."
        description="A visual record of conferences, workshops, cultural exchanges, and certificate ceremonies — organised into folders."
      />

      <section className="container-page py-20">
        {!openFolder ? (
          // Folder Grid View
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {galleryFolders.map((folder) => {
              const cover = folder.items[0];
              return (
                <button
                  key={folder.name}
                  onClick={() => setOpenFolder(folder.name)}
                  className="group relative overflow-hidden rounded-2xl border border-border bg-card text-left shadow-[var(--shadow-card)] transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-elevated)]"
                  style={{ aspectRatio: "4/3" }}
                >
                  {cover && (
                    <img
                      src={cover.src}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 flex items-center gap-3 p-4">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-accent text-accent-foreground">
                      <Folder className="h-5 w-5" />
                    </span>
                    <div>
                      <div className="font-display text-base font-semibold text-primary-foreground">
                        {folder.name}
                      </div>
                      <div className="text-xs text-primary-foreground/70">
                        {folder.items.length} photo{folder.items.length !== 1 ? "s" : ""}
                        {folder.pdfs && folder.pdfs.length > 0 && 
                          ` · ${folder.pdfs.length} PDF${folder.pdfs.length !== 1 ? "s" : ""}`
                        }
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        ) : (
          // Single Folder View
          <>
            <button
              onClick={() => setOpenFolder(null)}
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-all hover:gap-3"
            >
              <ArrowLeft className="h-4 w-4" /> Back to folders
            </button>

            <div className="mt-6 flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-lg bg-primary text-primary-foreground">
                <Folder className="h-5 w-5" />
              </span>
              <h2 className="font-display text-2xl font-semibold text-primary">
                {openFolder}
              </h2>
              <span className="ml-2 text-sm text-muted-foreground">
                ({photosInFolder.length} photos)
              </span>
            </div>

            {/* PDF Downloads */}
            {pdfsInFolder.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-3">
                {pdfsInFolder.map((pdf) => (
                  <a
                    key={pdf.href}
                    href={pdf.href}
                    download
                    className="inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground shadow-sm transition-all hover:brightness-95"
                  >
                    <Download className="h-4 w-4" />
                    {pdf.label}
                  </a>
                ))}
              </div>
            )}

            {/* Photo Grid */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {photosInFolder.map((item, index) => (
                <button
                  key={item.src}
                  onClick={() => setLightbox(item)}
                  className="group relative overflow-hidden rounded-2xl border border-border bg-card text-left shadow-[var(--shadow-card)] transition-all hover:shadow-[var(--shadow-elevated)]"
                  style={{ aspectRatio: index % 5 === 0 ? "4/5" : "4/3" }}
                >
                  <img
                    src={item.src}
                    alt={item.caption}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary/85 to-transparent p-4">
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-accent">
                      {item.category}
                    </div>
                    <div className="mt-0.5 text-sm font-medium text-primary-foreground">
                      {item.caption}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </>
        )}
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[100] grid place-items-center bg-primary/90 p-4 backdrop-blur-sm"
          onClick={() => setLightbox(null)}
        >
          <button
            type="button"
            aria-label="Close"
            className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full bg-background/90 text-primary"
            onClick={(e) => { 
              e.stopPropagation(); 
              setLightbox(null); 
            }}
          >
            <X className="h-5 w-5" />
          </button>
          <figure className="max-h-[88vh] max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <img 
              src={lightbox.src} 
              alt={lightbox.caption} 
              className="max-h-[80vh] w-full rounded-xl object-contain" 
            />
            <figcaption className="mt-3 text-center text-sm text-primary-foreground/80">
              {lightbox.caption}
            </figcaption>
          </figure>
        </div>
      )}
    </>
  );
}