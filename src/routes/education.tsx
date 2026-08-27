import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/ui/page-hero";
import { SectionTitle } from "@/components/ui/section-title";
import {  Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  Building2,
  Calendar,
  Car,
  Compass,
  GraduationCap,
  Globe,
  Handshake,
  Leaf,
  Microscope,
  Quote,
  Star,
  Users,
} from "lucide-react";
export const Route = createFileRoute("/education")({
  head: () => ({
    meta: [
      { title: "Education Services — Ramotitanico" },
      { name: "description", content: "Expert education consulting services including curriculum design, teacher development, e-learning integration, and institutional accreditation support." },
      { property: "og:title", content: "Education Services — Ramotitanico" },
      { property: "og:description", content: "Ramotitanico's education sector services: curriculum design, teacher training, e-learning, policy advisory, accreditation, and student mobility." },
      { property: "og:url", content: "/education" },
    ],
    links: [{ rel: "canonical", href: "/education" }],
  }),
  component: EducationPage,
});

const services = [
  {
    icon: GraduationCap,
    title: "Educational Consultancy",
    desc: "Strategic advisory for universities, ministries, and institutions modernising curricula and academic governance.",
  },
  {
    icon: Calendar,
    title: "Conference & Event Management",
    desc: "End-to-end orchestration of international academic conferences, symposia, and policy roundtables.",
  },
  {
    icon: BookOpen,
    title: "Research & Publication Support",
    desc: "Methodological guidance, editorial review, indexing and dissemination across reputable academic channels.",
  },
  {
    icon: Compass,
    title: "Professional Training",
    desc: "Certified programmes for educators, researchers, and administrators across emerging and established disciplines.",
  },
  {
    icon: Globe,
    title: "Academic Exchange",
    desc: "Bilateral cultural and academic mobility frameworks connecting institutions across continents.",
  },
  {
    icon: Handshake,
    title: "International Collaboration",
    desc: "Partnership facilitation between universities, NGOs, research centres, and policy bodies worldwide.",
  },
];

function EducationPage() {
  return (
    <>
      <PageHero
        eyebrow="Education Services"
        title="Strengthening Education Systems from Classroom to Policy"
        description="Our education specialists partner with institutions, governments, and educators to design programmes that raise standards, widen access, and build lasting capacity."
      />
<section className="bg-surface py-20 sm:py-28">
        <div className="container-page">
          <SectionTitle
            align="center"
            eyebrow="What We Do"
            title="Services that Strengthen Institutions and Scholars"
            description="Six interconnected practice areas, delivered with academic rigour and operational discipline."
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <div
                key={s.title}
                className="group rounded-2xl border border-border bg-card p-7 shadow-[var(--shadow-card)] transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-elevated)]"
              >
                <span className="grid h-12 w-12 place-items-center rounded-lg bg-primary text-primary-foreground transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                  <s.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 font-display text-xl font-semibold text-primary">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 rounded-md border border-primary bg-background px-5 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              View all services <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-primary py-20 text-primary-foreground">
        <div className="container-page max-w-4xl">
          <span className="inline-block rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Our Impact
          </span>
          <h2 className="mt-5 font-display text-3xl font-semibold sm:text-4xl">
            Education that Travels Across Borders and Generations
          </h2>
          <div className="mt-6 space-y-4 text-primary-foreground/80 leading-relaxed">
            <p>
              Ramotitanico has supported education reform initiatives spanning four continents,
              working alongside ministries, regional authorities, and individual institutions to
              redesign curricula, strengthen teaching practice, and build quality assurance systems
              that endure beyond the engagement.
            </p>
            <p>
              Our education work is grounded in the belief that rigorous, well-resourced schooling
              is the foundation of every other development goal — and that the professionals who
              deliver it deserve expert, sustained support.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
