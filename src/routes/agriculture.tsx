import { createFileRoute } from "@tanstack/react-router";
import { 
  Sprout, 
  Leaf, 
  FlaskConical, 
  TrendingUp, 
  Globe2, 
  Cpu, 
  Beef,
  Truck,
  Droplets,
  Users,
  GraduationCap,
  Building2
} from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { SectionTitle } from "@/components/ui/section-title";

export const Route = createFileRoute("/agriculture")({
  head: () => ({
    meta: [
      { title: "Food Sovereignty & Agriculture — Ramotitanico" },
      { name: "description", content: "Afro-Asian-Halal mobile butchery, agritech implementation, sustainable farming practices, and food sovereignty — serving Braga, Porto, and the Minho corridor." },
      { property: "og:title", content: "Food Sovereignty & Agriculture — Ramotitanico" },
      { property: "og:description", content: "Ramotitanico's mobile butchery brings halal-certified cuts to the diaspora — goat, mutton, beef, offals, and more. Plus agribusiness consulting and sustainable farming." },
      { property: "og:url", content: "/agriculture" },
    ],
    links: [{ rel: "canonical", href: "/agriculture" }],
  }),
  component: AgriculturePage,
});

const services = [
  {
    icon: Beef,
    title: "Afro-Asian-Halal Mobile Butchery",
    desc: "A taste of home is not a luxury, it is identity. Our mobile butchery brings the cuts that Portuguese supermarkets quietly retired: hard chicken, goat, mutton, beef offals, oxtail, cow feet, tripe, and heads — halal-certified, ethically sourced, and delivered to the neighbourhoods that ask for them.",
    details: "Ethical sourcing, refrigerated transport, trusted handling · mobile route serving Braga, Porto, and the Minho corridor",
  },
  {
    icon: Truck,
    title: "Mobile Route — Braga, Porto & the Minho Corridor",
    desc: "Our refrigerated vehicles follow a regular route across the North of Portugal, delivering culturally appropriate meat directly to Afro-Asian-Lusophone communities. No supermarkets, no middlemen — just food that tastes like home.",
  },
  {
    icon: Sprout,
    title: "Agribusiness Consulting",
    desc: "Strategic advisory for agricultural enterprises at every stage — from smallholder cooperative formation to large-scale agri-industrial venture structuring. We advise on business models, value chain integration, and investment strategy.",
  },
  {
    icon: Leaf,
    title: "Sustainable Farming & Food Sovereignty",
    desc: "Advisory on agroecological transitions, regenerative agriculture, and climate-resilient farming systems. We help producers adopt practices that improve soil health, water efficiency, and biodiversity — because food sovereignty starts with the land.",
  },
  {
    icon: FlaskConical,
    title: "Crop Management & Research",
    desc: "Applied research support and agronomic advisory covering crop selection, rotation design, pest and disease management, and yield optimisation. We connect practitioners with cutting-edge research outputs.",
  },
  {
    icon: TrendingUp,
    title: "Agricultural Policy Advisory",
    desc: "Policy review, subsidy reform analysis, and regulatory consulting for ministries and international development agencies. Our advisors engage with rural development policy, food security frameworks, and trade policy.",
  },
  {
    icon: Globe2,
    title: "Market Access & Trade Facilitation",
    desc: "Support for producers, cooperatives, and exporters seeking access to regional and international markets. We advise on standards compliance, certification, buyer relationship development, and export logistics.",
  },
  {
    icon: Cpu,
    title: "Smart Agriculture & Technology",
    desc: "Advisory on precision agriculture technologies, remote sensing, IoT sensor networks, and data-driven farm management. We help agribusinesses identify, pilot, and scale digital tools appropriate to their operating context.",
  },
];

function AgriculturePage() {
  return (
    <>
      <PageHero
        eyebrow="Food Sovereignty & Agriculture"
        title={
          <>
            A Taste of Home:
            <br />
            Culture Resourced
          </>
        }
        description="Ramotitanico's mobile butchery brings halal-certified, culturally appropriate meat to the Afro-Asian-Lusophone diaspora across Braga, Porto, and the Minho corridor. We also provide agribusiness consulting, sustainable farming advisory, and agritech implementation."
      />

      {/* Core Services Section */}
      <section className="container-page py-20">
        <SectionTitle
          eyebrow="What We Offer"
          title="Food Sovereignty, Sustainable Agriculture, Cultural Identity"
          description="Every kilo of meat sold, every farm advisory delivered, and every research project supported is a small act of cultural translation — a humanities practice carried out in kitchens, fields, and waiting rooms."
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
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                  {(s as any).details && (
                    <p className="mt-2 text-xs font-medium uppercase tracking-wider">
                      {(s as any).details}
                    </p>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Food Sovereignty & Identity Section (NEW - pulled from conference text) */}
      <section className="bg-primary py-20 text-primary-foreground">
        <div className="container-page max-w-4xl">
          <span className="inline-block rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Food as Identity
          </span>
          <h2 className="mt-5 font-display text-3xl font-semibold sm:text-4xl">
            A Taste of Home is Not a Luxury. It is Identity
          </h2>
          <div className="mt-6 space-y-4 text-primary-foreground/80 leading-relaxed">
            <p>
              Ramotitanico was built around one stubborn idea: the people who arrive here with the least paperwork often carry the most useful skills. We turn that skill into licensed, taxable, dignified work — and we bring the food that makes a place feel like home.
            </p>
            <p>
              Our mobile butchery serves the Afro-Asian-Lusophone diaspora with the cuts that Portuguese supermarkets quietly retired. Goat, mutton, beef offals, oxtail, cow feet, tripe, heads — halal-certified, ethically sourced, and delivered refrigerated across Braga, Porto, and the Minho corridor.
            </p>
            <p className="font-medium text-primary-foreground">
              Migration is not a problem to be managed. It is a culture to be resourced.
            </p>
          </div>
        </div>
      </section>

      {/* RISE Europe Integration Section (NEW) */}
      <section className="container-page py-20">
        <SectionTitle
          eyebrow="Study. Build. Belong."
          title="Rise Europe: Agriculture & Food Security Research"
          description="For international students, researchers, and migrant entrepreneurs. Our quarterly conferences and research forums connect agriculture, food security, and sustainable development with real-world practice."
        />
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          <div className="rounded-2xl border border-border bg-card p-8 text-center shadow-[var(--shadow-card)]">
            <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-accent/10 text-accent">
              <GraduationCap className="h-8 w-8" />
            </div>
            <h3 className="font-display text-xl font-semibold text-primary">Research & Innovation</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Quarterly conferences on Agriculture & Food Security, Sustainable Development, and Climate Change. Peer-reviewed publications in the Academia Humanities Journal.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-8 text-center shadow-[var(--shadow-card)]">
            <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-accent/10 text-accent">
              <Users className="h-8 w-8" />
            </div>
            <h3 className="font-display text-xl font-semibold text-primary">Research Exchange</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Monthly Research Collaboration Forums where scholars present ongoing work, find collaborators, and discuss funding opportunities across agritech and food systems.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-8 text-center shadow-[var(--shadow-card)]">
            <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-accent/10 text-accent">
              <Building2 className="h-8 w-8" />
            </div>
            <h3 className="font-display text-xl font-semibold text-primary">Policy & Practice</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Connecting universities, industry, governments, and entrepreneurs to build international research teams and develop policy frameworks for food sovereignty.
            </p>
          </div>
        </div>
        <div className="mt-10 text-center">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-primary">Outcome:</span> Research that influences policy, practices that nourish communities, and a platform where every researcher and practitioner can contribute.
          </p>
        </div>
      </section>

      {/* Impact Section (updated with conference values) */}
      <section className="bg-surface py-20">
        <div className="container-page max-w-4xl text-center">
          <span className="inline-block rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Our Values
          </span>
          <h2 className="mt-5 font-display text-3xl font-semibold text-primary sm:text-4xl">
            Inclusion, Cultural Understanding, Dignity, Dialogue, Sustainable Development
          </h2>
          <p className="mt-6 leading-relaxed text-foreground/80">
            Our daily work is the humanities in practice. Service is the surface; belonging is the substance. 
            Whether we're delivering halal meat, advising on sustainable farming, or supporting research on 
            food security, we participate in something larger than commerce — we participate in the human story.
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
    </>
  );
}