import { createFileRoute, Link } from "@tanstack/react-router";
import { Archive, FileText, ExternalLink, X } from "lucide-react";
import { useState } from "react";
import { PageHero } from "@/components/ui/page-hero";
import { SectionTitle } from "@/components/ui/section-title";

// Import the same PDF files used in Current Issue
import sketchingDissentPdf from "@/assets/articles/SKETCHING DISSENT.pdf?url";
import comparativeStudyPdf from "@/assets/articles/COMPARATIVE STUDY OF HUMAN AND MACHINE TRANSLATIONS.pdf?url";
import hydrosocialCyclePdf from "@/assets/articles/The Hydrosocial Cycle Water as Culture.pdf?url";

export const Route = createFileRoute("/archives")({
  head: () => ({
    meta: [
      { title: "Archives — Ramotitanico" },
      {
        name: "description",
        content:
          "Past volumes and issues of the Ramotitanico Journal of Education, Research & Sustainable Innovation.",
      },
      {
        property: "og:title",
        content: "Archives — Ramotitanico",
      },
      {
        property: "og:description",
        content: "Browse past issues of the journal by volume and year.",
      },
      {
        property: "og:url",
        content: "/archives",
      },
    ],
    links: [{ rel: "canonical", href: "/archives" }],
  }),
  component: ArchivesPage,
});

const issues = [
  {
    volume: "Volume 1, Issue 1",
    year: "2026",
    articles: [
      {
        title:
          "SKETCHING DISSENT: MULTIMODAL HUMOUR AND NONVIOLENT RESISTANCE IN PAKISTANI COMICS",
        authors: "A. Sehrish, A. Mahwish, A. Afshan",
        pages: "1–17",
        pdf: sketchingDissentPdf,
      },
      {
        title:
          "COMPARATIVE STUDY OF HUMAN AND MACHINE TRANSLATIONS: A LINGUISTIC ANALYSIS OF LI BAI'S CHANGGAN BALLADS",
        authors: "U. Inam, F. Laiba",
        pages: "18–31",
        pdf: comparativeStudyPdf,
      },
      {
        title:
          "THE HYDROSOCIAL CYCLE: WATER AS CULTURE, NOT JUST RESOURCE; REIMAGINING SMALLHOLDER IRRIGATION DEVELOPMENT IN ZIMBABWE",
        authors:
          "P. Vimbai, R. Lorraine, Z. Shingirirai, C. Tendai",
        pages: "32–47",
        pdf: hydrosocialCyclePdf,
      },
    ],
  },
];

function ArchivesPage() {
  const [selectedIssue, setSelectedIssue] = useState<
    (typeof issues)[number] | null
  >(null);

  return (
    <>
      <PageHero
        eyebrow="Journal Archive"
        title="Archives"
        description="Browse past volumes and issues of the Ramotitanico Journal."
      />

      <section className="container-page py-20">
        <SectionTitle eyebrow="Past Issues" title="Issue Archive" />

        {/* Issue Cards */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {issues.map((iss) => (
            <button
              key={iss.volume}
              type="button"
              onClick={() => setSelectedIssue(iss)}
              className="flex w-full items-center gap-4 rounded-2xl border border-border bg-card p-6 text-left shadow-[var(--shadow-card)] transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-elevated)]"
            >
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground">
                <Archive className="h-6 w-6" />
              </span>

              <div>
                <h3 className="font-display text-lg font-semibold text-primary">
                  {iss.volume}
                </h3>

                <p className="mt-1 text-sm text-muted-foreground">
                  {iss.year} · {iss.articles.length} articles
                </p>
              </div>
            </button>
          ))}
        </div>

        <p className="mt-10 text-sm text-muted-foreground">
          Looking for the latest issue?{" "}
          <Link
            to="/current-issue"
            className="font-medium text-primary underline underline-offset-4"
          >
            View the current issue
          </Link>
          .
        </p>
      </section>

      {/* =========================
          ISSUE POPUP
      ========================= */}

      {selectedIssue && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onClick={() => setSelectedIssue(null)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-3xl bg-background p-6 shadow-2xl sm:p-8 lg:p-10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedIssue(null)}
              className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label="Close popup"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Popup Header */}
            <div className="pr-14">
              <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
                {selectedIssue.year}
              </span>

              <h2 className="mt-4 font-display text-3xl font-bold text-primary sm:text-4xl">
                {selectedIssue.volume}
              </h2>

              <p className="mt-2 text-sm text-muted-foreground">
                {selectedIssue.articles.length} articles
              </p>
            </div>

            {/* Articles */}
            <div className="mt-8 space-y-6">
              {selectedIssue.articles.map((a) => (
                <article
                  key={a.title}
                  className="group rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg"
                >
                  <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
                    {/* Left - Article Information */}
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

                    {/* Right - Read Button + Pages */}
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

            {/* Bottom Close Button */}
            <div className="mt-8 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedIssue(null)}
                className="rounded-xl border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}