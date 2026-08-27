import { createFileRoute, Link } from "@tanstack/react-router";
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
} from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { SectionTitle } from "@/components/ui/section-title";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Ramotitanico" },
      {
        name: "description",
        content:
          "Ramotitanico's full range of services across education, construction, car rental, and agriculture — four sectors, one organisation.",
      },
      { property: "og:title", content: "Services — Ramotitanico" },
      {
        property: "og:description",
        content:
          "From academic consultancy and conferences to construction projects, car rental, and agricultural advisory — Ramotitanico's four-sector service portfolio.",
      },
      { property: "og:url", content: "/services" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: ServicesPage,
});

const sectors = [
  {
    icon: GraduationCap,
    title: "Education",
    desc: "Academic consultancy, conference management, research support, professional training, and international collaboration.",
    href: "/education",
  },
  {
    icon: Building2,
    title: "Construction",
    desc: "Residential, commercial, and infrastructure projects across Portugal — planned, managed, and delivered to specification.",
    href: "/construction",
  },
  {
    icon: Car,
    title: "Transport",
    desc: "Portugal's peer-to-peer car rental marketplace. Rent directly from our fleet or list your own car and earn.",
    href: "/transport",
  },
  {
    icon: Leaf,
    title: "Agriculture",
    desc: "Farm strategy consultancy, agritech solutions, sustainable practices advisory, and agricultural research support.",
    href: "/agriculture",
  },
];

const educationServices = [
  {
    icon: GraduationCap,
    title: "Educational Consultancy",
    desc: "Strategic advisory engagements with universities, ministries, and educational foundations. Curriculum review, programme accreditation support, governance reform, and institutional development planning grounded in comparative international practice.",
  },
  {
    icon: Calendar,
    title: "Conference & Event Management",
    desc: "End-to-end orchestration of international academic conferences, symposia, executive seminars, and policy roundtables. We handle scientific programming, peer review, logistics, communications, and post-event proceedings.",
  },
  {
    icon: BookOpen,
    title: "Research Support & Publication Assistance",
    desc: "Methodological consultation, manuscript development, editorial review, and pathways to publication. We assist authors in placing work with reputable indexed journals and edited volumes within our network.",
  },
  {
    icon: Compass,
    title: "Professional Training Programs",
    desc: "Certified short courses and intensive academies for educators, researchers, administrators, and professionals. Topics span pedagogy, research methods, scholarly publishing, leadership, and digital scholarship.",
  },
  {
    icon: Globe,
    title: "Cultural & Academic Exchange Programs",
    desc: "Bilateral and multilateral mobility frameworks connecting students, faculty, and practitioners across institutions. Curated placements, cultural immersion, and structured academic outcomes.",
  },
  {
    icon: Handshake,
    title: "International Collaboration Services",
    desc: "Partnership facilitation between universities, research centres, NGOs, and policy bodies. MoU drafting, joint programme design, consortia formation, and coordination of multi-country research initiatives.",
  },
];

function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Services"
        title={
    <>
      Four Sectors
      <br />
      One Institutional Standard
    </>
  }
        description="Ramotitanico operates across education, construction, transport, and agriculture — each area staffed by practitioners who bring the same rigour and commitment to excellence."
      />

      {/* Sector Overview */}
      <section className="container-page py-20">
        <SectionTitle
          align="center"
          eyebrow="Business Areas"
          title="Choose Your Sector"
          description="Each sector has its own dedicated team and service page. Explore the area most relevant to you."
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {sectors.map((s) => (
            <Link
              key={s.title}
              to={s.href}
              className="group flex flex-col rounded-2xl border border-border bg-card p-7 shadow-[var(--shadow-card)] transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-elevated)]"
            >
              <span className="grid h-12 w-12 place-items-center rounded-lg bg-primary text-primary-foreground transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                <s.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-5 font-display text-xl font-semibold text-primary">{s.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
              <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary transition-all group-hover:gap-2">
                Explore <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Education Services Detail */}
      <section className="bg-surface py-20">
        <div className="container-page">
          <SectionTitle
            align="center"
            eyebrow="Education"
            title="Academic & Education Services in Detail"
            description="Six interconnected practice areas, delivered with academic rigour and operational discipline."
          />
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {educationServices.map((s) => (
              <article
                key={s.title}
                className="group rounded-2xl border border-border bg-card p-8 shadow-[var(--shadow-card)] transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-elevated)]"
              >
                <div className="flex items-start gap-5">
                  <span className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                    <s.icon className="h-7 w-7" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-display text-xl font-semibold text-primary">{s.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground text-justify">
                      {s.desc}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
