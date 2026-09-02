import { createFileRoute } from "@tanstack/react-router";
import { Award, Globe2, Leaf, Lightbulb, ShieldCheck, Users2 } from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { SectionTitle } from "@/components/ui/section-title";
import lisbon from "@/assets/lisbon.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Ramotitanico" },
      {
        name: "description",
        content:
          "Our mission, vision, and the values that drive Ramotitanico's work across education, construction, transport, and agriculture — from Braga to the world.",
      },
      { property: "og:title", content: "About — Ramotitanico" },
      {
        property: "og:description",
        content:
          "Mission, vision, and core values of Ramotitanico — a Portugal-based organisation operating across four sectors.",
      },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

const values = [
  {
    icon: Lightbulb,
    title: "Innovation",
    desc: "We champion original thinking and rigorous experimentation across disciplines.",
  },
  {
    icon: ShieldCheck,
    title: "Integrity",
    desc: "Our editorial, financial, and academic practices are governed by transparent standards.",
  },
  {
    icon: Leaf,
    title: "Sustainability",
    desc: "Programmes are designed for lasting institutional and environmental impact.",
  },
  {
    icon: Award,
    title: "Excellence",
    desc: "We benchmark our work against the highest international academic conventions.",
  },
  {
    icon: Users2,
    title: "Collaboration",
    desc: "We convene diverse voices — disciplines, geographies, generations — around shared questions.",
  },
  {
    icon: Globe2,
    title: "Global Outlook",
    desc: "We treat knowledge as a planetary inheritance, not a regional commodity.",
  },
];

function AboutPage() {
  return (
    <>
    
      <PageHero
  eyebrow="About Ramotitanico"
  title="Education, Construction, Transport, and Agriculture — Built from Braga"
  description={
    <span style={{ textAlign: 'justify', display: 'block' }}>
      We are a multidisciplinary organisation operating across four sectors, connecting scholars, building infrastructure, enabling mobility, and cultivating sustainable agriculture from our base in Portugal.
    </span>
  }
/>

      <section className="container-page py-20">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div className="space-y-5 text-foreground/85">
            <SectionTitle
              eyebrow="Who We Are"
              title="A Portugal-Based Multidisciplinary Organisation"
            />
            <p className="text-lg leading-relaxed text-justify">
              It operates from Braga across four interconnected sectors: education,
              construction, transport, and agriculture. We advance research and learning through
              global academic partnerships, deliver quality construction projects, run a
              peer-to-peer car rental marketplace across Portugal, and support sustainable
              agricultural development through expert consultancy.
            </p>
            <p className="leading-relaxed text-justify">
              We were established to address structural gaps where expertise and opportunity fail to
              meet. Today, that ambition extends from academic conferences and publications through
              to built infrastructure, accessible mobility, and resilient food systems — all
              anchored in the same commitment to quality, sustainability, and long-term impact.
            </p>
          </div>
          <img
            src={lisbon}
            alt="Lisbon, Portugal at golden hour"
            width={1600}
            height={1000}
            loading="lazy"
            className="aspect-[4/3] w-full rounded-2xl object-cover shadow-[var(--shadow-elevated)]"
          />
        </div>
      </section>

      <section className="bg-surface py-20">
        <div className="container-page grid gap-10 md:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-8 shadow-[var(--shadow-card)]">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-foreground/80">
              <span className="rounded-full bg-accent-soft px-3 py-1 text-accent-foreground">
                Our Vision
              </span>
            </span>
            <h3 className="mt-4 font-display text-2xl font-semibold text-primary">
              A Scholarly Community that Serves Humanity
            </h3>
            <p className="mt-3 leading-relaxed text-foreground/80 text-justify">
              We envision an international academic ecosystem in which knowledge moves freely across
              borders, disciplines, and sectors — and in which scholarship is held accountable to
              the societies that sustain it.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-8 shadow-[var(--shadow-card)]">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-foreground/80">
              <span className="rounded-full bg-accent-soft px-3 py-1 text-accent-foreground">
                Our Mission
              </span>
            </span>
            <h3 className="mt-4 font-display text-2xl font-semibold text-primary">
              Build Valuable Academic, Physical, and Social System
            </h3>
            <p className="mt-3 leading-relaxed text-foreground/80 text-justify">
              We design and operate conferences, publications, training programmes, construction
              projects, mobility platforms, and agricultural initiatives that turn expertise into
              institutional, community, and economic impact.
            </p>
          </div>
        </div>
      </section>

      <section className="container-page py-20">
        <SectionTitle
          align="center"
          eyebrow="Core Values"
          title="The Principles that Guide Every Programe"
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((v) => (
            <div
              key={v.title}
              className="rounded-2xl border border-border bg-card p-7 shadow-[var(--shadow-card)]"
            >
              <span className="grid h-12 w-12 place-items-center rounded-lg bg-accent-soft text-accent-foreground">
                <v.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-5 font-display text-xl font-semibold text-primary">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {v.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-primary py-20 text-primary-foreground">
        <div className="container-page max-w-4xl">
          <span className="inline-block rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Global Impact
          </span>
          <h2 className="mt-5 font-display text-3xl font-semibold sm:text-4xl">
            From a Braga Office to Four Sectors, Around the Globe
          </h2>
          <div className="mt-6 space-y-4 text-primary-foreground/80 leading-relaxed">
            <p className="text-justify">
              Ramotitanico aims to support universities and
              academic institutions in redesigning curricula, organizing international conferences,
              developing indexed publications, and facilitating mobility opportunities for
              early-career researchers. In Portugal, the organization envisions expanding its
              contributions to include construction and infrastructure development, innovative
              transport solutions such as peer-to-peer mobility platforms, and agricultural
              advancement through agritech initiatives and sustainable farming advisory.
            </p>
            <p className="text-justify">
              Our approach is grounded in long-term impact—through stronger academic programs,
              meaningful research collaborations, sustainable infrastructure, efficient mobility
              solutions, and resilient agricultural practices. Ramotitanico aspires to be a
              dedicated and evolving contributor across the four sectors it is committed to serving.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
