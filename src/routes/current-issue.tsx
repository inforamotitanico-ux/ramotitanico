import { createFileRoute } from "@tanstack/react-router";
import { FileText, ExternalLink } from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { SectionTitle } from "@/components/ui/section-title";
import journalCoverImage from "@/assets/Book-Cover.png";
// Import the PDF files - matching your existing pattern
import sketchingDissentPdf from "@/assets/articles/SKETCHING DISSENT MULTIMODAL HUMOUR AND NONVIOLENT RESISTANCE IN PAKISTANI COMICS.pdf?url";
import comparativeStudyPdf from "@/assets/articles/COMPARATIVE STUDY OF HUMAN AND MACHINE TRANSLATIONS.pdf?url";

export const Route = createFileRoute("/current-issue")({
  head: () => ({
    meta: [
      { title: "Current Issue — Ramotitanico" },
      { 
        name: "description", 
        content: "Table of contents for the current issue of the Ramotitanico Journal of Education, Research & Sustainable Innovation." 
      },
      { property: "og:title", content: "Current Issue — Ramotitanico" },
      { property: "og:description", content: "Read the latest issue's table of contents." },
      { property: "og:url", content: "/current-issue" },
    ],
    links: [{ rel: "canonical", href: "/current-issue" }],
  }),
  component: CurrentIssuePage,
});

const articles = [
  { 
    title: "SKETCHING DISSENT: MULTIMODAL HUMOUR AND NONVIOLENT RESISTANCE IN PAKISTANI COMICS", 
    authors: "A. Sehrish, A. Mahwish, A. Afshan", 
    pages: "1–17",
    pdf: sketchingDissentPdf
  },
  { 
    title: "COMPARATIVE STUDY OF HUMAN AND MACHINE TRANSLATIONS: A LINGUISTIC ANALYSIS OF LI BAI'S CHANGGAN BALLADS", 
    authors: "U. Inam, F. Laiba", 
    pages: "18–31",
    pdf: comparativeStudyPdf
  }
];

function CurrentIssuePage() {
  return (
    <>
      <PageHero
        backTo="/journal"
        backLabel="Journal Services"
        eyebrow="Current Issue"
        title="Volume 1, Issue 1 — 2026."
        description="Five peer-reviewed articles on curriculum reform, sustainability literacy, digital pedagogy, and comparative education policy."
      />

      {/* Image + Journal Info Section */}
      <section className="container-page py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Side - Image */}
          <div className="relative flex items-center justify-center rounded-2xl p-8">
            <img 
              src={journalCoverImage}
              alt="Academia Humanities Review Journal Cover"
              className="h-auto max-h-[500px] w-auto max-w-full object-contain"
            />
          </div>

          {/* Right Side - Text Content */}
          <div className="flex flex-col justify-center space-y-6">
            <div>
              <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
                Current Issue
              </span>
              <h2 className="mt-4 font-display text-3xl font-bold text-primary sm:text-4xl">
                A Platform for Humanities Scholarship
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                The Academia Humanities Review provides a rigorous, open-access forum for researchers across literature, linguistics, cultural studies, translation, and education — fostering dialogue between disciplines and across traditions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Table of Contents Section */}
      <section className="container-page py-20">
        <SectionTitle eyebrow="Table of Contents" title="In This Issue" />

        <div className="mt-10 space-y-6">
          {articles.map((a, index) => (
            <article
              key={a.title}
              className="group rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg"
            >
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
                {/* Left */}
                <div className="flex flex-1 gap-5">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <FileText className="h-7 w-7" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="font-display text-xl font-semibold leading-snug text-primary transition-colors group-hover:text-primary/80">
                      {a.title}
                    </h3>

                    <p className="mt-2 text-sm text-muted-foreground">
                      {a.authors}
                    </p>
                  </div>
                </div>

                {/* Right - Button and Page Numbers */}
                <div className="flex flex-col items-end gap-3">
                  <a
                    href={a.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:scale-105 hover:bg-primary/90"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Read Article
                  </a>
                  
                  <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                    pp. {a.pages}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}