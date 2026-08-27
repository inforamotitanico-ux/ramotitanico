import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Facebook, Linkedin, Mail, MapPin, MessageCircle, Phone, Twitter } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { PageHero } from "@/components/ui/page-hero";
import { SectionTitle } from "@/components/ui/section-title";
import emailjs from "@emailjs/browser";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Ramotitanico" },
      {
        name: "description",
        content: "Reach Ramotitanico's Braga office, partnerships team, and consultant network.",
      },
      { property: "og:title", content: "Contact — Ramotitanico" },
      {
        property: "og:description",
        content: "Email, phone, and contact form for Ramotitanico in Braga, Portugal.",
      },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().trim().min(2, "Name required").max(120),
  email: z.string().trim().email("Valid email required").max(200),
  subject: z.string().trim().min(2, "Subject required").max(160),
  message: z.string().trim().min(10, "Message is too short").max(2000),
});

function ContactPage() {
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please review your message.");
      setSubmitting(false);
      return;
    }
    try {
  await emailjs.send(
    "service_jp0tlbk",
    "template_2z0htha",
    {
      name: parsed.data.name,
      email: parsed.data.email,
      subject: parsed.data.subject,
      message: parsed.data.message,
    },
    "HhAU4iWFJNLELPwv3"
  );

  toast.success("Message sent successfully!");
  form.reset();
} catch (error) {
  console.error(error);
  toast.error("Failed to send message.");
}

setSubmitting(false);
  };

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="We Would be Glad to Hear from You"
        description="For partnerships, conference enquiries, consultancy, or media — reach our Braga office through the channels below."
      />

      <section className="container-page py-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <SectionTitle eyebrow="Head Office" title="Braga, Portugal" />
            <ul className="mt-8 space-y-5 text-sm">
              <Item
                icon={MapPin}
                label="Address"
                value="Head Office — Travessa da Guarda, N31
4730-610"
              />
              <Item
                icon={Mail}
                label="Email"
                value="admin@ramotitanico.pt"
                href="mailto:admin@ramotitanico.pt"
              />
              <Item icon={Phone} label="Phone" value="+351 928 310 629" href="tel:+351 928 310 629" />
              <Item icon={MessageCircle} label="WhatsApp" value="+351 928 310 629" href="https://wa.me/351928310629" />
            </ul>

            <div className="mt-10">
              <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Follow Us
              </div>
              <div className="mt-3 flex gap-2">
                {[Linkedin, Twitter, Facebook].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    aria-label="Social link"
                    className="grid h-10 w-10 place-items-center rounded-md border border-border text-foreground/70 transition-colors hover:border-primary hover:text-primary"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <form
            onSubmit={onSubmit}
            className="rounded-2xl border border-border bg-card p-8 shadow-[var(--shadow-card)]"
          >
            <h3 className="font-display text-2xl font-semibold text-primary">Send a Message</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              We respond within three business days.
            </p>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <Field label="Your Name" name="name" />
              <Field label="Email" name="email" type="email" />
              <div className="sm:col-span-2">
                <Field label="Subject" name="subject" />
              </div>
            </div>
            <div className="mt-5">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Message
              </label>
              <textarea
                name="message"
                rows={6}
                maxLength={2000}
                className="mt-2 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
              />
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="mt-6 inline-flex items-center justify-center rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover disabled:opacity-60"
            >
              {submitting ? "Sending…" : "Send Message"}
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

function Item({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: typeof Mail;
  label: string;
  value: string;
  href?: string;
}) {
  const inner = (
    <div className="flex items-start gap-4">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-accent-soft text-accent-foreground">
        <Icon className="h-5 w-5" />
      </span>
      <div className="min-w-0">
        <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {label}
        </div>
        <div className="mt-0.5 break-words text-base text-foreground">{value}</div>
      </div>
    </div>
  );
  return href ? (
    <li>
      <a href={href} className="block transition-opacity hover:opacity-80">
        {inner}
      </a>
    </li>
  ) : (
    <li>{inner}</li>
  );
}

function Field({ label, name, type = "text" }: { label: string; name: string; type?: string }) {
  return (
    <div>
      <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </label>
      <input
        name={name}
        type={type}
        maxLength={200}
        className="mt-2 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
      />
    </div>
  );
}
