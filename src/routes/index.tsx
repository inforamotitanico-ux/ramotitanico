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
  Microscope,
  Quote,
  Star,
  Users,
} from "lucide-react";
import heroImage from "@/assets/hero-conference.jpg";
import collabImage from "@/assets/collaboration.jpg";
import { SectionTitle } from "@/components/ui/section-title";
import { StatCounter } from "@/components/ui/stat-counter";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ramotitanico — Education, Construction, Transport & Agriculture" },
      {
        name: "description",
        content:
          "Portugal-based multidisciplinary organisation operating across education, construction, transport, and agriculture — driving sustainable development from Braga to the world.",
      },
      {
        property: "og:title",
        content: "Ramotitanico — Education, Construction, Transport & Agriculture",
      },
      {
        property: "og:description",
        content:
          "Portugal-based multidisciplinary organisation operating across education, construction, transport, and agriculture — driving sustainable development from Braga to the world.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
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

const businessAreas = [
  {
    icon: Building2,
    tag: "Construction",
    title: "Construction & Development",
    desc: "Delivering quality residential, commercial, and infrastructure projects across Portugal, built on modern engineering and sustainable building practices.",
    features: [
      "Residential & commercial builds",
      "Infrastructure development",
      "Project planning & management",
      "Sustainable construction methods",
    ],
  },
  {
    icon: Car,
    tag: "Transport",
    title: "Car Rental & Mobility",
    desc: "Rent a vehicle directly from Ramotitanico, or register your own car on our platform and earn by renting it to others — Portugal's peer-to-peer car rental marketplace.",
    features: [
      "Direct vehicle rental",
      "List your car & earn",
      "Flexible short & long-term plans",
      "Nationwide Portugal coverage",
    ],
  },
  {
    icon: Leaf,
    tag: "Agriculture",
    title: "Agriculture & Agritech",
    desc: "Strengthening Portugal's agricultural sector through expert consultancy, technology-enabled solutions, and sustainable farming practices that boost productivity and protect the land.",
    features: [
      "Farm strategy consultancy",
      "Agritech implementation",
      "Sustainable practices advisory",
      "Agricultural research support",
    ],
  },
];

const stats = [
  { value: "42+", label: "Countries Engaged" },
  { value: "120+", label: "Academic Events Hosted" },
  { value: "50+", label: "Vehicles Available" },
  { value: "20+", label: "Construction Projects" },
  { value: "85+", label: "Publications" },
  { value: "300+", label: "Global Partners" },
];

const testimonials = [
  {
    quote:
      "Ramotitanico's editorial rigour and global reach gave our research the platform it deserved. A genuinely international scholarly partner.",
    name: "Prof. Helena Vasques",
    role: "Faculty of Social Sciences, Coimbra",
  },
  {
    quote:
      "Their conference programme is exceptionally well-curated. Substantive panels, serious participants, real outcomes.",
    name: "Dr. Anand Mehta",
    role: "Centre for Policy Research, New Delhi",
  },
  {
    quote:
      "A rare organisation that combines academic seriousness with logistical excellence. We have collaborated three years running.",
    name: "Dr. Margarethe Kohl",
    role: "Institut für Bildungsforschung, Berlin",
  },
];

function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-primary text-primary-foreground">
        <img
          src={heroImage}
          alt=""
          width={1920}
          height={1280}
          className="absolute inset-0 h-full w-full object-cover opacity-30"
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.22 0.07 260 / 0.92), oklch(0.28 0.08 260 / 0.78))",
          }}
        />
        <div className="container-page relative py-18 sm:py-28 lg:py-25">
          <div className="max-w-3xl animate-fade-up">
            <span className="inline-block rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Braga · Portugal · Worldwide
            </span>
            <h1 className="mt-6 font-display text-3xl font-semibold leading-tight sm:text-5xl md:text-6xl lg:text-5xl">
              Harnessing Communities Through Education, Transport, Agriculture & Construction
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-primary-foreground/85 sm:text-lg">
              Ramotitanico is a Portugal-based multidisciplinary organisation operating across four
              interconnected sectors. We harnessing education and research through global academic
              partnerships, deliver quality construction projects, provide flexible peer-to-peer car
              rental services, and support sustainable agricultural development — creating meaningful
              impact from Braga to the world.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/services"
                className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground shadow-sm transition-all hover:brightness-95"
              >
                Explore Services <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/partnerships"
                className="inline-flex items-center gap-2 rounded-md border border-primary-foreground/30 px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-foreground/10"
              >
                Become a Partner
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About preview */}
      <section className="container-page py-20 sm:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionTitle
  eyebrow="About Ramotitanico"
  title="One Organization, Multiple Sectors"
  description="The headquarters in Braga operates across four major domains including: Education, Construction, Transportation and Agriculture- each sector contributing to Portugal’s sociocultural development. We connect scholars across continents, design latest infrastructure, mobilise people and harvest sustainable food systems."
  className="[&_p]:text-justify"
/>
            <Link
              to="/about"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all"
            >
              Read More <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="relative">
            <img
              src={collabImage}
              alt="Researchers collaborating in a library"
              width={1600}
              height={1000}
              loading="lazy"
              className="aspect-[4/3] w-full rounded-2xl object-cover shadow-[var(--shadow-elevated)]"
            />
            <div className="absolute -bottom-6 -left-6 hidden rounded-xl bg-accent p-5 text-accent-foreground shadow-lg sm:block">
              <div className="font-display text-3xl font-semibold">15+</div>
              <div className="text-xs font-medium uppercase tracking-wider">Years of Practice</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-surface py-20 sm:py-28">
        <div className="container-page">
          <SectionTitle
            align="center"
            eyebrow="What We Do"
            title="Services that Strengthen Institutions and Scholars."
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
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground text-justify">{s.desc}</p>
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

      {/* Business Areas */}
      <section className="container-page py-20 sm:py-28">
        <SectionTitle
          align="center"
          eyebrow="Our Sectors"
          title="Beyond Academia — Three More Pillars of Growth."
          description="Alongside education, Ramotitanico drives sustainable development through construction, a peer-to-peer car rental marketplace, and agricultural consultancy."
        />
        <div className="mt-14 grid gap-8 lg:grid-cols-3">
          {businessAreas.map((area) => (
            <div
              key={area.title}
              className="flex flex-col rounded-2xl border border-border bg-card p-8 shadow-[var(--shadow-card)]"
            >
              <div className="flex items-start gap-4">
                <span className="grid h-14 w-14 flex-shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground">
                  <area.icon className="h-7 w-7" />
                </span>
                <span className="mt-1 inline-block rounded-full bg-accent/10 px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-accent">
                  {area.tag}
                </span>
              </div>
              <h3 className="mt-5 font-display text-2xl font-semibold text-primary">{area.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground text-justify">{area.desc}</p>
              <ul className="mt-6 space-y-2.5">
                {area.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-foreground/80">
                    <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

     

      {/* Featured Conference */}
      <section className="bg-primary py-20 text-primary-foreground sm:py-28">
        <div className="container-page grid items-center gap-12 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <span className="inline-block rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Featured Conference · 26-27 September 2026
            </span>
            <h2 className="mt-5 font-display text-3xl font-semibold sm:text-4xl">
              Crisis and Humanities: Paradigm Shift in Language & Literature in 21st Century
            </h2>
            <p className="mt-4 max-w-xl text-primary-foreground/80">
              Braga hosts the 2026 edition of our flagship interdisciplinary conference. Scholars,
              policymakers, and practitioners convene for two days of plenaries, panels, and
              published proceedings.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                to="/events"
                className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground hover:brightness-95"
              >
                View conferences <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/events"
                className="inline-flex items-center gap-2 rounded-md border border-primary-foreground/30 px-5 py-3 text-sm font-semibold hover:bg-primary-foreground/10"
              >
                Call for Papers
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            {[
              { icon: Users, label: "International Community" },
              { icon: Globe, label: "Worldwide Network" },
              { icon: Microscope, label: "Innovative Research" },
              { icon: BookOpen, label: "Indexed Proceedings" },
            ].map((b) => (
              <div
                key={b.label}
                className="rounded-xl border border-primary-foreground/15 bg-primary-foreground/5 p-5"
              >
                <b.icon className="h-6 w-6 text-accent" />
                <div className="mt-3 font-semibold">{b.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container-page py-20 sm:py-28">
        <SectionTitle
          align="center"
          eyebrow="Voices from Our Network"
          title="Trusted by Scholars Across Continents."
        />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="flex flex-col rounded-2xl border border-border bg-card p-7 shadow-[var(--shadow-card)]"
            >
              <Quote className="h-7 w-7 text-accent" />
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-foreground/85">
                "{t.quote}"
              </blockquote>
              <figcaption className="mt-6 border-t border-border pt-4">
                <div className="font-semibold text-primary">{t.name}</div>
                <div className="text-xs text-muted-foreground">{t.role}</div>
                <div className="mt-2 flex gap-0.5 text-accent">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-current" />
                  ))}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </>
  );
}
