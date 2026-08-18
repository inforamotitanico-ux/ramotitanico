import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/ui/page-hero";
import { SectionTitle } from "@/components/ui/section-title";
import { Users2, Globe2, BookOpen, ShieldCheck, UserCheck, Award, Building2 } from "lucide-react";

export const Route = createFileRoute("/editorial-board")({
  head: () => ({
    meta: [
      { title: "Editorial Board — Academia Humanities Review" },
      { name: "description", content: "The editorial board of Academia Humanities Review: Editor-in-Chief, Managing Editor, Associate Editor, Editorial Board, Advisory Board, and Reviewers' Panel." },
      { property: "og:title", content: "Editorial Board — Academia Humanities Review" },
      { property: "og:description", content: "Meet the editors, board members, and reviewers overseeing peer review and editorial decisions for Academia Humanities Review." },
      { property: "og:url", content: "/editorial-board" },
    ],
    links: [{ rel: "canonical", href: "/editorial-board" }],
  }),
  component: EditorialBoardPage,
});

interface Editor {
  name: string;
  role: string;
  affiliation?: string;
  description?: string;
  icon?: React.ElementType;
}

const chiefEditors: Editor[] = [
  { 
    name: "Dr. Rasib Mahmood", 
    role: "Editor-in-Chief",
    description: "Oversees editorial strategy, final decisions, and journal policy."
  },
  { 
    name: "Dr. Huma Ahmed", 
    role: "Managing Editor",
    description: "Manages editorial operations, submissions, and peer review coordination."
  },
];

const associateEditors: Editor[] = [
  { 
    name: "Dr. Inam Ullah", 
    role: "Associate Editor",
    description: "Handles submissions across humanities and interdisciplinary studies."
  },
];

// Editorial Board Members (International Board)
const editorialBoardMembers: Editor[] = [
  { 
   name: "Dr. Patricia Jabbeh Wesley",
    role: "Editorial Board Member",
    affiliation: "Pennsylvania State University, USA",
  },
  { 
    name: "Dr. Boothenia Majoul",
    role: "Editorial Board Member",
    affiliation: "University of Carthage, Tunisia",
  },
  { 
    name: "Dr. Boyarkina Iren",
    role: "Editorial Board Member",
    affiliation: "Sapienza University of Rome, Italy",
  },
  { 
    name: "Dr. Azadeh Mehrpouyan",
    role: "Editorial Board Member",
    affiliation: "University of Velayat, Iran",
  },
  { 
    name: "Dr. Iman Al-Khalidi",
    role: "Editorial Board Member",
    affiliation: "University of Technology and Applied Sciences, Oman",
  },
];

// Advisory Board Members (separate, distinct members)
const advisoryBoardMembers: Editor[] = [
  {
    name: "Dr. Nailah Riaz",
    role: "Advisory Board Member",
    affiliation: "The University of Faisalabad, Pakistan",
  },
   {
    name: "Dr. Rasib Mahmood",
    role: "Advisory Board Member",
    affiliation: "Islamia College (University) Peshawar, Pakistan",
  },
   {
    name: "Dr. Boothenia Majoul",
    role: "Advisory Board Member",
    affiliation: "University of Carthage, Tunisia",
  },
  {
    name: "Dr. Eng. Vimbai Pachawa CEng MIAgre",
    role: "Advisory Board Member",
    affiliation: "UK",
  },
];

function EditorCard({ e, featured = false }: { e: Editor; featured?: boolean }) {
  const Icon = e.icon || UserCheck;
  
  return (
    <article
      className={`rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)] transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-elevated)] ${featured ? "md:p-8" : ""}`}
    >
      <div
        className={`grid place-items-center rounded-xl bg-primary text-primary-foreground ${featured ? "h-20 w-20" : "h-14 w-14"}`}
      >
        <Icon className={`${featured ? "h-10 w-10" : "h-6 w-6"}`} />
      </div>
      <h3 className={`mt-5 font-display font-semibold text-primary ${featured ? "text-2xl" : "text-lg"}`}>
        {e.name}
      </h3>
      <div className="mt-1 text-xs font-medium uppercase tracking-wider text-accent-foreground/80">
        {e.role}
      </div>
      {e.affiliation && (
        <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
          <Building2 className="h-3 w-3" />
          <span>{e.affiliation}</span>
        </div>
      )}
      {e.description && (
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{e.description}</p>
      )}
    </article>
  );
}

function EditorialBoardPage() {
  return (
    <>
      <PageHero
        backTo="/journal"
        backLabel="Journal Services"
        eyebrow="Editorial Board"
        title="The Editors Behind Every Decision"
        description="Editorial decisions are made by an international board of scholars and practitioners with direct expertise across the journal's subject areas."
      />

      {/* Editor-in-Chief & Managing Editor */}
      <section className="container-page py-16">
        <SectionTitle eyebrow="Leadership" title="Editorial Leadership" />
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {chiefEditors.map((e) => (
            <EditorCard key={e.role} e={e} featured />
          ))}
        </div>
      </section>

      {/* Associate Editor */}
      <div className="bg-surface">
        <section className="container-page py-16">
          <SectionTitle eyebrow="Section Editors" title="Associate Editor" />
          <div className="mt-10 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {associateEditors.map((e) => (
              <EditorCard key={e.role} e={e} />
            ))}
          </div>
        </section>
      </div>

      {/* Editorial Board - International Board */}
      <section className="container-page py-16">
        <SectionTitle 
          eyebrow="International Board" 
          title="Editorial Board" 
        />
        <div className="mt-4 text-sm text-muted-foreground">
          <p>International scholars and experts who review and evaluate submissions to ensure academic excellence and global perspective.</p>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {editorialBoardMembers.map((e, index) => (
            <EditorCard key={index} e={{ ...e, icon: Users2 }} />
          ))}
        </div>
      </section>

      {/* Advisory Board - Separate Section */}
      <div className="bg-surface">
        <section className="container-page py-16">
          <SectionTitle 
            eyebrow="Strategic Guidance" 
            title="Advisory Board" 
          />
          <div className="mt-4 text-sm text-muted-foreground">
            <p>Distinguished scholars and professionals who provide strategic direction and ensure the journal's continued academic excellence.</p>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {advisoryBoardMembers.map((e, index) => (
              <EditorCard key={index} e={{ ...e, icon: Globe2 }} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}