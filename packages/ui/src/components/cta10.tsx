import * as React from "react";
import { cn } from "@workspace/ui/lib/utils";

interface CtaAction {
  text: string;
  url: string;
}

interface CtaProps {
  heading: string;
  description?: string;
  actions?: {
    primary?: CtaAction;
    secondary?: CtaAction;
  };
  className?: string;
}

const defaultProps: CtaProps = {
  heading: "Put your data to work.",
  description:
    "Talk to the team about what a first deployment looks like for your organization.",
  actions: {
    primary: { text: "Request access", url: "#" },
    secondary: { text: "Schedule a demo", url: "#" },
  },
};

/* Same corner-cut silhouette as the other sections. */
const CUT =
  "[clip-path:polygon(0_0,calc(100%-10px)_0,100%_10px,100%_100%,10px_100%,0_calc(100%-10px))]";

const Cta = (props: Partial<CtaProps>) => {
  const { heading, description, actions, className } = {
    ...defaultProps,
    ...props,
  };

  return (
    <section
      className={cn(
        "dark relative overflow-hidden bg-black py-24 text-white lg:py-40",
        className,
      )}
    >
      {/* Hairline that fades toward both edges, closing off the section above. */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent"
      />

      <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-14 px-6 lg:flex-row lg:items-end lg:justify-between lg:gap-20 lg:px-10">
        <div className="max-w-4xl">
          <h2 className="text-5xl leading-[0.98] font-semibold tracking-tight text-balance md:text-6xl lg:text-8xl">
            {heading}
          </h2>
          {description && (
            <p className="mt-8 max-w-xl text-base leading-relaxed text-white/60 md:text-lg">
              {description}
            </p>
          )}
        </div>

        {(actions?.primary || actions?.secondary) && (
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row sm:items-center">
            {actions.secondary && (
              <a
                href={actions.secondary.url}
                className="inline-flex h-12 items-center justify-center border border-white/25 px-8 text-sm font-semibold tracking-wide text-white outline-none transition-colors hover:border-white hover:bg-white/5 focus-visible:border-white focus-visible:bg-white/5"
              >
                {actions.secondary.text}
              </a>
            )}
            {actions.primary && (
              <a
                href={actions.primary.url}
                className={cn(
                  CUT,
                  "inline-flex h-12 items-center justify-center bg-white px-8 text-sm font-semibold tracking-wide text-black outline-none transition-colors hover:bg-white/85 focus-visible:bg-white/85",
                )}
              >
                {actions.primary.text}
              </a>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export { Cta };
export type { CtaProps };