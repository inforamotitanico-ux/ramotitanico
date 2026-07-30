import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Download, Folder, X } from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import bannerImg from "@/assets/conference/banner.jpeg";
import conferencePdf1 from "@/assets/conference/Humanities Conference presentation June 2026.pdf";
import conferencePdf2 from "@/assets/conference/RISE-Europe_Presentation_June 2026.pdf";

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

interface Item {
  category: string;
  caption: string;
  // Unsplash source URL — public CDN, no key needed
  src: string;
}

const conferenceGlob = import.meta.glob("/src/assets/conference/*.jpeg", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const conferencePhotos = Object.entries(conferenceGlob)
  .filter(([path]) => !path.endsWith("/banner.jpeg"))
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, url]) => url);

const onlineConferenceFolder = "Online Conference — 26–27 June 2026";

// const conferencePdfs = [
//   { label: "Humanities Conference Presentation", href: conferencePdf1 },
//   { label: "RISE-Europe Presentation", href: conferencePdf2 },
// ];

const items: Item[] = [
  { category: onlineConferenceFolder, caption: "Conference banner", src: bannerImg },
  ...conferencePhotos.map((src, i) => ({
    category: onlineConferenceFolder,
    caption: `Online Conference, 26–27 June 2026 — photo ${i + 1}`,
    src,
  })),
];

const folders = [onlineConferenceFolder] as const;

function GalleryPage() {
  const [openFolder, setOpenFolder] = useState<(typeof folders)[number] | null>(null);
  const [lightbox, setLightbox] = useState<Item | null>(null);

  const photosInFolder = openFolder ? items.filter((i) => i.category === openFolder) : [];

  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="Moments from Our Programmes."
        description="A visual record of conferences, workshops, cultural exchanges, and certificate ceremonies — organised into folders."
      />

      <section className="container-page py-20">
        {!openFolder ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {folders.map((f) => {
              const folderItems = items.filter((i) => i.category === f);
              const cover = folderItems[0];
              return (
                <button
                  key={f}
                  onClick={() => setOpenFolder(f)}
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
                      <div className="font-display text-base font-semibold text-primary-foreground">{f}</div>
                      <div className="text-xs text-primary-foreground/70">
                        {folderItems.length} photo{folderItems.length !== 1 ? "s" : ""}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        ) : (
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
              <h2 className="font-display text-2xl font-semibold text-primary">{openFolder}</h2>
            </div>

            {/* {openFolder === onlineConferenceFolder && (
              <div className="mt-6 flex flex-wrap gap-3">
                {conferencePdfs.map((pdf) => (
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
            )} */}

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {photosInFolder.map((it, i) => (
                <button
                  key={it.src}
                  onClick={() => setLightbox(it)}
                  className="group relative overflow-hidden rounded-2xl border border-border bg-card text-left shadow-[var(--shadow-card)] transition-all hover:shadow-[var(--shadow-elevated)]"
                  style={{ aspectRatio: i % 5 === 0 ? "4/5" : "4/3" }}
                >
                  <img
                    src={it.src}
                    alt={it.caption}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary/85 to-transparent p-4">
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-accent">{it.category}</div>
                    <div className="mt-0.5 text-sm font-medium text-primary-foreground">{it.caption}</div>
                  </div>
                </button>
              ))}
            </div>
          </>
        )}
      </section>

      {lightbox && (
        <div
          className="fixed inset-0 z-[100] grid place-items-center bg-primary/90 p-4 backdrop-blur-sm"
          onClick={() => setLightbox(null)}
        >
          <button
            type="button"
            aria-label="Close"
            className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full bg-background/90 text-primary"
            onClick={(e) => { e.stopPropagation(); setLightbox(null); }}
          >
            <X className="h-5 w-5" />
          </button>
          <figure className="max-h-[88vh] max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <img src={lightbox.src} alt={lightbox.caption} className="max-h-[80vh] w-full rounded-xl object-contain" />
            <figcaption className="mt-3 text-center text-sm text-primary-foreground/80">{lightbox.caption}</figcaption>
          </figure>
        </div>
      )}
    </>
  );
}
