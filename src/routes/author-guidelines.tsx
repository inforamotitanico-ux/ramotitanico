import { createFileRoute } from "@tanstack/react-router";
import { 
  FileText, 
  CheckCircle2, 
  Ruler, 
  Quote,
  User,
  Mail,
  Key,
  BookOpen,
  FileUp,
  ShieldCheck,
  Send,
  Copy,
  Check
} from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { SectionTitle } from "@/components/ui/section-title";
import { useState } from "react";

export const Route = createFileRoute("/author-guidelines")({
  head: () => ({
    meta: [
      { title: "Author Guidelines — Academia Humanities Review" },
      { name: "description", content: "Manuscript preparation and formatting guidelines for authors submitting to Academia Humanities Review." },
      { property: "og:title", content: "Author Guidelines — Academia Humanities Review" },
      { property: "og:description", content: "Formatting, structure, and submission requirements for prospective journal authors." },
      { property: "og:url", content: "/author-guidelines" },
    ],
    links: [{ rel: "canonical", href: "/author-guidelines" }],
  }),
  component: AuthorGuidelinesPage,
});

const submissionRequirements = [
  { icon: FileText, label: "Title of the Article" },
  { icon: User, label: "Author Name and Affiliation" },
  { icon: Mail, label: "Email Address" },
  { icon: BookOpen, label: "Abstract of 150–250 words" },
  { icon: Key, label: "5–7 Keywords" },
  { icon: FileText, label: "Main Article" },
  { icon: Quote, label: "References in APA 7th Edition Style" },
];

const formatRequirements = [
  { icon: Ruler, label: "Word Count", desc: "5,000–8,000 words including references" },
  { icon: FileText, label: "File Format", desc: "Microsoft Word format (.docx)" },
  { icon: ShieldCheck, label: "Plagiarism Check", desc: "All manuscripts screened before review" },
  { icon: CheckCircle2, label: "Scope", desc: "Original manuscripts related to humanities and interdisciplinary studies" },
];

function AuthorGuidelinesPage() {
  const [copied, setCopied] = useState(false);
  const email = "admin@ramotitanico.com";

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <PageHero
        backTo="/journal"
        backLabel="Journal Services"
        eyebrow="Author Guidelines"
        title="How to Prepare Your Manuscript"
        description="Manuscripts that follow these guidelines move through initial editorial screening more quickly. Please review each section before submission."
      />

      <section className="container-page py-10 sm:py-16 md:py-20">
        {/* Overview Paragraph */}
        <div className="max-w-4xl space-y-3 sm:space-y-4">
          <p className="text-sm sm:text-base leading-relaxed text-muted-foreground text-justify">
            Authors should submit original manuscripts related to the humanities and interdisciplinary studies. 
            Manuscripts should normally be between <strong>5,000 and 8,000 words</strong>, including references.
          </p>
          <p className="text-sm sm:text-base leading-relaxed text-muted-foreground text-justify">
            All manuscripts should be submitted in <strong>Microsoft Word format</strong>. The journal will use 
            plagiarism-checking software before sending manuscripts for review.
          </p>
        </div>

        {/* Submission Requirements */}
        <div className="mt-12 sm:mt-16">
          <SectionTitle
            eyebrow="Requirements"
            title="Submission Requirements"
            description="Every submission must include the following elements:"
          />
          <div className="mt-8 sm:mt-10 grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {submissionRequirements.map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-3 rounded-xl border border-border bg-card p-3 sm:p-4 shadow-[var(--shadow-card)] transition-all hover:-translate-y-1 hover:border-primary hover:shadow-[var(--shadow-elevated)]"
              >
                <span className="grid h-8 w-8 sm:h-10 sm:w-10 shrink-0 place-items-center rounded-lg bg-primary text-primary-foreground">
                  <item.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                </span>
                <span className="font-display text-xs sm:text-sm font-medium text-primary">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Format Requirements */}
        <div className="mt-12 sm:mt-16">
          <SectionTitle
            eyebrow="Formatting"
            title="Format Requirements"
            description="Please ensure your manuscript meets these formatting specifications:"
          />
          <div className="mt-8 sm:mt-10 grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {formatRequirements.map((item) => (
              <article
                key={item.label}
                className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-[var(--shadow-card)] transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-elevated)]"
              >
                <span className="grid h-10 w-10 sm:h-12 sm:w-12 place-items-center rounded-xl bg-primary text-primary-foreground">
                  <item.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                </span>
                <h4 className="mt-3 font-display font-semibold text-primary text-sm sm:text-base">{item.label}</h4>
                <p className="mt-1 text-xs sm:text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
              </article>
            ))}
          </div>
        </div>

        {/* Detailed Breakdown Card */}
        <div className="mt-12 sm:mt-16 rounded-2xl border border-border bg-surface p-5 sm:p-8">
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <span className="grid h-10 w-10 sm:h-12 sm:w-12 shrink-0 place-items-center rounded-xl bg-accent text-accent-foreground">
              <FileText className="h-5 w-5 sm:h-6 sm:w-6" />
            </span>
            <div className="flex-1 w-full">
              <h3 className="font-display text-lg sm:text-xl font-semibold text-primary">Manuscript Structure</h3>
              <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-muted-foreground">
                Your manuscript should be organized in the following order:
              </p>
              <div className="mt-3 sm:mt-4 grid gap-2 sm:gap-3 grid-cols-1 sm:grid-cols-2">
                {[
                  "Title of the article",
                  "Author name(s) and affiliation(s)",
                  "Email address(es)",
                  "Abstract (150–250 words)",
                  "5–7 Keywords",
                  "Main article body",
                  "References (APA 7th Edition)",
                ].map((item, index) => (
                  <div
                    key={item}
                    className="flex items-center gap-2 sm:gap-3 rounded-lg border border-border bg-card px-3 sm:px-4 py-1.5 sm:py-2"
                  >
                    <span className="flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full bg-primary/10 text-[10px] sm:text-xs font-semibold text-primary">
                      {index + 1}
                    </span>
                    <span className="text-xs sm:text-sm text-foreground/85">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Submit Your File Section */}
        <div className="mt-12 sm:mt-16 rounded-2xl border-2 border-primary/20 bg-primary/5 p-5 sm:p-8">
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <span className="grid h-12 w-12 sm:h-14 sm:w-14 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground">
              <FileUp className="h-6 w-6 sm:h-7 sm:w-7" />
            </span>
            <div className="flex-1 w-full">
              <h3 className="font-display text-xl sm:text-2xl font-semibold text-primary">Submit Your File</h3>
              <p className="mt-1 sm:mt-2 text-sm sm:text-base text-muted-foreground">
                After completing the form, you'll need to email your manuscript file directly to us.
              </p>
              
              {/* Email Section - Responsive */}
              <div className="mt-4 flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-3 sm:gap-4">
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 rounded-lg bg-card px-3 sm:px-5 py-2 sm:py-3 border border-border w-full sm:w-auto">
                  <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-primary shrink-0" />
                  <span className="text-sm sm:text-base font-medium text-primary break-all">{email}</span>
                  <button
                    onClick={copyEmail}
                    className="inline-flex items-center gap-1.5 rounded-md bg-primary/10 px-2 sm:px-3 py-1 text-xs font-medium text-primary transition-all hover:bg-primary/20 shrink-0"
                  >
                    {copied ? (
                      <>
                        <Check className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                        <span className="hidden xs:inline">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                        <span className="hidden xs:inline">Copy</span>
                      </>
                    )}
                  </button>
                </div>
                <a
                  href={`mailto:${email}`}
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-4 sm:px-5 py-2.5 sm:py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:brightness-95 w-full sm:w-auto"
                >
                  <Send className="h-4 w-4" />
                  Send Email
                </a>
              </div>

              {/* Submission Guidelines */}
              <div className="mt-4 rounded-lg bg-primary/10 p-4 border border-primary/20">
                <h4 className="text-sm font-semibold text-primary mb-2">File Submission Guidelines:</h4>
                <ul className="space-y-1.5 text-xs sm:text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary shrink-0">•</span>
                    <span>Send your manuscript as a <strong>.docx</strong> file</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary shrink-0">•</span>
                    <span>Include your full name and article title in the email subject line</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary shrink-0">•</span>
                    <span>You will receive a confirmation email within 2-3 working days</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Important Note */}
        <div className="mt-6 sm:mt-8 rounded-xl border border-primary/20 bg-primary/5 p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
            <ShieldCheck className="h-5 w-5 shrink-0 text-primary" />
            <div>
              <h4 className="font-display font-semibold text-primary text-sm sm:text-base">Important Note</h4>
              <p className="mt-1 text-xs sm:text-sm leading-relaxed text-muted-foreground">
                All manuscripts will be screened using plagiarism-checking software before being sent for 
                peer review. Please ensure your work is original and properly cited before submission.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}