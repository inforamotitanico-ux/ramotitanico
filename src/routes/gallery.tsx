// src/routes/gallery.tsx
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Folder, Play, X } from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import {
  galleryFolders,
  getItemsByFolder,
  type GalleryItem,
} from "@/lib/gallery-data";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Ramotitanico" },
      {
        name: "description",
        content:
          "Photographs and videos from Ramotitanico conferences, workshops, cultural events, and certificate ceremonies.",
      },
      { property: "og:title", content: "Gallery — Ramotitanico" },
      {
        property: "og:description",
        content: "A visual record of our international academic programmes.",
      },
      { property: "og:url", content: "/gallery" },
    ],
    links: [{ rel: "canonical", href: "/gallery" }],
  }),
  component: GalleryPage,
});

// Helper to get a thumbnail for folder covers and video tiles
function getThumbnail(item: GalleryItem): string | undefined {
  if (item.type === "video") return item.poster;
  return item.src;
}

function GalleryPage() {
  const [openFolder, setOpenFolder] = useState<string | null>(null);
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);

  const itemsInFolder = openFolder ? getItemsByFolder(openFolder) : [];

  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="Moments from Our Programmes"
        description="A visual record of conferences, workshops, cultural exchanges, and certificate ceremonies — organised into folders."
      />

      <section className="container-page py-20">
        {!openFolder ? (
          // ---------- Folder Grid View ----------
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {galleryFolders.map((folder) => {
              // Prefer an image as the cover; fall back to a video poster
              const coverItem =
                folder.items.find((i) => i.type === "image") ?? folder.items[0];
              const cover = coverItem ? getThumbnail(coverItem) : undefined;
              const photoCount = folder.items.filter(
                (i) => i.type === "image"
              ).length;
              const videoCount = folder.items.filter(
                (i) => i.type === "video"
              ).length;

              return (
                <button
                  key={folder.name}
                  onClick={() => setOpenFolder(folder.name)}
                  className="group relative overflow-hidden rounded-2xl border border-border bg-card text-left shadow-[var(--shadow-card)] transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-elevated)]"
                  style={{ aspectRatio: "4/3" }}
                >
                  {cover ? (
                    <img
                      src={cover}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="h-full w-full bg-muted" />
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
                        {photoCount > 0 && (
                          <>
                            {photoCount} photo{photoCount !== 1 ? "s" : ""}
                          </>
                        )}
                        {photoCount > 0 && videoCount > 0 && " · "}
                        {videoCount > 0 && (
                          <>
                            {videoCount} video{videoCount !== 1 ? "s" : ""}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        ) : (
          // ---------- Single Folder View ----------
          <>
            <button
              onClick={() => setOpenFolder(null)}
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-all hover:gap-3"
            >
              <ArrowLeft className="h-4 w-4" /> Back to folders
            </button>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-lg bg-primary text-primary-foreground">
                <Folder className="h-5 w-5" />
              </span>
              <h2 className="font-display text-2xl font-semibold text-primary">
                {openFolder}
              </h2>
              <span className="ml-2 text-sm text-muted-foreground">
                ({itemsInFolder.length} item
                {itemsInFolder.length !== 1 ? "s" : ""})
              </span>
            </div>

            {/* Media Grid */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {itemsInFolder.map((item, index) => {
                const isVideo = item.type === "video";
                return (
                  <button
                    key={item.src}
                    onClick={() => setLightbox(item)}
                    className="group relative overflow-hidden rounded-2xl border border-border bg-card text-left shadow-[var(--shadow-card)] transition-all hover:shadow-[var(--shadow-elevated)]"
                    style={{ aspectRatio: index % 5 === 0 ? "4/5" : "4/3" }}
                  >
                    {isVideo ? (
                      item.poster ? (
                        <img
                          src={item.poster}
                          alt={item.caption}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <video
                          src={item.src}
                          muted
                          playsInline
                          preload="metadata"
                          className="h-full w-full object-cover"
                        />
                      )
                    ) : (
                      <img
                        src={item.src}
                        alt={item.caption}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    )}

                    {/* Video play badge */}
                    {isVideo && (
                      <span className="absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-background/85 text-primary shadow-lg transition-transform group-hover:scale-110">
                        <Play className="h-6 w-6 translate-x-0.5" fill="currentColor" />
                      </span>
                    )}

                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary/85 to-transparent p-4">
                      <div className="text-[10px] font-semibold uppercase tracking-wider text-accent">
                        {item.category}
                      </div>
                      <div className="mt-0.5 text-sm font-medium text-primary-foreground">
                        {item.caption}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </>
        )}
      </section>

      {/* ---------- Lightbox ---------- */}
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
          <figure
            className="max-h-[88vh] max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            {lightbox.type === "video" ? (
              <video
                src={lightbox.src}
                poster={lightbox.poster}
                controls
                autoPlay
                playsInline
                className="max-h-[80vh] w-full rounded-xl bg-black object-contain"
              />
            ) : (
              <img
                src={lightbox.src}
                alt={lightbox.caption}
                className="max-h-[80vh] w-full rounded-xl object-contain"
              />
            )}
            <figcaption className="mt-3 text-center text-sm text-primary-foreground/80">
              {lightbox.caption}
            </figcaption>
          </figure>
        </div>
      )}
    </>
  );
}