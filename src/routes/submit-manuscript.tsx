import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { Mail, CheckCircle2, FileText, User, AtSign, BookOpen, Key, AlertCircle, X, Copy, Check, Users, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { PageHero } from "@/components/ui/page-hero";
import { SectionTitle } from "@/components/ui/section-title";
import emailjs from "@emailjs/browser";

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
  "Structured abstract (150–250 words) and 5–7 keywords",
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
    popupContent: {
      title: "Publication Ethics and Publication Malpractice Statement",
      content: [
        "The journal is committed to maintaining the highest standards of publication ethics and preventing any malpractice.",
        "All authors must ensure that their work is original and has not been published elsewhere.",
        "Authors should not submit the same manuscript to more than one journal concurrently.",
        "All research involving human subjects must have received appropriate ethical approval.",
        "Any potential conflicts of interest must be disclosed at the time of submission.",
        "The editorial board follows COPE guidelines for handling ethical issues.",
      ]
    }
  },
  {
    name: "consentAck",
    label: "Do you acknowledge the Informed Consent for Human and Animal Rights Statement?",
    linkText: "Informed Consent for Human and Animal Rights Statement.",
    popupContent: {
      title: "Informed Consent for Human and Animal Rights Statement",
      content: [
        "For research involving human participants, informed consent must be obtained from all subjects.",
        "Authors must ensure that participants have given written consent for their data to be used.",
        "All research involving human subjects must have been conducted in accordance with the Declaration of Helsinki.",
        "For research involving animals, all procedures must comply with relevant guidelines and regulations.",
        "Authors must confirm that all necessary approvals were obtained before conducting the research.",
        "Any identifying information in the manuscript should be anonymized to protect participant privacy.",
      ]
    }
  },
  {
    name: "paymentAck",
    label: "Authors can submit a manuscript and be peer-reviewed at zero cost. Payment may be needed at the Rights Agreement stage.",
    linkText: "Rights Agreement Pathways.",
    popupContent: {
      title: "Rights Agreement Pathways",
      content: [
        "Submission and peer review are completely free of charge.",
        "If your manuscript is accepted, you will be required to sign a Rights Agreement.",
        "The Rights Agreement outlines the terms for publication and distribution.",
        "Payment may be required at the Rights Agreement stage for publication costs.",
        "Details of the payment structure will be provided upon acceptance.",
        "Authors have the option to choose between different licensing agreements.",
      ]
    }
  },
] as const;

// Dynamic schema builder for authors
const getSchema = (numAuthors: number) => {
  const authorFields: Record<string, any> = {};
  // Start from 2 because author 1 is the corresponding author
  for (let i = 2; i <= numAuthors; i++) {
    authorFields[`authorName${i}`] = z.string().trim().min(2, `Author ${i} name required`).max(120);
    authorFields[`authorEmail${i}`] = z.string().trim().email(`Valid email required for author ${i}`).max(200);
  }
  
  return z.object({
    name: z.string().trim().min(2, "Corresponding author name required").max(120),
    email: z.string().trim().email("Valid email required").max(200),
    numAuthors: z.string().transform((val) => parseInt(val, 10)),
    researchNetwork: z.string().trim().max(160).optional().or(z.literal("")),
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
    ethicsAck: z.enum(["yes", "no"], { message: "Please answer this question" }),
    consentAck: z.enum(["yes", "no"], { message: "Please answer this question" }),
    paymentAck: z.enum(["yes", "no"], { message: "Please answer this question" }),
    ...authorFields,
  });
};

function SubmitManuscriptPage() {
  const [submitting, setSubmitting] = useState(false);
  const [showEmailPopup, setShowEmailPopup] = useState(false);
  const [submissionData, setSubmissionData] = useState<any>(null);
  const [showStatementPopup, setShowStatementPopup] = useState(false);
  const [currentPopupContent, setCurrentPopupContent] = useState<any>(null);
  const [copied, setCopied] = useState(false);
  const [numAuthors, setNumAuthors] = useState(1);

  const handleOpenStatementPopup = (content: any) => {
    setCurrentPopupContent(content);
    setShowStatementPopup(true);
  };

  const handleCopyEmail = () => {
    const email = "admin@ramotitanico.com";
    navigator.clipboard.writeText(email).then(() => {
      setCopied(true);
      toast.success("📧 Email copied to clipboard!");
      setTimeout(() => setCopied(false), 3000);
    }).catch(() => {
      toast.error("Failed to copy email. Please copy manually.");
    });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setSubmitting(true);
  const form = e.currentTarget;
  const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
  
  // Get the number of authors from the form data
  const numAuthorsValue = parseInt(data.numAuthors || "1", 10);
  const schema = getSchema(numAuthorsValue);
  const parsed = schema.safeParse(data);
  
  if (!parsed.success) {
    const errorMessage = parsed.error.issues[0]?.message ?? "Please review your submission.";
    toast.error(errorMessage);
    setSubmitting(false);
    return;
  }

  const now = new Date();
  const timeString = now.toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  const yesNo = (value: string) => (value === "yes" ? "✅ Yes" : "❌ No");

  // Type assertion for dynamic access
const formData = parsed.data as any;

  // Build authors list - only for authors 2 and above (co-authors)
  const coAuthorsList = [];
  const allAuthorsList = [];
  
  // Add corresponding author
  allAuthorsList.push(`Author 1: ${formData.name} (${formData.email})`);
  
  // Add co-authors
  for (let i = 2; i <= numAuthorsValue; i++) {
    const name = formData[`authorName${i}`];
    const email = formData[`authorEmail${i}`];
    if (name || email) {
      const authorStr = `Author ${i}: ${name || 'N/A'} (${email || 'N/A'})`;
      coAuthorsList.push(authorStr);
      allAuthorsList.push(authorStr);
    }
  }

  const templateParams: Record<string, string> = {
    name: formData.name,
    email: formData.email,
    numAuthors: formData.numAuthors.toString(),
    coAuthors: coAuthorsList.length > 0 ? coAuthorsList.join("\n") : "None",
    allAuthors: allAuthorsList.join("\n"),
    researchNetwork: formData.researchNetwork || "Not provided",
    title: formData.title,
    subtitle: formData.subtitle || "Not provided",
    abstract: formData.abstract,
    keywords: formData.keywords,
    wordCount: yesNo(formData.wordCount),
    aimsScope: yesNo(formData.aimsScope),
    abstractClear: yesNo(formData.abstractClear),
    clearlyWritten: yesNo(formData.clearlyWritten),
    referencesListed: yesNo(formData.referencesListed),
    citationsClear: yesNo(formData.citationsClear),
    notElsewhere: yesNo(formData.notElsewhere),
    ethicsAck: yesNo(formData.ethicsAck),
    consentAck: yesNo(formData.consentAck),
    paymentAck: yesNo(formData.paymentAck),
    statements: [...statements, ...acknowledgements]
      .map((s) => `${s.label} ${formData[s.name as keyof typeof formData] === "yes" ? "✅ Yes" : "❌ No"}`)
      .join("\n"),
    time: timeString,
  };

  setSubmissionData({ ...formData, coAuthorsList, allAuthorsList });
  setShowEmailPopup(true);
  setSubmitting(false);
};
  const handleSendEmail = async () => {
    if (!submissionData) return;
    
    try {
      const yesNo = (value: string) => (value === "yes" ? "✅ Yes" : "❌ No");
      
      const templateParams = {
        name: submissionData.name,
        email: submissionData.email,
        numAuthors: submissionData.numAuthors.toString(),
        coAuthors: submissionData.coAuthorsList?.length > 0 ? submissionData.coAuthorsList.join("\n") : "None",
        allAuthors: submissionData.allAuthorsList?.join("\n") || "N/A",
        researchNetwork: submissionData.researchNetwork || "Not provided",
        title: submissionData.title,
        subtitle: submissionData.subtitle || "Not provided",
        abstract: submissionData.abstract,
        keywords: submissionData.keywords,
        wordCount: yesNo(submissionData.wordCount),
        aimsScope: yesNo(submissionData.aimsScope),
        abstractClear: yesNo(submissionData.abstractClear),
        clearlyWritten: yesNo(submissionData.clearlyWritten),
        referencesListed: yesNo(submissionData.referencesListed),
        citationsClear: yesNo(submissionData.citationsClear),
        notElsewhere: yesNo(submissionData.notElsewhere),
        ethicsAck: yesNo(submissionData.ethicsAck),
        consentAck: yesNo(submissionData.consentAck),
        paymentAck: yesNo(submissionData.paymentAck),
        statements: [...statements, ...acknowledgements]
          .map((s) => `${s.label} ${submissionData[s.name] === "yes" ? "✅ Yes" : "❌ No"}`)
          .join("\n"),
        time: new Date().toLocaleString("en-US", {
          dateStyle: "medium",
          timeStyle: "short",
        }),
      };

      await emailjs.send(
        "service_qpjk7gi",
        "template_7q1za7k",
        templateParams,
        "vUG18KQybqZLer_86",
      );
      
      toast.success("✅ Submission details sent successfully!");
      setShowEmailPopup(false);
      const form = document.querySelector('form');
      if (form) form.reset();
      setNumAuthors(1);
    } catch (error) {
      console.error("EmailJS Error:", error);
      toast.error("Failed to send email. Please try again.");
    }
  };

  // Render author fields based on number of authors (excluding corresponding author)
  const renderAuthorFields = () => {
    const fields = [];
    // Start from 2 because author 1 is the corresponding author
    for (let i = 2; i <= numAuthors; i++) {
      fields.push(
        <div key={`author-${i}`} className="rounded-lg border border-border bg-secondary/20 p-4">
          <h5 className="text-sm font-semibold text-primary mb-3">Author {i}</h5>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                name={`authorName${i}`}
                type="text"
                maxLength={120}
                placeholder={`Author ${i} full name`}
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
                  name={`authorEmail${i}`}
                  type="email"
                  maxLength={200}
                  placeholder={`author${i}@email.com`}
                  className="w-full rounded-lg border border-input bg-background py-2.5 pl-10 pr-4 text-sm transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>
          </div>
        </div>
      );
    }
    return fields;
  };

  return (
    <>
      <PageHero
        backTo="/journal"
        backLabel="Journal Services"
        eyebrow="Submit Manuscript"
        title="Ready to Submit? Here's How."
        description="Complete the submission form below, then send your manuscript file to our editorial office."
      />

      <section className="container-page py-20">
  <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr]">
    {/* Left Column - Requirements & Email Section */}
    <div className="order-2 lg:order-1">
      <SectionTitle
        eyebrow="Before You Send"
        title="Submission Requirements"
        description="Manuscripts failing the bellow given requirments shall be returned for revision before aditorial screening submission"
        className="[&_p]:text-justify"
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
        <h3 className="mt-4 font-display text-lg font-semibold text-primary">Submit Your File</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          After completing the form, you'll need to email your manuscript file directly to us.
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <a
            href="mailto:admin@ramotitanico.com?subject=Manuscript%20Submission"
            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md"
          >
            <Mail className="h-4 w-4" />
            admin@ramotitanico.com
          </a>
          <button
            onClick={handleCopyEmail}
            className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-4 py-2 text-sm font-semibold text-muted-foreground transition-all hover:bg-accent hover:text-accent-foreground"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 text-emerald-500" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                Copy Email
              </>
            )}
          </button>
        </div>
      </div>
    </div>

    {/* Right Column - Form */}
    <form
      onSubmit={onSubmit}
      className="order-1 lg:order-2 rounded-2xl border border-border bg-card p-8 shadow-[var(--shadow-card)]"
    >
      <div className="flex items-center gap-3 border-b border-border pb-6">
        <FileText className="h-6 w-6 text-primary" />
        <h3 className="font-display text-xl font-semibold text-primary">New Submission</h3>
        <span className="ml-auto rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">Step 1 of 2</span>
      </div>

      {/* Step 1: Author Information */}
      <div className="mt-6">
        <div className="flex items-center gap-2">
          <User className="h-4 w-4 text-primary" />
          <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Author Information</h4>
        </div>
        
        {/* Number of Authors Dropdown */}
        <div className="mt-4">
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Number of Authors <span className="text-red-500">*</span>
          </label>
          <div className="relative mt-2">
            <Users className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <select
              name="numAuthors"
              value={numAuthors}
              onChange={(e) => setNumAuthors(parseInt(e.target.value, 10))}
              className="w-full rounded-lg border border-input bg-background py-2.5 pl-10 pr-4 text-sm transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none"
            >
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>
                  {num} {num === 1 ? 'Author' : 'Authors'}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <svg className="h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Corresponding Author */}
        <div className="mt-4 rounded-lg border border-primary/20 bg-primary/5 p-4">
          <h5 className="text-sm font-semibold text-primary mb-3">Corresponding Author</h5>
          <div className="grid gap-4 sm:grid-cols-2">
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

        {/* Co-authors */}
        {numAuthors > 1 && (
          <div className="mt-4">
            <h5 className="text-sm font-semibold text-muted-foreground mb-3">Co-authors</h5>
            <div className="space-y-4">
              {renderAuthorFields()}
            </div>
          </div>
        )}
      </div>

      {/* Step 2: Article Information */}
      <div className="mt-8 border-t border-border pt-6">
        <div className="mt-4 grid gap-5 sm:grid-cols-2">
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
            <YesNoQuestion 
              key={a.name} 
              name={a.name} 
              label={a.label} 
              linkText={a.linkText}
              popupContent={a.popupContent}
              onOpenPopup={handleOpenStatementPopup}
            />
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
              Processing…
            </>
          ) : (
            "Submit Details"
          )}
        </button>
      </div>
    </form>
  </div>
</section>

      {/* Popup Modal for Statements */}
      {showStatementPopup && currentPopupContent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="relative max-w-2xl w-full rounded-2xl bg-white p-8 shadow-2xl max-h-[80vh] overflow-y-auto">
            <button
              onClick={() => setShowStatementPopup(false)}
              className="absolute right-4 top-4 rounded-full p-2 hover:bg-secondary transition-colors"
            >
              <X className="h-5 w-5 text-muted-foreground" />
            </button>
            <div className="text-left">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <FileText className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold text-foreground mb-4">
                {currentPopupContent.title}
              </h3>
              <div className="space-y-3">
                {currentPopupContent.content.map((item: string, index: number) => (
                  <div key={index} className="flex items-start gap-3">
                    <span className="text-primary font-bold mt-0.5">•</span>
                    <p className="text-sm text-foreground/85 leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setShowStatementPopup(false)}
                  className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Popup Modal for Email */}
      {showEmailPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="relative max-w-md w-full rounded-2xl bg-white p-8 shadow-2xl">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Mail className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Email Your Manuscript</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Your submission details have been saved. Please send your manuscript file to:
              </p>
              
              {/* Email with Copy Button */}
              <div className="mt-3 flex items-center justify-center gap-2">
                <a
                  href={`mailto:admin@ramotitanico.com?subject=Manuscript%20Submission%20-%20${submissionData?.name || 'Author'}`}
                  className="text-lg font-semibold text-primary underline underline-offset-4 hover:text-primary/80"
                >
                  admin@ramotitanico.com
                </a>
                <button
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-1 rounded-md bg-secondary/50 px-2 py-1 text-sm font-medium text-foreground transition-all hover:bg-secondary"
                  title="Copy email to clipboard"
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4 text-emerald-500" />
                      <span className="text-xs">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      <span className="text-xs">Copy</span>
                    </>
                  )}
                </button>
              </div>

              <div className="mt-4 rounded-lg bg-secondary/30 p-4 text-left text-sm">
                <p className="font-medium">Include in your email:</p>
                <ul className="mt-2 space-y-1 text-muted-foreground">
                  <li>• Your manuscript file (.docx or .pdf)</li>
                  <li>• Title page with author details (separate file)</li>
                  <li>• Subject line: "Manuscript Submission - {submissionData?.name || 'Author'}"</li>
                </ul>
              </div>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <button
                  onClick={handleSendEmail}
                  className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md"
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Send Notification
                </button>
                <button
                  onClick={() => setShowEmailPopup(false)}
                  className="inline-flex items-center justify-center rounded-lg border border-input bg-background px-6 py-2.5 text-sm font-medium text-foreground transition-all hover:bg-secondary"
                >
                  Close
                </button>
              </div>
              <p className="mt-4 text-xs text-muted-foreground">
                Click "Send Notification" to email your submission details, then email your file separately.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function YesNoQuestion({
  name,
  label,
  linkText,
  popupContent,
  onOpenPopup,
}: {
  name: string;
  label: string;
  linkText?: string;
  popupContent?: any;
  onOpenPopup?: (content: any) => void;
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
            {popupContent ? (
              <button
                type="button"
                onClick={() => onOpenPopup && onOpenPopup(popupContent)}
                className="font-medium text-primary underline underline-offset-4 hover:text-primary/80 hover:underline-offset-6 transition-all cursor-pointer"
              >
                {linkText}
              </button>
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