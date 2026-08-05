import { createFileRoute } from "@tanstack/react-router";
import { 
  ShieldAlert, 
  UserCheck, 
  GitPullRequestArrow, 
  Undo2,
  FileCheck2,
  AlertCircle,
  RefreshCw
} from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { SectionTitle } from "@/components/ui/section-title";

export const Route = createFileRoute("/publication-ethics")({
  head: () => ({
    meta: [
      { title: "Publication Ethics — Academia Humanities Review" },
      { name: "description", content: "Academia Humanities Review's publication ethics policy on authorship, originality, plagiarism, conflicts of interest, complaints, corrections, and retractions." },
      { property: "og:title", content: "Publication Ethics — Academia Humanities Review" },
      { property: "og:description", content: "Authorship criteria, originality checks, conflict-of-interest disclosure, complaints handling, corrections, and retraction policy." },
      { property: "og:url", content: "/publication-ethics" },
    ],
    links: [{ rel: "canonical", href: "/publication-ethics" }],
  }),
  component: PublicationEthicsPage,
});

const policies = [
  {
    icon: FileCheck2,
    title: "Academic Integrity",
    desc: "Academia Humanities Review is committed to maintaining high standards of academic integrity and publication ethics. The journal follows internationally accepted ethical principles for scholarly publishing and expects authors, editors, and reviewers to act with honesty, fairness, and transparency."
  },
  {
    icon: ShieldAlert,
    title: "Originality & Plagiarism",
    desc: "Authors must submit original work that has not been published elsewhere and is not under consideration by another journal. Plagiarism, data fabrication, duplicate publication, unethical authorship, and misrepresentation of sources are strictly prohibited."
  },
  {
    icon: RefreshCw,
    title: "Complaints, Corrections & Retractions",
    desc: "The journal will handle complaints, corrections, conflicts of interest, and retractions according to recognized publication ethics practices."
  },
];

const prohibitedPractices = [
  { label: "Plagiarism" },
  { label: "Data Fabrication" },
  { label: "Duplicate Publication" },
  { label: "Unethical Authorship" },
  { label: "Misrepresentation of Sources" },
];

const ethicalPrinciples = [
  { label: "Honesty" },
  { label: "Fairness" },
  { label: "Transparency" },
];

function PublicationEthicsPage() {
  return (
    <>
      <PageHero
        backTo="/journal"
        backLabel="Journal Services"
        eyebrow="Publication Ethics"
        title="Integrity is Non-Negotiable"
        description="The journal follows internationally accepted ethical principles for scholarly publishing and expects all parties to act with honesty, fairness, and transparency."
      />

      <section className="container-page py-20">
        {/* Overview Paragraph */}
        <div className="max-w-4xl space-y-4">
          <p className="text-base leading-relaxed text-muted-foreground text-justify">
            <strong>Academia Humanities Review</strong> is committed to maintaining high standards of academic 
            integrity and publication ethics. The journal follows internationally accepted ethical principles 
            for scholarly publishing and expects authors, editors, and reviewers to act with honesty, fairness, 
            and transparency.
          </p>
          <p className="text-base leading-relaxed text-muted-foreground text-justify">
            Authors must submit original work that has not been published elsewhere and is not under 
            consideration by another journal. Plagiarism, data fabrication, duplicate publication, unethical 
            authorship, and misrepresentation of sources are strictly prohibited.
          </p>
          <p className="text-base leading-relaxed text-muted-foreground text-justify">
            The journal will handle complaints, corrections, conflicts of interest, and retractions according 
            to recognized publication ethics practices.
          </p>
        </div>

        {/* Policy Cards */}
        <div className="mt-16">
          <SectionTitle
            eyebrow="Our Standards"
            title="Ethical Principles"
            description="The journal is guided by these core principles and policies."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {policies.map((p) => (
              <article
                key={p.title}
                className="rounded-2xl border border-border bg-card p-7 shadow-[var(--shadow-card)] transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-elevated)]"
              >
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary text-primary-foreground">
                  <p.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold text-primary">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground text-justify">
                  {p.desc}
                </p>
              </article>
            ))}
          </div>
        </div>

        {/* Prohibited Practices - Warning Section */}
        <div className="mt-16 rounded-2xl border border-red-200 bg-red-50 p-8">
          <div className="flex items-start gap-4">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-red-100 text-red-600">
              <AlertCircle className="h-5 w-5" />
            </span>
            <div>
              <h3 className="font-display text-xl font-semibold text-red-700">Strictly Prohibited Practices</h3>
              <p className="mt-2 text-sm text-red-600">
                The following practices are strictly prohibited and will result in immediate rejection:
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                {prohibitedPractices.map((p) => (
                  <span
                    key={p.label}
                    className="inline-flex items-center rounded-full border border-red-200 bg-white px-4 py-2 text-sm font-medium text-red-700 shadow-sm"
                  >
                    {p.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Core Principles - Positive Section */}
        <div className="mt-8 rounded-2xl border border-green-200 bg-green-50 p-8">
          <div className="flex items-start gap-4">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-green-100 text-green-600">
              <UserCheck className="h-5 w-5" />
            </span>
            <div>
              <h3 className="font-display text-xl font-semibold text-green-700">Core Ethical Principles</h3>
              <p className="mt-2 text-sm text-green-600">
                All parties involved in the publishing process are expected to uphold these principles:
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                {ethicalPrinciples.map((p) => (
                  <span
                    key={p.label}
                    className="inline-flex items-center rounded-full border border-green-200 bg-white px-4 py-2 text-sm font-medium text-green-700 shadow-sm"
                  >
                    {p.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Additional Note */}
        <div className="mt-12 border-t border-border pt-8">
          <div className="flex items-start gap-4">
            <Undo2 className="h-5 w-5 shrink-0 text-muted-foreground" />
            <p className="text-sm leading-relaxed text-muted-foreground">
              Suspected violations of this policy can be reported in confidence to the editorial office. 
              All reports are reviewed by the <strong>Editor-in-Chief</strong> in line with internationally 
              recognized publication ethics practices for handling allegations of misconduct.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}