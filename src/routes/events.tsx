import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Award,
  CalendarCheck,
  FileText,
  Globe,
  Mic2,
  Network,
  CalendarClock,
  BookOpen,
  Send,
  Copy,
  Check,
  Mail,
} from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { SectionTitle } from "@/components/ui/section-title";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import abstractBook from "@/assets/book/abstract-book.pdf";
import { useState } from "react";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "Events & Conferences — Ramotitanico" },
      {
        name: "description",
        content:
          "Featured international conference, call for papers, and a worldwide programme of scholarly events.",
      },
      { property: "og:title", content: "Events & Conferences — Ramotitanico" },
      {
        property: "og:description",
        content:
          "International Conference on Education, Research & Sustainable Innovation — 27–28 June 2026.",
      },
      { property: "og:url", content: "/events" },
    ],
    links: [{ rel: "canonical", href: "/events" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Event",
          name: "International Conference on Education, Research & Sustainable Innovation 2026",
          startDate: "2026-06-27",
          endDate: "2026-06-28",
          eventStatus: "https://schema.org/EventScheduled",
          eventAttendanceMode: "https://schema.org/MixedEventAttendanceMode",
          location: {
            "@type": "Place",
            name: "Braga, Portugal",
            address: { "@type": "PostalAddress", addressLocality: "Braga", addressCountry: "PT" },
          },
          organizer: { "@type": "Organization", name: "Ramotitanico" },
        }),
      },
    ],
  }),
  component: EventsPage,
});

const timeline = [
  {
    date: "27–28 June 2026",
    title: "Online & Hybrid",
    desc: "Two days of scholarly presentations, discussions, and networking.",
    icon: CalendarCheck,
  },
  {
    date: "26-27  September 2026",
    title: "Online, Hybrid & Physical Mode",
    desc: "Presentation of accepted papers and participation in the conference across all modes.",
    icon: CalendarClock,
  },
];
const timeline2 = [
  {
    date: "5 September 2026",
    title: "Abstract Submission Deadline",
    desc: "Last date to submit your abstract for review and consideration by the scientific committee.",
    icon: CalendarClock,
  },
  {
    date: "8 September 2026",
    title: "Notification of Acceptance",
    desc: "Authors will be notified about the acceptance status of their submitted abstracts.",
    icon: CalendarCheck,
  },
  {
    date: "15 September 2026",
    title: "Registration Deadline",
    desc: "Last date for authors and participants to complete their registration for the conference.",
    icon: Award,
  },
];

const benefits = [
  {
    icon: Award,
    title: "Official Certificates",
    desc: "Participation and presentation certificates issued by Ramotitanico.",
  },
  {
    icon: FileText,
    title: "Publication Opportunity",
    desc: "Selected papers published in indexed proceedings and edited volumes.",
  },
  {
    icon: Network,
    title: "International Networking",
    desc: "Curated sessions with scholars and practitioners from 40+ countries.",
  },
  {
    icon: Globe,
    title: "Global Exposure",
    desc: "Profile, abstract, and affiliation listed in the official conference programme.",
  },
];

function EventsPage() {
  const [copied, setCopied] = useState(false);
  const email = "humanitiesacdemia@gmail.com";

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <PageHero
        eyebrow="Events & Conferences"
        title="A Worldwide Programme of Scholarly Gatherings."
        description="From flagship international conferences in Braga to regional symposia and executive seminars across our partner network."
      />

      {/* Featured Conference */}
      <section className="container-page py-20">
        <div className="overflow-hidden rounded-3xl border border-border bg-primary text-primary-foreground shadow-[var(--shadow-elevated)]">
          <div className="grid gap-0 lg:grid-cols-[1.3fr_1fr]">
            <div className="p-10 sm:p-14">
              <span className="inline-block rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                Flagship · 27–28 June 2026 · Braga
              </span>
              <h2 className="mt-5 font-display text-3xl font-semibold leading-tight sm:text-4xl">
                1st International Conference on Humanities Beyond Borders: Culture, Identity and Global Dialogues
              </h2>
              <p className="mt-4 text-primary-foreground/80 text-justify">
                Two days of plenary lectures, parallel panels, doctoral colloquia, and policy
                roundtables — convening scholars, educators, and decision-makers from across
                continents to interrogate the most pressing questions in contemporary education and
                research.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Dialog>
                  <DialogTrigger asChild>
                    {/* <button
                      type="button"
                      className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground hover:brightness-95"
                    >
                      Call for Abstract
                    </button> */}
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Call for Papers — Key Dates</DialogTitle>
                      <DialogDescription>
                        Important submission deadlines for the International Conference on
                        Education, Research & Sustainable Innovation.
                      </DialogDescription>
                    </DialogHeader>
                    <ul className="grid gap-4">
                      {timeline.map((t) => (
                        <li key={t.title} className="flex items-start gap-3">
                          <t.icon className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                          <div>
                            <p className="font-semibold text-primary">{t.date}</p>
                            <p className="text-sm text-muted-foreground">{t.title}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </DialogContent>
                </Dialog>
                <a
                  href="#timeline"
                  className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground hover:brightness-95"
                >
                  View Timeline
                </a>
                <a
                  href={abstractBook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground hover:brightness-95"
                >
                  <BookOpen className="h-4 w-4" />
                  Abstract Book
                </a>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-px bg-primary-foreground/15">
              {[
                { k: "70+", v: "Participants" },
                { k: "6+", v: "Countries" },
                { k: "50+", v: "Papers" },
                { k: "8", v: "Plenaries" },
              ].map((s) => (
                <div key={s.v} className="flex flex-col items-center justify-center bg-primary p-8">
                  <span className="font-display text-3xl font-semibold text-accent">{s.k}</span>
                  <span className="mt-2 text-xs uppercase tracking-wider text-primary-foreground/70">
                    {s.v}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* second call for papers */}
      
<section className="container-page py-20">
  <div className="overflow-hidden rounded-3xl border border-border bg-primary text-primary-foreground shadow-[var(--shadow-elevated)]">
    <div className="grid gap-0 lg:grid-cols-[1.3fr_1fr]">
      <div className="p-10 sm:p-14">
        <span className="inline-block rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          Flagship · 26–27 September 2026 · Braga
        </span>
        <h2 className="mt-5 font-display text-3xl font-semibold leading-tight sm:text-4xl">
          2nd International Conference on Crisis and Humanity: Paradigm Shift in Language and 
          Literature in the 21st Century
        </h2>
        <p className="mt-4 text-primary-foreground/80 text-justify">
          This second international conference brings together distinguished scholars, 
          linguists, literary critics, and researchers from around the world to explore the 
          transformative role of language and literature in addressing contemporary crises. 
          Through keynote addresses, parallel paper sessions, and interactive roundtables, 
          the conference seeks to redefine disciplinary boundaries and foster a paradigm 
          shift in the humanities for the 21st century.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Dialog>
            <DialogTrigger asChild>
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground hover:brightness-95"
              >
                Call for Abstract
              </button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Call for Papers — Key Dates (Crisis and Humanity Conference)</DialogTitle>
                <DialogDescription>
                  Important submission deadlines for the 2nd International Conference on Crisis and Humanity.
                </DialogDescription>
              </DialogHeader>
              <ul className="grid gap-4">
                {timeline2.map((t) => (
                  <li key={t.title} className="flex items-start gap-3">
                    <t.icon className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                    <div>
                      <p className="font-semibold text-primary">{t.date}</p>
                      <p className="text-sm text-muted-foreground">{t.title}</p>
                      <p className="text-xs text-muted-foreground/70">{t.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </DialogContent>
          </Dialog>
          <a
            href="#timeline"
            className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground hover:brightness-95"
          >
            View Timeline
          </a>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-px bg-primary-foreground/15">
        {[
          { k: "70+", v: "Participants" },
          { k: "6+", v: "Countries" },
          { k: "50+", v: "Papers" },
          { k: "8", v: "Plenaries" },
        ].map((s) => (
          <div key={s.v} className="flex flex-col items-center justify-center bg-primary p-8">
            <span className="font-display text-3xl font-semibold text-accent">{s.k}</span>
            <span className="mt-2 text-xs uppercase tracking-wider text-primary-foreground/70">
              {s.v}
            </span>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>

      {/* Call for papers */}
      <section id="call-for-papers" className="bg-surface py-20">
        <div className="container-page grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <SectionTitle
              eyebrow="Call for Papers"
              title="Submit Your Contribution."
              description="We welcome original research, case studies, policy analyses, and theoretical contributions across education, research methodology, innovation studies, and sustainable development."
            />
            <div className="mt-6">
              <Dialog>
                <DialogTrigger asChild>
                  <button className="inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground shadow-sm transition-all hover:brightness-95">
                    <Send className="h-4 w-4" />
                    Submit Your Abstract
                  </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <Mail className="h-5 w-5 text-accent" />
                      Submit Your Abstract
                    </DialogTitle>
                    <DialogDescription>
                      Send your abstract to our editorial team for review and consideration.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="rounded-lg bg-surface p-4 border border-border">
                      <p className="text-sm text-foreground/80 mb-3">
                        If you want to submit your abstract, please send it to the following email address:
                      </p>
                      <div className="flex items-center gap-3 bg-card p-3 rounded-md border border-border">
                        <Mail className="h-4 w-4 text-accent shrink-0" />
                        <span className="text-sm font-medium text-primary">{email}</span>
                        <button
                          onClick={copyEmail}
                          className="ml-auto inline-flex items-center gap-1.5 rounded-md bg-accent/10 px-3 py-1.5 text-xs font-medium text-accent-foreground transition-all hover:bg-accent/20"
                        >
                          {copied ? (
                            <>
                              <Check className="h-3.5 w-3.5" />
                              Copied!
                            </>
                          ) : (
                            <>
                              <Copy className="h-3.5 w-3.5" />
                              Copy
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                    <div className="rounded-lg bg-accent/5 p-4 border border-accent/20">
                      <h4 className="text-sm font-semibold text-primary mb-2">Submission Guidelines:</h4>
                      <ul className="space-y-1.5 text-sm text-foreground/75">
                        <li className="flex items-start gap-2">
                          <span className="text-accent">•</span>
                          Include your full name, affiliation, and contact details
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-accent">•</span>
                          Abstract should be between 250-300 words
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-accent">•</span>
                          Mention 3-5 keywords relevant to your research
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-accent">•</span>
                          Indicate your preferred presentation mode (online/hybrid/physical)
                        </li>
                      </ul>
                    </div>
                    <div className="rounded-lg bg-primary/5 p-3 border border-primary/10">
                      <p className="text-xs text-foreground/60">
                        <span className="font-semibold">Note:</span> All submissions will be reviewed by our scientific committee. 
                        You will receive a confirmation email within 3-5 working days.
                      </p>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-card p-8 shadow-[var(--shadow-card)]">
            <h3 className="font-display text-xl font-semibold text-primary">Suggested Themes</h3>
            <ul className="mt-4 grid gap-3 text-sm text-foreground/85 sm:grid-cols-2">
              {[
                "Future of Higher Education",
                "Research Methodology & Ethics",
                "Sustainability in Curricula",
                "Digital Pedagogy & AI",
                "Comparative Education Policy",
                "Cross-cultural Collaboration",
                "Postcolonial Studies",
                "Cultural Memory and Identity",
                "Migration and Diaspora",
                "Gender and Feminist Studies",
                "Digital Humanities",
                "Comparative Literature",
                "Globalization and Culture",
                "Language, Power and Representation",
                "Cultural Contact Zone",
                "Education in 2026",
                "TESOL",
                "Linguistics",
                "New World Order, Bipolar and Unipolarity in Literature",
                "War Literature, Identity and Economy in 2026",
              ].map((t) => (
                <li key={t} className="flex items-start gap-2">
                  <Mic2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section id="timeline" className="container-page py-20">
        <SectionTitle align="center" eyebrow="Conference Timeline" title="Key Dates for 2026." />
        <div className="mx-auto mt-14 max-w-3xl">
          <ol className="relative border-l-2 border-accent/40 pl-6">
            {timeline.map((t) => (
              <li key={t.title} className="mb-10 last:mb-0">
                <span className="absolute -left-[15px] grid h-7 w-7 place-items-center rounded-full bg-accent text-accent-foreground shadow">
                  <t.icon className="h-3.5 w-3.5" />
                </span>
                <div className="text-xs font-semibold uppercase tracking-wider text-accent-foreground/80">
                  {t.date}
                </div>
                <h3 className="mt-1 font-display text-lg font-semibold text-primary">{t.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{t.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-surface py-20">
        <div className="container-page">
          <SectionTitle align="center" eyebrow="Why Attend" title="What Participants Gain." />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((b) => (
              <div
                key={b.title}
                className="rounded-2xl border border-border bg-card p-7 text-center shadow-[var(--shadow-card)]"
              >
                <span className="mx-auto grid h-12 w-12 place-items-center rounded-lg bg-accent-soft text-accent-foreground">
                  <b.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold text-primary">{b.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}