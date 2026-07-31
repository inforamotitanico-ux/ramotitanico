import { createFileRoute } from "@tanstack/react-router";
import { 
  Building2, 
  Wrench, 
  Leaf, 
  Shield, 
  Layers, 
  BarChart3, 
  Home,
  Users,
  GraduationCap,
  Building,
  Heart
} from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { SectionTitle } from "@/components/ui/section-title";

export const Route = createFileRoute("/construction")({
  head: () => ({
    meta: [
      { title: "Real Estate & Construction — Ramotitanico" },
      { name: "description", content: "Real estate, civil construction, and property development serving the Afro-Asian-Lusophone diaspora across Portugal — turning rent into equity, buildings into belonging." },
      { property: "og:title", content: "Real Estate & Construction — Ramotitanico" },
      { property: "og:description", content: "Ramotitanico buys, sells, and leases real estate, and runs civil construction — including mini-markets and restaurants — turning rent paid into equity built for the same families our other services serve." },
      { property: "og:url", content: "/construction" },
    ],
    links: [{ rel: "canonical", href: "/construction" }],
  }),
  component: ConstructionPage,
});

const services = [
  {
    icon: Home,
    title: "Real Estate — Purchase, Sale, Leasing",
    desc: "We buy, sell and lease real estate across Portugal. From family homes to commercial premises, we help families turn rent paid into equity built — creating long-term wealth and stability for the communities we serve.",
  },
  {
    icon: Building2,
    title: "Civil Construction — Mini-Markets and Restaurants",
    desc: "We run civil construction projects that serve the diaspora directly — building mini-markets that stock culturally appropriate food and restaurants that serve the tastes of home. These are not just buildings; they are cultural anchors.",
  },
  {
    icon: Layers,
    title: "Project Planning & Development",
    desc: "We take projects from concept to groundbreaking. Site assessment, planning permissions, budget modelling, stakeholder coordination — comprehensive pre-construction work that de-risks development before any building begins.",
  },
  {
    icon: Leaf,
    title: "Sustainable Building",
    desc: "Low-carbon construction methods, circular material sourcing, and energy-efficient design are embedded in every project we deliver — not treated as optional extras. We build sustainably because it is the right way to build.",
  },
  {
    icon: Shield,
    title: "Building Standards & Compliance",
    desc: "Interpretation and application of national and international construction codes, environmental regulations, and safety standards. We protect clients through proactive compliance management at every project stage.",
  },
  {
    icon: Wrench,
    title: "Project Management & Oversight",
    desc: "Independent project management and owner's representative services. We provide schedule control, cost management, contractor coordination, and quality assurance on behalf of project owners.",
  },
  {
    icon: BarChart3,
    title: "Green Building Certification",
    desc: "End-to-end support for LEED, BREEAM, and equivalent certification pathways. We audit design documents, coordinate evidence gathering, and liaise with certification bodies to achieve target ratings.",
  },
];

function ConstructionPage() {
  return (
    <>
      <PageHero
        eyebrow="Real Estate & Construction"
        title={
          <>
            Turn Rent Into Equity
            <br />
            Build Belonging
          </>
        }
        description="Ramotitanico buys, sells, and leases real estate, and runs civil construction — including mini-markets and restaurants — turning rent paid into equity built for the same families our other services already serve. Property, vehicles, and the buildings in between."
      />

      {/* Core Services Section */}
      <section className="container-page py-20">
        <SectionTitle
          eyebrow="What We Deliver"
          title="Property, Vehicles, and the Buildings in Between"
          description="Our construction and real estate services are built around one idea: helping families build lives, preserve identity, create opportunity, and belong. Every building we construct is a small act of cultural translation."
        />
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {services.map((s) => (
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
      </section>

      {/* Belonging & Equity Section (NEW - pulled from conference text) */}
      <section className="bg-primary py-20 text-primary-foreground">
        <div className="container-page max-w-4xl">
          <span className="inline-block rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Belonging is the Substance
          </span>
          <h2 className="mt-5 font-display text-3xl font-semibold sm:text-4xl">
            Service is the Surface, Belonging is the Substance
          </h2>
          <div className="mt-6 space-y-4 text-primary-foreground/80 leading-relaxed">
            <p className="text-justify">
              At first glance, some may wonder why a company in mobility, higher-education consultancy, Afro-Asian-Halal food, real estate and construction would help organise a humanities conference.
            </p>
            <p className="text-justify">
              The answer is simple: our daily work is the humanities in practice. Every building we construct, every home we help a family purchase, and every mini-market we build is a small act of cultural translation — a humanities practice carried out in workshops, kitchens, and construction sites.
            </p>
            <p className="font-medium text-primary-foreground text-justify">
              Migration is not a problem to be managed. It is a culture to be resourced.
            </p>
          </div>
        </div>
      </section>

      {/* RISE Europe Integration Section (NEW) */}
      <section className="container-page py-20">
        <SectionTitle
          eyebrow="Study. Build. Belong."
          title="RISE Europe: Settlement & Enterprise"
          description="For international students and migrant entrepreneurs. RISE Europe provides settlement support — housing, bank accounts, tax registration, and community — so students can focus on building businesses while they study."
        />
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          <div className="rounded-2xl border border-border bg-card p-8 text-center shadow-[var(--shadow-card)]">
            <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-accent/10 text-accent">
              <Home className="h-8 w-8" />
            </div>
            <h3 className="font-display text-xl font-semibold text-primary">Settlement Support</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Housing, bank accounts, tax registration, and community integration. We help students and families settle so they can focus on study and enterprise.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-8 text-center shadow-[var(--shadow-card)]">
            <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-accent/10 text-accent">
              <Building className="h-8 w-8" />
            </div>
            <h3 className="font-display text-xl font-semibold text-primary">Equity Building</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              We help families turn rent paid into equity built. Through real estate and construction, we create pathways to long-term wealth and stability.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-8 text-center shadow-[var(--shadow-card)]">
            <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-accent/10 text-accent">
              <Heart className="h-8 w-8" />
            </div>
            <h3 className="font-display text-xl font-semibold text-primary">Cultural Anchors</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Mini-markets, restaurants, and community spaces that serve the Afro-Asian-Lusophone diaspora — buildings that preserve identity and create belonging.
            </p>
          </div>
        </div>
        <div className="mt-10 text-center">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-primary">Outcome:</span> A pathway to belonging — homes to live in, businesses to run, and communities to call home.
          </p>
        </div>
      </section>

      {/* Values Section (NEW - from conference) */}
      <section className="bg-surface py-20">
        <div className="container-page max-w-4xl text-center">
          <span className="inline-block rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Our Values
          </span>
          <h2 className="mt-5 font-display text-3xl font-semibold text-primary sm:text-4xl">
            Inclusion. Cultural Understanding. Dignity. Dialogue. Sustainable Development.
          </h2>
          <p className="mt-6 leading-relaxed text-foreground/80">
            These five values guide every building we construct, every home we help a family purchase, 
            and every community space we create. We are not just building structures — we are building 
            lives, preserving identity, creating opportunity, and enabling belonging.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-5">
            {["Inclusion", "Cultural Understanding", "Dignity", "Dialogue", "Sustainable Development"].map((value) => (
              <div key={value} className="rounded-xl bg-card p-4 shadow-[var(--shadow-card)]">
                <p className="text-sm font-medium text-primary">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section (updated) */}
      <section className="bg-primary py-20 text-primary-foreground">
        <div className="container-page max-w-4xl">
          <span className="inline-block rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Our Impact
          </span>
          <h2 className="mt-5 font-display text-3xl font-semibold sm:text-4xl">
            Buildings that Serve Communities for Generations
          </h2>
          <div className="mt-6 space-y-4 text-primary-foreground/80 leading-relaxed">
            <p className="text-justify">
              Ramotitanico plans, manages, and delivers construction projects across Portugal — from residential homes and commercial premises to mini-markets and restaurants that serve the Afro-Asian-Lusophone diaspora. 
            </p>
            <p className="text-justify">
              We believe that built environments shape social outcomes. Every project we deliver carries a responsibility to the people who will use, maintain, and inherit it — a responsibility we take seriously at every stage of the project lifecycle. 
            </p>
            <p className="font-medium text-primary-foreground text-justify">
              From service to story: helping families purchase homes and build long-term equity is not just commerce — it is participation in the human story.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}