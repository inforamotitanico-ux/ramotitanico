import { createFileRoute } from "@tanstack/react-router";
import { BookOpen, Globe2, CalendarClock, ShieldCheck, Languages, Landmark, Users } from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { SectionTitle } from "@/components/ui/section-title";

export const Route = createFileRoute("/about-the-journal")({
  head: () => ({
    meta: [
      { title: "About the Journal — Ramotitanico" },
      { name: "description", content: "About the Academia Humanities Review — scope, publisher, frequency, and licensing." },
      { property: "og:title", content: "About the Journal — Ramotitanico" },
      { property: "og:description", content: "An open-access, peer-reviewed journal publishing original research in humanities, literature, cultural studies, linguistics, and translation studies." },
      { property: "og:url", content: "/about-the-journal" },
    ],
    links: [{ rel: "canonical", href: "/about-the-journal" }],
  }),
  component: AboutJournalPage,
});

const facts = [
  { icon: Globe2, label: "Access", value: "Open Access" },
  { icon: CalendarClock, label: "Biannual", value: "Twice per year" },
  { icon: ShieldCheck, label: "Review", value: "Double-blind peer review" },
  { icon: BookOpen, label: "Publisher", value: "Ramotitanico – Unipessoal LDA, Portugal" },
  { icon: Languages, label: "Language", value: "English" },
  { icon: Landmark, label: "Subject Area", value: "Humanities, Literature, Cultural Studies, Linguistics, Translation Studies, Education, Interdisciplinary Humanities" },
  { icon: Users, label: "Licence", value: "Creative Commons CC BY 4.0" },
];

function AboutJournalPage() {
  return (
    <>
      <PageHero
        backTo="/journal"
        backLabel="Journal Services"
        eyebrow="About the Journal"
        title="Academia Humanities Review"
        description="An open-access, peer-reviewed journal dedicated to advancing scholarship in the humanities — publishing original research, critical essays, and interdisciplinary studies."
      />

      <section className="container-page py-20">
        <SectionTitle
          eyebrow="Overview"
          title="A Platform for Humanities Scholarship"
          description="The Academia Humanities Review provides a rigorous, open-access forum for researchers across literature, linguistics, cultural studies, translation, and education — fostering dialogue between disciplines and across traditions."
          className="[&_p]:text-justify"
        />

        {/* Clean info grid without cards */}
        <div className="mt-14 divide-y divide-border rounded-2xl border border-border bg-card">
          {facts.map((f, index) => (
            <div
              key={f.label}
              className={`flex flex-col gap-1 px-6 py-4 sm:flex-row sm:items-center sm:gap-8 ${
                index === 0 ? "rounded-t-2xl" : ""
              } ${index === facts.length - 1 ? "rounded-b-2xl" : ""}`}
            >
              <div className="flex items-center gap-3 sm:w-48">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                  <f.icon className="h-4 w-4" />
                </span>
                <span className="text-sm font-semibold text-primary">{f.label}</span>
              </div>
              <p className="text-sm text-muted-foreground sm:flex-1">{f.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 max-w-3xl space-y-4 text-sm leading-relaxed text-muted-foreground">
          <p className="text-justify">
            All articles are published under a Creative Commons Attribution (CC BY 4.0) licence,
            allowing free reuse with appropriate credit. Authors retain copyright of their work.
          </p>
          <p className="text-justify">
            The Academia Humanities Review is committed to maintaining the highest editorial
            standards and follows the guidelines set by the Committee on Publication Ethics (COPE).
            All editorial decisions are made independently, ensuring scholarly integrity and
            intellectual freedom.
          </p>
        </div>
      </section>
    </>
  );
}