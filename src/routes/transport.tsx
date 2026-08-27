import { createFileRoute } from "@tanstack/react-router";
import { 
  Car, 
  Key, 
  CalendarDays, 
  MapPin, 
  ShieldCheck, 
  Smartphone, 
  Bike,
  GraduationCap,
  Building2,
  Utensils,
  Globe
} from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { SectionTitle } from "@/components/ui/section-title";

export const Route = createFileRoute("/transport")({
  head: () => ({
    meta: [
      { title: "Mobility & Infrastructure — Ramotitanico" },
      { name: "description", content: "Rent motorbikes, e-bikes, and cars across Portugal. Built for the Afro-Asian-Lusophone diaspora. Part of RISE Europe's integrated study + enterprise platform." },
      { property: "og:title", content: "Mobility & Infrastructure — Ramotitanico" },
      { property: "og:description", content: "Fully insured motorbikes, e-bikes, cycles, and cars for delivery riders, students, and families. Turn mobility into dignity, paperwork into a tax record." },
      { property: "og:url", content: "/transport" },
    ],
    links: [{ rel: "canonical", href: "/transport" }],
  }),
  component: TransportPage,
});

const services = [
  {
    icon: Bike,
    title: "Motorbikes for the People the Platforms Forget",
    desc: "We acquire and rent motorbikes, e-bikes, and cycles to immigrants who want to ride for Uber Eats, Glovo, and Bolt Food while their residency paperwork is still in motion. A bike under them today is a tax record.",
    details: "Fully insured · fleet-managed · always ready. Daily, weekly, and monthly hire options. A clear pathway from rider → owner → small fleet operator.",
  },
  {
    icon: Car,
    title: "Direct Vehicle Rental",
    desc: "Rent from Ramotitanico's own managed fleet. Choose from economy hatchbacks to spacious SUVs, with competitive daily and weekly rates, instant online booking, and no hidden fees.",
  },
  {
    icon: Key,
    title: "List Your Car & Earn",
    desc: "Own a vehicle you're not always using? Register it on our platform and rent it to verified customers. We handle payments, insurance, and support — you collect the earnings.",
  },
  {
    icon: CalendarDays,
    title: "Flexible Rental Plans",
    desc: "Hourly, daily, weekly, or long-term monthly rates. Digital contracts, straightforward pricing, and plans that adapt to delivery riders, students, and families alike.",
  },
  {
    icon: MapPin,
    title: "Serving the Minho Corridor & Beyond",
    desc: "Pick up in Braga, Porto, and key cities across Portugal. Our mobile route serves the Afro-Asian-Lusophone diaspora in the neighborhoods that ask for us.",
  },
  {
    icon: ShieldCheck,
    title: "Fully Insured & Fleet-Managed",
    desc: "Every vehicle carries comprehensive insurance. Owner-listed cars are verified under our P2P protection scheme. Renters and owners both have peace of mind.",
  },
  {
    icon: Smartphone,
    title: "Easy Online Booking",
    desc: "Search availability, compare vehicles, and book in minutes. Real-time availability, instant confirmation, digital agreements, and support when you need it.",
  },
];

function TransportPage() {
  return (
    <>
      <PageHero
        eyebrow="Mobility & Infrastructure"
        title={
          <>
            Move, Earn,
            <br />
            Belong
          </>
        }
        description="Ramotitanico turns mobility into dignity. Rent motorbikes, e-bikes, and cars across Portugal. Built for the diaspora — because migration is not a problem to be managed, it is a culture to be resourced."
      />

      {/* Core Services Section */}
      <section className="container-page py-20">
        <SectionTitle
          eyebrow="Our Fleet & Platform"
          title="Everything You Need to Rent or Earn"
          description="Whether you're a delivery rider waiting for paperwork, a student in the RISE program, or a car owner with an idle vehicle, our platform connects both sides simply and safely."
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
                  {(s as any).details && (
                    <p className="mt-2 text-xs font-medium uppercase tracking-wider text-accent">
                      {(s as any).details}
                    </p>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* For Owners vs Renters */}
      <section className="bg-surface py-20">
        <div className="container-page grid gap-16 lg:grid-cols-2">
          <div>
            <span className="inline-block rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              For Owners
            </span>
            <h2 className="mt-5 font-display text-3xl font-semibold text-primary">
              Your Vehicle Earns While You Don't Drive
            </h2>
            <p className="mt-4 leading-relaxed text-foreground/80 text-justify">
              Registering your vehicle takes minutes. We verify, manage bookings, coordinate payments, and handle enquiries. You set availability and pricing — we do the rest.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Quick vehicle registration",
                "You control availability and rates",
                "Payments deposited to your account",
                "P2P insurance protection included",
              ].map((f) => (
                <li key={f} className="flex items-center gap-2.5 text-sm text-foreground/80">
                  <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <span className="inline-block rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              For Renters
            </span>
            <h2 className="mt-5 font-display text-3xl font-semibold text-primary">
              The Right Ride, Wherever You Are
            </h2>
            <p className="mt-4 leading-relaxed text-foreground/80">
              Browse our fleet and owner-listed vehicles by location, date, and category. Book instantly, collect with a digital contract. No queues, no paperwork surprises.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Motorbikes, e-bikes, cycles, and cars",
                "Hourly to monthly rental plans",
                "Pickup across Braga, Porto, and beyond",
                "All rentals fully insured",
              ].map((f) => (
                <li key={f} className="flex items-center gap-2.5 text-sm text-foreground/80">
                  <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Humanities & Infrastructure Section (NEW - pulled from conference text) */}
      <section className="bg-primary py-20 text-primary-foreground">
        <div className="container-page max-w-4xl">
          <span className="inline-block rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Infrastructure as Culture
          </span>
          <h2 className="mt-5 font-display text-3xl font-semibold sm:text-4xl">
            Mobility is Not Just Logistics. It's Cultural Translation
          </h2>
          <div className="mt-6 space-y-4 text-primary-foreground/80 leading-relaxed">
            <p className="text-justify">
              Ramotitanico is a Portuguese company built around one stubborn idea: the people who arrive here with the least paperwork often carry the most useful skills. We turn that skill into licensed, taxable, dignified work.
            </p>
            <p className="text-justify">
              Every motorbike rented, every kilo of meat sold, and every enrolment confirmed is a small act of cultural translation — a humanities practice carried out in workshops, kitchens, and waiting rooms. We are run by, and for, the Afro-Asian-Lusophone diaspora.
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
          title="Rise Europe: Integrated Study + Enterprise"
          description="For international students and migrant entrepreneurs. Graduate with a degree, a business, and a pathway to belonging — all while using our mobility platform."
        />
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          <div className="rounded-2xl border border-border bg-card p-8 text-center shadow-[var(--shadow-card)]">
            <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-accent/10 text-accent">
              <GraduationCap className="h-8 w-8" />
            </div>
            <h3 className="font-display text-xl font-semibold text-primary">Education</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Admissions, visa support, and qualification recognition. We walk students through the maze so they enrol on day one.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-8 text-center shadow-[var(--shadow-card)]">
            <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-accent/10 text-accent">
              <Building2 className="h-8 w-8" />
            </div>
            <h3 className="font-display text-xl font-semibold text-primary">Settlement</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Housing, bank accounts, tax registration, and AIMA appointments. Help families build equity, not just pay rent.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-8 text-center shadow-[var(--shadow-card)]">
            <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-accent/10 text-accent">
              <Globe className="h-8 w-8" />
            </div>
            <h3 className="font-display text-xl font-semibold text-primary">Enterprise</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Business registration, mentoring, and investment readiness. Launch a business while you study — graduate with income and a network.
            </p>
          </div>
        </div>
        <div className="mt-10 text-center">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-primary">Outcome:</span> A recognised degree, a sustainable income, a registered business, a professional network, and a pathway to belonging.
          </p>
        </div>
      </section>
    </>
  );
}