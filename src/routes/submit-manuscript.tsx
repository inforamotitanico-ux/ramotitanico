import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, CheckCircle2, UploadCloud, FileText, User, AtSign, Globe, BookOpen, Key, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { PageHero } from "@/components/ui/page-hero";
import { SectionTitle } from "@/components/ui/section-title";
// import emailjs from "@emailjs/browser"; // Commented out until template ID is available

export const Route = createFileRoute("/submit-manuscript")({
  head: () => ({
    meta: [
      { title: "Submit Manuscript — Ramotitanico" },
      { name: "description", content: "How to submit a manuscript to the Ramotitanico Journal of Education, Research & Sustainable Innovation." },
      { property: "og:title", content: "Submit Manuscript — Ramotitanico" },
      { property: "og:description", content: "Manuscript submission requirements and contact details for the editorial office." },
      { property: "og:url", content: "/submit-manuscript" },
    ],
    links: [{ rel: "canonical", href: "/submit-manuscript" }],
  }),
  component: SubmitManuscriptPage,
});

const requirements = [
  "Manuscript prepared per the Author Guidelines",
  "Structured abstract (150–250 words) and 5–6 keywords",
  "Author details on a separate title page (blind manuscript body)",
  "Signed declaration of originality and no conflicts of interest",
];

const statements = [
  { name: "wordCount", label: "Does your article's word count fit between 4000 and 8000?" },
  { name: "aimsScope", label: "Does your article meet the aims and scope of the journal you are submitting to?" },
  { name: "abstractClear", label: "Is the abstract clear enough for potential reviewers to assess if the article is in their area of expertise?" },
  { name: "clearlyWritten", label: "Is your article clearly written, concise and accessible?" },
  { name: "referencesListed", label: "Have you listed all references you've used?" },
  { name: "citationsClear", label: "Have you clearly cited any adapted/reproduced material in your figure/table captions?" },
  { name: "notElsewhere", label: "My manuscript is not being considered for publication elsewhere nor is it published elsewhere?" },
] as const;

const acknowledgements = [
  {
    name: "ethicsAck",
    label: "Do you acknowledge the Publication Ethics and Publication Malpractice Statement?",
    linkText: "Publication Ethics and Publication Malpractice Statement.",
    to: "/publication-ethics",
  },
  {
    name: "consentAck",
    label: "Do you acknowledge the Informed Consent for Human and Animal Rights Statement?",
    linkText: "Informed Consent for Human and Animal Rights Statement.",
  },
  {
    name: "paymentAck",
    label: "Authors can submit a manuscript and be peer-reviewed at zero cost. Payment may be needed at the Rights Agreement stage.",
    linkText: "Rights Agreement Pathways.",
  },
] as const;

const schema = z.object({
  name: z.string().trim().min(2, "Name required").max(120),
  email: z.string().trim().email("Valid email required").max(200),
  language: z.string().trim().min(1, "Language required"),
  researchNetwork: z.string().trim().max(160).optional().or(z.literal("")),
  journal: z.string().trim().min(2).max(160),
  title: z.string().trim().min(5, "Title required").max(300),
  subtitle: z.string().trim().max(300).optional().or(z.literal("")),
  abstract: z.string().trim().min(50, "Abstract should be approximately 150–250 words").max(3000),
  keywords: z.string().trim().min(3, "List at least three keywords, comma separated"),
  wordCount: z.enum(["yes", "no"], { message: "Please answer this question" }),
  aimsScope: z.enum(["yes", "no"], { message: "Please answer this question" }),
  abstractClear: z.enum(["yes", "no"], { message: "Please answer this question" }),
  clearlyWritten: z.enum(["yes", "no"], { message: "Please answer this question" }),
  referencesListed: z.enum(["yes", "no"], { message: "Please answer this question" }),
  citationsClear: z.enum(["yes", "no"], { message: "Please answer this question" }),
  notElsewhere: z.enum(["yes", "no"], { message: "Please answer this question" }),
  ethicsAck: z.literal("yes", { message: "You must acknowledge the Publication Ethics Statement to submit" }),
  consentAck: z.literal("yes", { message: "You must acknowledge the Informed Consent Statement to submit" }),
  paymentAck: z.literal("yes", { message: "You must acknowledge the submission terms to submit" }),
});

const MAX_FILE_MB = 5;

function SubmitManuscriptPage() {
  const [submitting, setSubmitting] = useState(false);
  const [fileName, setFileName] = useState("");
  const [dragActive, setDragActive] = useState(false);

  const onFileChange = (file: File | null) => {
    if (!file) {
      setFileName("");
      return;
    }
    if (file.size > MAX_FILE_MB * 1024 * 1024) {
      toast.error(`File is larger than ${MAX_FILE_MB}MB. Please email it directly to info@ramotitanico.com.`);
      return;
    }
    setFileName(file.name);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileChange(e.dataTransfer.files[0]);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please review your submission.");
      setSubmitting(false);
      return;
    }

    const statementsSummary = [...statements, ...acknowledgements]
      .map((s) => `${s.label} ${parsed.data[s.name as keyof typeof parsed.data] === "yes" ? "Yes" : "No"}`)
      .join("\n");

    // TEMPORARY: Log form data to console instead of sending via EmailJS
    console.log("=== MANUSCRIPT SUBMISSION DATA ===");
    console.log("Name:", parsed.data.name);
    console.log("Email:", parsed.data.email);
    console.log("Language:", parsed.data.language);
    console.log("Research Network:", parsed.data.researchNetwork || "—");
    console.log("Journal:", parsed.data.journal);
    console.log("Title:", parsed.data.title);
    console.log("Subtitle:", parsed.data.subtitle || "—");
    console.log("Abstract:", parsed.data.abstract);
    console.log("Keywords:", parsed.data.keywords);
    console.log("File:", fileName || "No file attached");
    console.log("Statements:\n", statementsSummary);
    console.log("==================================");

    // Commented out until EmailJS template ID is available
    /*
    try {
      await emailjs.send(
        "service_jp0tlbk",
        "template_manuscript_submission", // Replace with your template ID
        {
          name: parsed.data.name,
          email: parsed.data.email,
          language: parsed.data.language,
          researchNetwork: parsed.data.researchNetwork || "—",
          journal: parsed.data.journal,
          title: parsed.data.title,
          subtitle: parsed.data.subtitle || "—",
          abstract: parsed.data.abstract,
          keywords: parsed.data.keywords,
          statements: statementsSummary,
          fileName: fileName || "No file attached — author will email manuscript separately",
        },
        "HhAU4iWFJNLELPwv3" // Your public key
      );
      toast.success("Submission received. Our editorial office will be in touch.");
      form.reset();
      setFileName("");
    } catch (error) {
      console.error(error);
      toast.error("Failed to send submission. Please try again or email us directly.");
    }
    */

    // Temporary success message while EmailJS is disabled
    toast.success("Submission data logged successfully. EmailJS integration will be enabled soon.");
    form.reset();
    setFileName("");
    setSubmitting(false);
  };

  return (
    <>
      <PageHero
        backTo="/journal"
        backLabel="Journal Services"
        eyebrow="Submit Manuscript"
        title="Ready to Submit? Here's How."
        description="Complete the submission form below, or email your manuscript directly to our editorial office."
      />

      <section className="container-page py-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr]">
          <div>
            <SectionTitle
              eyebrow="Before You Send"
              title="Submission Requirements."
              description="Manuscripts that don't meet these requirements are returned for revision before entering editorial screening."
            />
            <ul className="mt-8 space-y-3">
              {requirements.map((r) => (
                <li key={r} className="flex items-start gap-3 text-sm text-foreground/85">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
                  {r}
                </li>
              ))}
            </ul>
            <p className="mt-8 text-sm text-muted-foreground">
              Full formatting and structure requirements are detailed in the{" "}
              <Link to="/author-guidelines" className="font-medium text-primary underline underline-offset-4 hover:text-primary/80">
                Author Guidelines
              </Link>
              .
            </p>

            <div className="mt-10 rounded-2xl border border-border bg-gradient-to-br from-primary/5 to-transparent p-6 shadow-[var(--shadow-card)]">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary text-primary-foreground">
                <Mail className="h-6 w-6" />
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold text-primary">Prefer Email?</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Email your manuscript and title page as separate attachments, with the subject line
                "Manuscript Submission — [Your Name]".
              </p>
              <a
                href="mailto:info@ramotitanico.com?subject=Manuscript%20Submission"
                className="mt-4 inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md"
              >
                <Mail className="h-4 w-4" />
                info@ramotitanico.com
              </a>
            </div>
          </div>

          <form
            onSubmit={onSubmit}
            className="rounded-2xl border border-border bg-card p-8 shadow-[var(--shadow-card)]"
          >
            <div className="flex items-center gap-3 border-b border-border pb-6">
              <FileText className="h-6 w-6 text-primary" />
              <h3 className="font-display text-xl font-semibold text-primary">New Submission</h3>
              <span className="ml-auto rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">Step 1 of 3</span>
            </div>

            {/* Step 1: Author Information */}
            <div className="mt-6">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-primary" />
                <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Author Information</h4>
              </div>
              <div className="mt-4 grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="name"
                    type="text"
                    maxLength={200}
                    placeholder="Dr. Jane Smith"
                    className="mt-2 w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <div className="relative mt-2">
                    <AtSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                      name="email"
                      type="email"
                      maxLength={200}
                      placeholder="jane.smith@university.edu"
                      className="w-full rounded-lg border border-input bg-background py-2.5 pl-10 pr-4 text-sm transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2: Article Information */}
            <div className="mt-8 border-t border-border pt-6">
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-primary" />
                <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Article Information</h4>
              </div>
              <div className="mt-4 grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Language <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="language"
                    defaultValue="English"
                    className="mt-2 w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    <option>English</option>
                    <option>Portuguese</option>
                    <option>Spanish</option>
                    <option>French</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Research Network (optional)</label>
                  <input
                    name="researchNetwork"
                    type="text"
                    maxLength={200}
                    placeholder="e.g., Humanities Research Network"
                    className="mt-2 w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Journal <span className="text-red-500">*</span>
                  </label>
                  <div className="relative mt-2">
                    <Globe className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                      name="journal"
                      className="w-full rounded-lg border border-input bg-secondary/60 py-2.5 pl-10 pr-4 text-sm text-foreground/80"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="title"
                    rows={2}
                    maxLength={300}
                    placeholder="Enter the full title of your manuscript"
                    className="mt-2 w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Subtitle (optional)</label>
                  <textarea
                    name="subtitle"
                    rows={2}
                    maxLength={300}
                    placeholder="Enter a subtitle if applicable"
                    className="mt-2 w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Abstract <span className="text-red-500">*</span>
                  </label>
                  <p className="mt-0.5 text-xs text-muted-foreground">150–250 words</p>
                  <textarea
                    name="abstract"
                    rows={5}
                    maxLength={3000}
                    placeholder="Provide a structured abstract summarizing your research..."
                    className="mt-2 w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Keywords <span className="text-red-500">*</span>
                  </label>
                  <p className="mt-0.5 text-xs text-muted-foreground">Minimum of five, title case, comma separated</p>
                  <div className="relative mt-2">
                    <Key className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                      name="keywords"
                      type="text"
                      placeholder="e.g., Education, Sustainability, Innovation"
                      className="w-full rounded-lg border border-input bg-background py-2.5 pl-10 pr-4 text-sm transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    File Upload <span className="text-muted-foreground">{`(optional, max ${MAX_FILE_MB}MB)`}</span>
                  </label>
                  <div
                    className={`mt-2 relative cursor-pointer rounded-lg border-2 border-dashed transition-all ${
                      dragActive ? "border-primary bg-primary/5" : "border-input bg-secondary/40 hover:border-primary/70"
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    <input
                      id="manuscript-file"
                      type="file"
                      className="absolute inset-0 cursor-pointer opacity-0"
                      onChange={(e) => onFileChange(e.target.files?.[0] ?? null)}
                    />
                    <div className="flex flex-col items-center justify-center gap-2 px-4 py-8 text-center">
                      {fileName ? (
                        <>
                          <FileText className="h-8 w-8 text-emerald-500" />
                          <span className="text-sm font-medium text-foreground">{fileName}</span>
                          <span className="text-xs text-muted-foreground">Click or drag to replace</span>
                        </>
                      ) : (
                        <>
                          <UploadCloud className="h-8 w-8 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">
                            Drag & Drop your file or <span className="font-medium text-primary underline underline-offset-4">Browse</span>
                          </span>
                          <span className="text-xs text-muted-foreground">Accepted formats: PDF, DOC, DOCX</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3: Author Statements */}
            <div className="mt-8 border-t border-border pt-6">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-primary" />
                <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Author Statements</h4>
              </div>
              <div className="mt-4 space-y-4">
                {statements.map((s) => (
                  <YesNoQuestion key={s.name} name={s.name} label={s.label} />
                ))}
                {acknowledgements.map((a) => (
                  <YesNoQuestion key={a.name} name={a.name} label={a.label} linkText={a.linkText} />
                ))}
              </div>
            </div>

            <div className="mt-8 flex flex-col-reverse gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-muted-foreground">
                <span className="text-red-500">*</span> Required fields
              </p>
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex w-full items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md disabled:opacity-60 sm:w-auto"
              >
                {submitting ? (
                  <>
                    <svg className="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Submitting…
                  </>
                ) : (
                  "Submit Manuscript"
                )}
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

function Field({ label, name, type = "text" }: { label: string; name: string; type?: string }) {
  return (
    <div>
      <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</label>
      <input
        name={name}
        type={type}
        maxLength={200}
        className="mt-2 w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
      />
    </div>
  );
}

function TextArea({ label, name, rows = 3, hint }: { label: string; name: string; rows?: number; hint?: string }) {
  return (
    <div>
      <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</label>
      {hint && <p className="mt-0.5 text-xs text-muted-foreground">{hint}</p>}
      <textarea
        name={name}
        rows={rows}
        maxLength={3000}
        className="mt-2 w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
      />
    </div>
  );
}

function YesNoQuestion({
  name,
  label,
  linkText,
  to,
}: {
  name: string;
  label: string;
  linkText?: string;
  to?: string;
}) {
  return (
    <fieldset className="flex flex-col gap-3 rounded-lg bg-secondary/30 p-4 transition-colors hover:bg-secondary/50 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
      <legend className="sr-only">{label}</legend>
      <div className="text-sm text-foreground/85">
        {label}
        {linkText && (
          <>
            {" "}
            Please read and acknowledge the{" "}
            {to ? (
              <Link to={to} className="font-medium text-primary underline underline-offset-4 hover:text-primary/80">
                {linkText}
              </Link>
            ) : (
              <span className="font-medium text-primary underline underline-offset-4">{linkText}</span>
            )}
          </>
        )}
      </div>
      <div className="flex shrink-0 items-center gap-3">
        <label className="flex cursor-pointer items-center gap-2 rounded-md px-3 py-1.5 text-sm transition-colors hover:bg-primary/10 has-[:checked]:bg-primary/10">
          <input type="radio" name={name} value="yes" required className="h-4 w-4 accent-primary" />
          Yes
        </label>
        <label className="flex cursor-pointer items-center gap-2 rounded-md px-3 py-1.5 text-sm transition-colors hover:bg-primary/10 has-[:checked]:bg-primary/10">
          <input type="radio" name={name} value="no" className="h-4 w-4 accent-primary" />
          No
        </label>
      </div>
    </fieldset>
  );
}