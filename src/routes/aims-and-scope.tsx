import { createFileRoute } from "@tanstack/react-router";
import { 
  BookOpen, 
  FileText, 
  Globe2, 
  Users2, 
  Lightbulb, 
  ShieldCheck,
  GraduationCap,
  Leaf,
  Scale
} from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";

export const Route = createFileRoute("/aims-and-scope")({
  head: () => ({
    meta: [
      { title: "Aims and Scope — Academia Humanities Review" },
      { name: "description", content: "Aims and scope of Academia Humanities Review — an international, peer-reviewed, open-access journal published by Ramotitanico, Portugal." },
      { property: "og:title", content: "Aims and Scope — Academia Humanities Review" },
      { property: "og:description", content: "Academia Humanities Review publishes original research, reviews, book reviews, and critical essays in humanities and interdisciplinary studies." },
      { property: "og:url", content: "/aims-and-scope" },
    ],
    links: [{ rel: "canonical", href: "/aims-and-scope" }],
  }),
  component: AimsScopePage,
});

const disciplines = [
  { icon: BookOpen, label: "Literature" },
  { icon: Globe2, label: "Language" },
  { icon: Users2, label: "Cultural Studies" },
  { icon: Globe2, label: "Postcolonial Studies" },
  { icon: BookOpen, label: "Translation Studies" },
  { icon: Users2, label: "Gender Studies" },
  { icon: GraduationCap, label: "Education" },
  { icon: Lightbulb, label: "Philosophy" },
  { icon: BookOpen, label: "History" },
  { icon: Globe2, label: "Media Studies" },
  { icon: FileText, label: "Digital Humanities" },
  { icon: Globe2, label: "Global Humanities" },
];

const articleTypes = [
  { icon: FileText, label: "Original Research Articles" },
  { icon: BookOpen, label: "Review Articles" },
  { icon: BookOpen, label: "Book Reviews" },
  { icon: Lightbulb, label: "Critical Essays" },
];

const encouragedThemes = [
  { icon: Globe2, label: "Intercultural Dialogue" },
  { icon: Users2, label: "Critical Inquiry" },
  { icon: ShieldCheck, label: "Ethical Scholarship" },
  { icon: Lightbulb, label: "Innovative Approaches" },
];

function AimsScopePage() {
  return (
    <>
      <PageHero
        backTo="/journal"
        backLabel="Journal Services"
        eyebrow="Aims and Scope"
        title="Academia Humanities Review"
        description="International · Peer-Reviewed · Open Access"
      />

      <section className="container-page py-20">
        {/* Journal Description */}
        <div className="max-w-4xl space-y-4">
          <p className="text-lg leading-relaxed text-primary text-justify">
            <strong>Academia Humanities Review</strong> is an international, peer-reviewed, 
            open-access academic journal published by <strong>Ramotitanico – Unipessoal LDA, Portugal</strong>.
          </p>
          <p className="text-base leading-relaxed text-muted-foreground text-justify">
            The journal aims to provide a scholarly platform for researchers, academics, and postgraduate 
            scholars working in the broad fields of humanities and interdisciplinary studies.
          </p>
          <p className="text-base leading-relaxed text-muted-foreground text-justify">
            The journal welcomes original research articles, review articles, book reviews, and critical 
            essays in areas including literature, language, cultural studies, postcolonial studies, 
            translation studies, gender studies, education, philosophy, history, media studies, digital 
            humanities, and global humanities.
          </p>
          <p className="text-base leading-relaxed text-muted-foreground text-justify">
            <strong>Academia Humanities Review</strong> especially encourages research that promotes 
            intercultural dialogue, critical inquiry, ethical scholarship, and innovative approaches to 
            contemporary humanistic knowledge.
          </p>
        </div>

        {/* Disciplines */}
        <div className="mt-16">
          <h2 className="font-display text-2xl font-semibold text-primary">Disciplines Covered</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            The journal welcomes submissions in the following areas:
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {disciplines.map((d) => (
              <span
                key={d.label}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-primary shadow-[var(--shadow-card)] transition-all hover:-translate-y-0.5 hover:border-primary hover:shadow-[var(--shadow-elevated)]"
              >
                <d.icon className="h-4 w-4 text-muted-foreground" />
                {d.label}
              </span>
            ))}
          </div>
        </div>

        {/* Article Types */}
        <div className="mt-16">
          <h2 className="font-display text-2xl font-semibold text-primary">Article Types Accepted</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            The journal welcomes the following types of submissions:
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {articleTypes.map((a) => (
              <div
                key={a.label}
                className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 shadow-[var(--shadow-card)] transition-all hover:-translate-y-1 hover:border-primary hover:shadow-[var(--shadow-elevated)]"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-primary text-primary-foreground">
                  <a.icon className="h-5 w-5" />
                </span>
                <span className="font-display text-sm font-semibold text-primary">{a.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Encouraged Themes */}
        <div className="mt-16 rounded-2xl border border-border bg-primary/5 p-8">
          <h2 className="font-display text-2xl font-semibold text-primary">Encouraged Research Themes</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Academia Humanities Review especially encourages research that promotes:
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {encouragedThemes.map((t) => (
              <div
                key={t.label}
                className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 shadow-[var(--shadow-card)] transition-all hover:-translate-y-1 hover:border-primary hover:shadow-[var(--shadow-elevated)]"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-accent text-accent-foreground">
                  <t.icon className="h-5 w-5" />
                </span>
                <span className="font-display text-sm font-semibold text-primary">{t.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-16 border-t border-border pt-8">
          <p className="text-center text-sm text-muted-foreground text-justify">
            Academia Humanities Review · Published by Ramotitanico – Unipessoal LDA, Portugal
          </p>
        </div>
      </section>
    </>
  );
}