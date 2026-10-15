import * as React from "react";
import { cn } from "@workspace/ui/lib/utils";

interface HeroImage {
  src: string;
  alt: string;
}

interface HeroAction {
  text: string;
  url: string;
}

interface HeroProps {
  heading: string;
  description: string;
  actions?: {
    primary?: HeroAction;
    secondary?: HeroAction;
  };
  /** Full-bleed background. Use a dark, high-contrast photo. */
  image: HeroImage;
  byline?: string;
  className?: string;
}

const defaultProps: HeroProps = {
  heading: "Software that turns data into decisions.",
  description:
    "One platform to integrate every source, run models on your own data, and act on what matters, from the control room to the edge.",
  actions: {
    primary: { text: "Request access", url: "#" },
    secondary: { text: "See how it works", url: "#" },
  },
  image: {
    src: "https://images-assets.nasa.gov/image/KSC-20261013-PH-SPX01_0009/KSC-20261013-PH-SPX01_0009~medium.jpg",
    alt: "Operations view of the platform",
  },
  byline: "Deployed across government, defense and industry",
};

/* Same corner-cut silhouette as the navbar action. */
const CUT =
  "[clip-path:polygon(0_0,calc(100%-10px)_0,100%_10px,100%_100%,10px_100%,0_calc(100%-10px))]";

const Hero = (props: Partial<HeroProps>) => {
  const { heading, description, actions, image, byline, className } = {
    ...defaultProps,
    ...props,
  };

  return (
    <section
      className={cn(
        "dark relative isolate flex min-h-dvh w-full flex-col justify-end overflow-hidden bg-black text-white",
        className,
      )}
    >
      {/* Background image */}
      <img
        src={image.src}
        alt={image.alt}
        fetchPriority="high"
        className="absolute inset-0 -z-20 size-full object-cover object-center opacity-60"
      />

      {/* Scrims: top keeps the transparent navbar legible, bottom carries the copy. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-b from-black/70 via-transparent to-black"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-r from-black/60 via-transparent to-transparent"
      />

      <div className="mx-auto w-full max-w-[1600px] px-6 pt-32 pb-10 lg:px-10 lg:pb-14">
        <h1 className="max-w-4xl text-5xl leading-[0.98] font-semibold tracking-tight text-balance sm:text-6xl lg:text-8xl">
          {heading}
        </h1>

        <p className="mt-6 max-w-xl text-base leading-relaxed text-white/70 md:text-lg">
          {description}
        </p>

        {(actions?.primary || actions?.secondary) && (
          <div className="mt-10 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:gap-8">
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
            {actions.secondary && (
              <a
                href={actions.secondary.url}
                className="inline-flex h-12 items-center justify-center text-sm font-medium tracking-wide text-white/80 underline decoration-white/30 underline-offset-8 outline-none transition-colors hover:text-white hover:decoration-white focus-visible:text-white focus-visible:decoration-white sm:justify-start"
              >
                {actions.secondary.text}
              </a>
            )}
          </div>
        )}

        {byline && (
          <div className="mt-16 lg:mt-24">
            <div
              aria-hidden
              className="h-px w-full bg-gradient-to-r from-white/30 via-white/10 to-transparent"
            />
            <p className="pt-5 text-sm text-white/50">{byline}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export { Hero };
export type { HeroProps };