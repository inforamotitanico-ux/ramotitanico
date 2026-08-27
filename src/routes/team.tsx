import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/ui/page-hero";
import { SectionTitle } from "@/components/ui/section-title";

export const Route = createFileRoute("/team")({
  head: () => ({
    meta: [
      { title: "Team — Ramotitanico" },
      { name: "description", content: "Founder, advisory board, conference committee, and international representatives behind Ramotitanico." },
      { property: "og:title", content: "Team — Ramotitanico" },
      { property: "og:description", content: "Meet the people leading Ramotitanico's global academic work." },
      { property: "og:url", content: "/team" },
    ],
    links: [{ rel: "canonical", href: "/team" }],
  }),
  component: TeamPage,
});

interface Person {
  initials: string;
  name: string;
  role: string;
  bio: string;
}

const founder: Person = {
  initials: "RM",
  name: "Dr. Rasib Mahmood",
  role: "Founder, Honorary CEO & Managing Director",
  bio: "Leads the organization's strategic direction, international partnerships, and editorial programme. Two decades of experience across European and Asian higher education institutions. Committed to fostering interdisciplinary dialogue, advancing open-access scholarship, and creating meaningful opportunities for researchers to contribute to global knowledge production."
};

const advisory: Person[] = [
  { initials: "AB", name: "Senior Academic Advisor", role: "Comparative Education", bio: "Former dean and curriculum policy advisor; specialist in European higher education reform." },
  { initials: "CD", name: "Research Methods Advisor", role: "Quantitative Methods", bio: "Statistical methodology expert; serves on multiple journal editorial boards." },
  { initials: "EF", name: "Publications Advisor", role: "Scholarly Publishing", bio: "Twenty-year career across academic publishers in London and Amsterdam." },
  { initials: "GH", name: "Sustainability Advisor", role: "Environmental Education", bio: "Researcher and consultant on sustainability integration in university curricula." },
];

const committee: Person[] = [
  { initials: "IJ", name: "Conference Chair", role: "Programme Lead", bio: "Coordinates plenary speakers, scientific committee, and proceedings." },
  { initials: "KL", name: "Peer Review Lead", role: "Editorial Quality", bio: "Oversees double-blind review for conference submissions." },
  { initials: "MN", name: "Operations Lead", role: "Logistics & Venues", bio: "Manages event production, hospitality, and on-site coordination." },
];

const reps: Person[] = [
  { initials: "OP", name: "Europe Representative", role: "Berlin, Germany", bio: "Liaises with European universities and policy bodies." },
  { initials: "QR", name: "South Asia Representative", role: "New Delhi, India", bio: "Coordinates partnerships across South Asian institutions." },
  { initials: "ST", name: "Africa Representative", role: "Nairobi, Kenya", bio: "Builds collaborations with African universities and NGOs." },
  { initials: "UV", name: "Americas Representative", role: "São Paulo, Brazil", bio: "Manages relationships across Latin and North America." },
];

function Card({ p, featured = false }: { p: Person; featured?: boolean }) {
  return (
    <article
      className={`rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)] transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-elevated)] ${featured ? "md:p-8" : ""}`}
    >
      <div
        className={`grid place-items-center rounded-xl bg-primary text-primary-foreground font-display font-semibold ${featured ? "h-20 w-20 text-2xl" : "h-16 w-16 text-xl"}`}
      >
        {p.initials}
      </div>
      <h3 className={`mt-5 font-display font-semibold text-primary ${featured ? "text-2xl" : "text-lg"}`}>
        {p.name}
      </h3>
      <div className="mt-1 text-xs font-medium uppercase tracking-wider text-accent-foreground/80">{p.role}</div>
      <p className={`mt-3 text-sm leading-relaxed text-muted-foreground ${featured ? "text-justify" : ""}`}>
        {p.bio}
      </p>
    </article>
  );
}

function Group({ title, eyebrow, people }: { title: string; eyebrow: string; people: Person[] }) {
  return (
    <section className="container-page py-16">
      <SectionTitle eyebrow={eyebrow} title={title} />
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {people.map((p) => (
          <Card key={p.initials + p.name} p={p} />
        ))}
      </div>
    </section>
  );
}

function TeamPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Team"
        title="Scholars and Practitioners Advancing a Shared Mission"
        description="Ramotitanico is led by an experienced director, supported by a distinguished advisory board, a working conference committee, and regional representatives across continents."
      />

      <section className="container-page py-16">
        <SectionTitle eyebrow="Leadership" title="Founder & Director" />
        <div className="mt-10 max-w-xl">
          <Card p={founder} featured />
        </div>
      </section>

      <Group eyebrow="Advisory" title="Academic Advisory Board" people={advisory} />
      <div className="bg-surface">
        <Group eyebrow="Programme" title="Conference Committee" people={committee} />
      </div>
      <Group eyebrow="Global Network" title="International Representatives" people={reps} />
    </>
  );
}