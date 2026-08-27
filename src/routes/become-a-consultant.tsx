import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Award, BadgeCheck, Briefcase, Globe2, Network, Users2 } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { PageHero } from "@/components/ui/page-hero";
import { SectionTitle } from "@/components/ui/section-title";
import emailjs from "@emailjs/browser";

export const Route = createFileRoute("/become-a-consultant")({
  head: () => ({
    meta: [
      { title: "Become a Consultant — Ramotitanico" },
      { name: "description", content: "Join Ramotitanico's international consultant network — apply to contribute to global academic programmes." },
      { property: "og:title", content: "Become a Consultant — Ramotitanico" },
      { property: "og:description", content: "Apply to join our network of academic consultants and contribute to global programmes." },
      { property: "og:url", content: "/become-a-consultant" },
    ],
    links: [{ rel: "canonical", href: "/become-a-consultant" }],
  }),
  component: ConsultantPage,
});

const benefits = [
  { icon: Globe2, title: "Global Engagement", desc: "Contribute to programmes in over forty countries through a vetted international network." },
  { icon: Award, title: "Professional Recognition", desc: "Receive official accreditation and visibility as a Ramotitanico consultant." },
  { icon: Network, title: "Network Access", desc: "Connect with scholars, institutions, and policy bodies across our partner ecosystem." },
];

const duties = [
  { icon: Briefcase, title: "Advisory Engagements", desc: "Lead or contribute to consultancy mandates aligned with your expertise." },
  { icon: Users2, title: "Programme Delivery", desc: "Facilitate workshops, panels, and training within Ramotitanico's calendar." },
  { icon: BadgeCheck, title: "Quality Standards", desc: "Uphold the organization's editorial, ethical, and methodological standards." },
];

const schema = z.object({
  name: z.string().trim().min(2, "Name required").max(120),
  email: z.string().trim().email("Valid email required").max(200),
  country: z.string().trim().min(2, "Country required").max(80),
  expertise: z.string().trim().min(2, "Area of expertise required").max(120),
  message: z.string().trim().min(20, "Please share more about your background").max(2000),
});

function ConsultantPage() {
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please review your application.");
      setSubmitting(false);
      return;
    }
    try {
      await emailjs.send(
        "service_jp0tlbk",
        "template_mr3b1rf",
        {
          name: parsed.data.name,
          email: parsed.data.email,
          country: parsed.data.country,
          expertise: parsed.data.expertise,
          message: parsed.data.message,
        },
        "HhAU4iWFJNLELPwv3"
      );
      toast.success("Application received. Our team will review and respond within ten business days.");
      form.reset();
    } catch (error) {
      console.error(error);
      toast.error("Failed to send application.");
    }
    setSubmitting(false);
  };

  return (
    <>
      <PageHero
        eyebrow="Become a Consultant"
        title="Bring Your Expertise to a Global Academic Platform"
        description="Ramotitanico engages consultants across education, research, publishing, and institutional development. Apply to join our international network."
      />

      <section className="container-page py-20">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionTitle eyebrow="Why Join" title="Benefits of Working with Us" />
            <ul className="mt-8 space-y-5">
              {benefits.map((b) => (
                <li key={b.title} className="flex gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-accent-soft text-accent-foreground">
                    <b.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-primary">{b.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{b.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionTitle eyebrow="Your Role" title="Responsibilities" />
            <ul className="mt-8 space-y-5">
              {duties.map((b) => (
                <li key={b.title} className="flex gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-primary text-primary-foreground">
                    <b.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-primary">{b.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{b.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-surface py-20">
        <div className="container-page max-w-2xl">
          <SectionTitle
            align="center"
            eyebrow="Application"
            title="Apply to the Consultant Network"
            description="Tell us about your background and the areas where you would like to contribute."
          />
          <form
            onSubmit={onSubmit}
            className="mt-12 rounded-2xl border border-border bg-card p-8 shadow-[var(--shadow-card)]"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Full Name" name="name" />
              <Field label="Email" name="email" type="email" />
              <Field label="Country" name="country" />
              <Field label="Area of Expertise" name="expertise" />
            </div>
            <div className="mt-5">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Background & Motivation
              </label>
              <textarea
                name="message"
                rows={6}
                maxLength={2000}
                className="mt-2 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
                placeholder="Briefly describe your background, expertise, and how you would like to contribute."
              />
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="mt-6 inline-flex w-full items-center justify-center rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover disabled:opacity-60 sm:w-auto"
            >
              {submitting ? "Submitting…" : "Submit Application"}
            </button>
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
        className="mt-2 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
      />
    </div>
  );
}
