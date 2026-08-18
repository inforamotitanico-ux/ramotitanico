import { createFileRoute, Link } from "@tanstack/react-router";
import { Send, FileCheck2, FileText, CalendarCheck } from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { SectionTitle } from "@/components/ui/section-title";

export const Route = createFileRoute("/call-for-papers")({
  head: () => ({
    meta: [
      { title: "Call for Papers — Ramotitanico" },
      { name: "description", content: "Call for papers for the Ramotitanico Journal of Education, Research & Sustainable Innovation — themes, dates, and submission details." },
      { property: "og:title", content: "Call for Papers — Ramotitanico" },
      { property: "og:description", content: "Submit original research to the Ramotitanico Journal. Suggested themes and key dates for the next issue." },
      { property: "og:url", content: "/call-for-papers" },
    ],
    links: [{ rel: "canonical", href: "/call-for-papers" }],
  }),
  component: CallForPapersPage,
});

const themes = [
  "Future of Higher Education",
  "Research Methodology & Ethics",
  "Sustainability in Curricula",
  "Digital Pedagogy & AI",
  "Comparative Education Policy",
  "Equity, Access & Inclusion",
  "Humanities",
  "Literature",
  "Cultural Studies",
  "Linguistics",
  "Translation Studies",
  "Education", 
  "Interdisciplinary Humanities"
];

const timeline = [
  { date: "15 July", title: "Submissions Open", icon: Send },
  { date: "15 November", title: "Submissions Open", icon: FileText },
  { date: "15 March", title: "Submissions Open", icon: FileCheck2 },
];

function CallForPapersPage() {
  return (
    <>
      <PageHero
        backTo="/journal"
        backLabel="Journal Services"
        eyebrow="Call for Papers"
        title="Submit Your Contribution"
        description="We welcome original research, case studies, policy analyses, and theoretical contributions across education, research methodology, innovation studies, and sustainable development."
      />

      <section className="container-page py-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <SectionTitle
            eyebrow="Suggested Themes"
            title="Topics We're Especially Interested In."
            description="Submissions outside these themes are also welcome, provided they fall within the journal's aims and scope."className="[&_p]:text-justify"
          />
          <div className="rounded-2xl border border-border bg-card p-8 shadow-[var(--shadow-card)]">
            <ul className="grid gap-3 text-sm text-foreground/85 sm:grid-cols-2">
              {themes.map((t) => (
                <li key={t} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <div className="bg-surface">
        <section className="container-page py-20">
          <SectionTitle align="center" eyebrow="Key Dates of" title="Call for Papers" />
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-3xl mx-auto">
            {timeline.map((t) => (
              <div key={t.title} className="flex flex-col items-center text-center">
                <span className="grid h-14 w-14 place-items-center rounded-xl bg-primary text-primary-foreground">
                  <t.icon className="h-7 w-7" />
                </span>
                <p className="mt-4 font-display text-lg font-semibold text-primary">{t.date}</p>
                <p className="mt-1 text-sm text-muted-foreground">{t.title}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="container-page py-20 text-center">
        <Link
          to="/submit-manuscript"
          className="inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground shadow-sm transition-all hover:brightness-95"
        >
          Submit Your Manuscript
        </Link>
      </section>
    </>
  );
}