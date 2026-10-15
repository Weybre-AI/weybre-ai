import * as React from "react";
import { cn } from "@workspace/ui/lib/utils";

interface LogoItem {
  src: string;
  alt: string;
  /** Optional link. When set, the logo becomes a link. */
  href?: string;
  /** Override the logo height, e.g. "h-5" for wide marks. */
  className?: string;
}

interface LogosProps {
  /** Small label above the strip. */
  label?: string;
  logos: LogoItem[];
  className?: string;
}

const LOGO_BASE =
  "https://cdn.shadcnblocks.com/shadcnblocks/image-set/modern/logos";

const defaultProps: LogosProps = {
  label: "Trusted by teams running critical operations",
  logos: [
    { src: `${LOGO_BASE}/fictional-company-logo-1.svg`, alt: "Company 1" },
    { src: `${LOGO_BASE}/fictional-company-logo-2.svg`, alt: "Company 2" },
    { src: `${LOGO_BASE}/fictional-company-logo-3.svg`, alt: "Company 3" },
    { src: `${LOGO_BASE}/fictional-company-logo-4.svg`, alt: "Company 4" },
    {
      src: `${LOGO_BASE}/fictional-company-logo-5.svg`,
      alt: "Company 5",
      className: "h-5",
    },
    { src: `${LOGO_BASE}/fictional-company-logo-6.svg`, alt: "Company 6" },
  ],
};

const MAX_LOGOS = 6;

const cellClass =
  "group flex h-28 items-center justify-center border-r border-b border-white/10 px-6 lg:h-32";

const Logos = (props: Partial<LogosProps>) => {
  const { label, logos, className } = { ...defaultProps, ...props };
  const visible = logos.slice(0, MAX_LOGOS);

  return (
    <section
      className={cn("dark bg-black py-16 text-white lg:py-24", className)}
    >
      <div className="mx-auto w-full max-w-[1600px] px-6 lg:px-10">
        {label && (
          <p className="mb-8 text-xs font-medium tracking-[0.2em] text-white/40 uppercase">
            {label}
          </p>
        )}

        <ul className="grid grid-cols-2 border-t border-l border-white/10 md:grid-cols-3 lg:grid-cols-6">
          {visible.map((logo, index) => {
            const image = (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={logo.src}
                alt={logo.alt}
                className={cn(
                  "h-7 w-auto max-w-full object-contain opacity-50 brightness-0 invert transition-opacity group-hover:opacity-100",
                  logo.className,
                )}
              />
            );

            return (
              <li key={`${logo.src}-${index}`} className="contents">
                {logo.href ? (
                  <a
                    href={logo.href}
                    className={cn(
                      cellClass,
                      "outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-inset",
                    )}
                  >
                    {image}
                  </a>
                ) : (
                  <div className={cellClass}>{image}</div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export { Logos };
export type { LogosProps };