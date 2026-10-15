import * as React from "react";
import { cn } from "@workspace/ui/lib/utils";

interface FooterLink {
  name: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

interface FooterLogo {
  url: string;
  title: string;
  /** Optional mark. If omitted, only the wordmark renders. */
  src?: string;
  alt?: string;
}

interface FooterProps {
  logo?: FooterLogo;
  description?: string;
  sections?: FooterSection[];
  copyright?: string;
  legalLinks?: FooterLink[];
  className?: string;
}

const defaultProps: FooterProps = {
  logo: { url: "/", title: "Weybre" },
  description: "Software for the decisions that matter most.",
  sections: [
    {
      title: "Platform",
      links: [
        { name: "Overview", href: "#" },
        { name: "Data integration", href: "#" },
        { name: "Models", href: "#" },
        { name: "Deployment", href: "#" },
        { name: "Pricing", href: "#" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About", href: "#" },
        { name: "Careers", href: "#" },
        { name: "Newsroom", href: "#" },
        { name: "Contact", href: "#" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Documentation", href: "#" },
        { name: "Field reports", href: "#" },
        { name: "Status", href: "#" },
        { name: "Support", href: "#" },
      ],
    },
    {
      title: "Security",
      links: [
        { name: "Trust center", href: "#" },
        { name: "Compliance", href: "#" },
        { name: "Responsible disclosure", href: "#" },
      ],
    },
  ],
  copyright: `© ${new Date().getFullYear()} Weybre. All rights reserved.`,
  legalLinks: [
    { name: "Terms", href: "#" },
    { name: "Privacy", href: "#" },
  ],
};

const MAX_SECTIONS = 4;

const linkClass =
  "text-sm text-white/60 outline-none transition-colors hover:text-white focus-visible:text-white focus-visible:underline focus-visible:underline-offset-4";

const Footer = (props: Partial<FooterProps>) => {
  const { logo, description, sections, copyright, legalLinks, className } = {
    ...defaultProps,
    ...props,
  };
  const visibleSections = (sections ?? []).slice(0, MAX_SECTIONS);

  return (
    <footer
      className={cn("dark relative bg-black pt-20 text-white lg:pt-28", className)}
    >
      {/* Hairline that fades toward both edges. */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent"
      />

      <div className="mx-auto w-full max-w-[1600px] px-6 lg:px-10">
        <div className="grid grid-cols-2 gap-x-8 gap-y-14 lg:grid-cols-6">
          <div className="col-span-2">
            {logo && (
              <a
                href={logo.url}
                className="inline-flex items-center gap-3 outline-none focus-visible:ring-2 focus-visible:ring-white/60"
              >
                {logo.src && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={logo.src}
                    alt={logo.alt ?? ""}
                    className="h-6 w-auto"
                  />
                )}
                <span className="text-lg font-semibold tracking-[0.28em] uppercase">
                  {logo.title}
                </span>
              </a>
            )}
            {description && (
              <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/50">
                {description}
              </p>
            )}
          </div>

          {visibleSections.map((section) => (
            <nav key={section.title} aria-label={section.title}>
              <h3 className="mb-5 text-xs font-medium tracking-[0.2em] text-white/40 uppercase">
                {section.title}
              </h3>
              <ul className="flex flex-col gap-3.5">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a href={link.href} className={linkClass}>
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-20 flex flex-col gap-4 border-t border-white/10 py-8 text-xs text-white/40 md:flex-row md:items-center md:justify-between lg:mt-28">
          <p>{copyright}</p>
          {legalLinks && legalLinks.length > 0 && (
            <ul className="flex gap-6">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="outline-none transition-colors hover:text-white focus-visible:text-white focus-visible:underline focus-visible:underline-offset-4"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </footer>
  );
};

export { Footer };
export type { FooterProps };