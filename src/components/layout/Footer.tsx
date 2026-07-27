import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone, Linkedin, Twitter, Facebook } from "lucide-react";
import { toast } from "sonner";
import type { FormEvent } from "react";
import logo from "@/assets/footerlogo.png";

export function Footer() {
  const onSubscribe = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (new FormData(form).get("email") as string)?.trim();
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    form.reset();
    toast.success("Subscribed. Welcome to the Ramotitanico newsletter.");
  };

  return (
    <footer className="mt-24 border-t border-border bg-primary text-primary-foreground">
      <div className="container-page py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <img src={logo} alt="Ramotitanico" className="h-28 w-auto object-contain" />
            <p className="mt-2 text-sm leading-relaxed text-primary-foreground/75">
              A Portugal-based multidisciplinary organization advancing education, research,
              innovation, sustainability, and global collaboration.
            </p>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-accent">
              Explore
            </h4>
            <ul className="mt-4 space-y-2 text-sm">
              {[
                ["/about", "About Us"],
                ["/services", "Services"],
                ["/events", "Events"],
                ["/publications", "Publications"],
                ["/team", "Team"],
              ].map(([to, label]) => (
                <li key={to}>
                  <Link to={to} className="text-primary-foreground/75 transition-colors hover:text-accent">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-accent">
              Contact
            </h4>
            <ul className="mt-4 space-y-3 text-sm text-primary-foreground/75">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <span>Head Office — Travessa da Guarda, N31<br /> 4730-610  </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <a href="mailto:info@ramotitanico.eu" className="hover:text-accent">
                  info@ramotitanico.eu
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <a href="tel:+351 928 310 629" className="hover:text-accent">
                  +351 928 310 629
                </a>
              </li>
            </ul>
            <div className="mt-5 flex gap-2">
              {[Linkedin, Twitter, Facebook].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social link"
                  className="grid h-9 w-9 place-items-center rounded-md border border-primary-foreground/20 text-primary-foreground/80 transition-colors hover:border-accent hover:text-accent"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-accent">
              Newsletter
            </h4>
            <p className="mt-4 text-sm text-primary-foreground/75">
              Receive quarterly briefings on conferences, publications, and calls for papers.
            </p>
            <form onSubmit={onSubscribe} className="mt-4 flex flex-col gap-2 sm:flex-row">
              <input
                type="email"
                name="email"
                required
                placeholder="Your email"
                maxLength={200}
                className="min-w-0 flex-1 rounded-md border border-primary-foreground/20 bg-primary-foreground/5 px-3 py-2 text-sm text-primary-foreground placeholder:text-primary-foreground/50 focus:border-accent focus:outline-none"
              />
              <button
                type="submit"
                className="rounded-md bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground transition-all hover:brightness-95"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-primary-foreground/15 pt-6 text-xs text-primary-foreground/60 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Ramotitanico. All rights reserved.</p>
          <p>Braga · Portugal · Worldwide</p>
        </div>
      </div>
    </footer>
  );
}
