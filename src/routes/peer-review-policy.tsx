import { createFileRoute } from "@tanstack/react-router";
import { 
  Send, 
  ShieldCheck, 
  Users2, 
  FileCheck2, 
  MessageSquare, 
  Award,
  Clock,
  CheckCircle,
  XCircle,
  RefreshCw
} from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { SectionTitle } from "@/components/ui/section-title";

export const Route = createFileRoute("/peer-review-policy")({
  head: () => ({
    meta: [
      { title: "Peer Review Policy — Academia Humanities Review" },
      { name: "description", content: "Academia Humanities Review's double-blind peer review process: initial screening, independent review, and editorial decision." },
      { property: "og:title", content: "Peer Review Policy — Academia Humanities Review" },
      { property: "og:description", content: "How manuscripts are reviewed: editorial screening, double-blind peer review, and final decision process." },
      { property: "og:url", content: "/peer-review-policy" },
    ],
    links: [{ rel: "canonical", href: "/peer-review-policy" }],
  }),
  component: PeerReviewPage,
});

// Process Steps
const steps = [
  { 
    icon: Send, 
    title: "Initial Editorial Screening", 
    desc: "All submissions undergo an initial editorial screening to ensure they meet the journal's aims, scope, and formatting requirements."
  },
  { 
    icon: Users2, 
    title: "Reviewer Assignment", 
    desc: "Manuscripts that pass screening are sent for double-blind peer review. Each article is normally reviewed by two independent reviewers."
  },
  { 
    icon: ShieldCheck, 
    title: "Double-Blind Review", 
    desc: "The identities of authors and reviewers remain confidential throughout the review process to ensure unbiased evaluation."
  },
  { 
    icon: MessageSquare, 
    title: "Reviewer Reports", 
    desc: "Reviewers provide detailed reports with recommendations and constructive feedback to help authors improve their work."
  },
  { 
    icon: FileCheck2, 
    title: "Editorial Decision", 
    desc: "Based on reviewers' reports, the editorial team makes one of the following decisions:"
  },
];

// Decision Types
const decisions = [
  { icon: CheckCircle, label: "Accepted", color: "text-green-600", bg: "bg-green-50" },
  { icon: RefreshCw, label: "Accepted with Minor Revisions", color: "text-blue-600", bg: "bg-blue-50" },
  { icon: RefreshCw, label: "Accepted with Major Revisions", color: "text-yellow-600", bg: "bg-yellow-50" },
  { icon: RefreshCw, label: "Resubmission Required", color: "text-orange-600", bg: "bg-orange-50" },
  { icon: XCircle, label: "Rejected", color: "text-red-600", bg: "bg-red-50" },
];

function PeerReviewPage() {
  return (
    <>
      <PageHero
        backTo="/journal"
        backLabel="Journal Services"
        eyebrow="Peer Review Policy"
        title="Rigorous, Double-Blind, and Transparent"
        description="Every submission that passes initial screening undergoes double-blind peer review by at least two independent experts in the relevant field."
      />

      <section className="container-page py-20">
        {/* Overview Paragraph */}
        <div className="max-w-4xl space-y-4">
          <p className="text-base leading-relaxed text-muted-foreground text-justify">
            All submissions to <strong>Academia Humanities Review</strong> will undergo an initial editorial screening. 
            Manuscripts that meet the journal's aims, scope, and formatting requirements will be sent for double-blind 
            peer review.
          </p>
          <p className="text-base leading-relaxed text-muted-foreground text-justify">
            Each article will normally be reviewed by two independent reviewers. The identities of authors and reviewers 
            will remain confidential. Based on reviewers' reports, the editorial decision may be: accepted, accepted with 
            minor revisions, accepted with major revisions, resubmission required, or rejected.
          </p>
          <p className="text-base leading-relaxed text-muted-foreground text-justify">
            The final decision will rest with the <strong>Editor-in-Chief</strong>, in consultation with the editorial team.
          </p>
        </div>

        {/* Process Steps */}
        <div className="mt-16">
          <SectionTitle
            eyebrow="Process"
            title="Peer Review Process"
            description="A step-by-step overview of how manuscripts are handled from submission to decision."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {steps.map((s, i) => (
              <article
                key={s.title}
                className="rounded-2xl border border-border bg-card p-7 shadow-[var(--shadow-card)] transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-elevated)]"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                  {i + 1}
                </span>
                <div className="mt-4 flex items-center gap-2">
                  <s.icon className="h-6 w-6 shrink-0 text-accent" />
                  <h3 className="font-display text-lg font-semibold text-primary">{s.title}</h3>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground text-justify">
                  {s.desc}
                </p>
              </article>
            ))}
          </div>
        </div>

        {/* Decision Types */}
        <div className="mt-16 rounded-2xl border border-border bg-surface p-8">
          <div className="flex items-start gap-4">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-accent text-accent-foreground">
              <Award className="h-6 w-6" />
            </span>
            <div className="flex-1">
              <h3 className="font-display text-xl font-semibold text-primary">Editorial Decisions</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Based on reviewers' reports, the editorial team may make one of the following decisions:
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {decisions.map((d) => (
                  <div
                    key={d.label}
                    className={`flex items-center gap-3 rounded-lg border border-border px-4 py-3 ${d.bg} transition-all hover:shadow-[var(--shadow-card)]`}
                  >
                    <d.icon className={`h-5 w-5 shrink-0 ${d.color}`} />
                    <span className="text-sm font-medium text-foreground">{d.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Final Decision Note */}
        <div className="mt-8 rounded-xl border border-primary/20 bg-primary/5 p-6">
          <div className="flex items-start gap-4">
            <Clock className="h-5 w-5 shrink-0 text-primary" />
            <div>
              <h4 className="font-display font-semibold text-primary">Final Decision</h4>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                The final decision rests with the <strong>Editor-in-Chief</strong>, in consultation with the editorial team, 
                ensuring that all decisions are made with careful consideration of reviewer feedback and journal standards.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}