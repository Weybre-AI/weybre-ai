"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@workspace/ui/lib/utils";

interface PricingPlan {
  name: string;
  description: string;
  monthlyPrice: string;
  yearlyPrice: string;
  features: string[];
  button: {
    text: string;
    url: string;
  };
  highlighted?: boolean;
  /** Small tag shown on the highlighted plan. */
  badge?: string;
  featureListLabel?: string;
}

interface PricingProps {
  heading: string;
  description?: string;
  plans: PricingPlan[];
  className?: string;
}

const defaultProps: PricingProps = {
  heading: "Pricing that scales with the mission.",
  description:
    "Predictable cost whether you are running a pilot or operating at full production scale.",
  plans: [
    {
      name: "Starter",
      description:
        "For individual teams validating a first deployment on real data.",
      monthlyPrice: "$29",
      yearlyPrice: "$279",
      features: [
        "Single workspace",
        "Core data integrations",
        "Community access",
        "Email support within 2 business days",
      ],
      button: { text: "Start building", url: "#" },
    },
    {
      name: "Team",
      description:
        "For organizations that need shared workspaces, controls and faster support.",
      monthlyPrice: "$79",
      yearlyPrice: "$759",
      featureListLabel: "Everything in Starter, plus",
      features: [
        "Up to 10 seats with shared configuration",
        "Priority support and onboarding call",
        "SSO and exportable audit logs",
        "Quarterly architecture reviews",
        "Roadmap requests in your backlog tier",
      ],
      button: { text: "Request access", url: "#" },
      highlighted: true,
      badge: "Recommended",
    },
  ],
};

/* Same corner-cut silhouette as the other sections. */
const CUT =
  "[clip-path:polygon(0_0,calc(100%-10px)_0,100%_10px,100%_100%,10px_100%,0_calc(100%-10px))]";

const Pricing = (props: Partial<PricingProps>) => {
  const { heading, description, plans, className } = {
    ...defaultProps,
    ...props,
  };
  const [isYearly, setIsYearly] = React.useState(false);

  const columns =
    plans.length >= 3 ? "md:grid-cols-2 lg:grid-cols-3" : "md:grid-cols-2";

  return (
    <section
      className={cn("dark bg-black py-24 text-white lg:py-36", className)}
    >
      <div className="mx-auto w-full max-w-[1600px] px-6 lg:px-10">
        <div className="mb-14 flex flex-col gap-8 lg:mb-20 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <h2 className="text-4xl leading-[1.02] font-semibold tracking-tight text-balance md:text-5xl lg:text-6xl">
              {heading}
            </h2>
            {description && (
              <p className="mt-6 max-w-xl text-base leading-relaxed text-white/60 md:text-lg">
                {description}
              </p>
            )}
          </div>

          <div
            role="group"
            aria-label="Billing period"
            className="inline-flex self-start border border-white/15 lg:self-auto"
          >
            {[
              { label: "Monthly", yearly: false },
              { label: "Yearly", yearly: true },
            ].map((option) => (
              <button
                key={option.label}
                type="button"
                aria-pressed={isYearly === option.yearly}
                onClick={() => setIsYearly(option.yearly)}
                className={cn(
                  "h-11 px-6 text-sm font-medium tracking-wide outline-none transition-colors focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-inset",
                  isYearly === option.yearly
                    ? "bg-white text-black"
                    : "text-white/60 hover:text-white",
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div className={cn("grid border-t border-l border-white/10", columns)}>
          {plans.map((plan) => (
            <article
              key={plan.name}
              className={cn(
                "relative flex flex-col justify-between gap-12 border-r border-b border-white/10 p-8 lg:p-12",
                plan.highlighted && "bg-white/[0.05]",
              )}
            >
              {plan.highlighted && (
                <div
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-px bg-white"
                />
              )}

              <div className="flex flex-col gap-8">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-lg font-semibold tracking-wide">
                    {plan.name}
                  </h3>
                  {plan.highlighted && plan.badge && (
                    <span className="border border-white/25 px-2.5 py-1 text-xs tracking-wide text-white/80">
                      {plan.badge}
                    </span>
                  )}
                </div>

                <div className="flex items-baseline gap-2" aria-live="polite">
                  <span className="text-5xl font-semibold tracking-tight lg:text-6xl">
                    {isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                  </span>
                  <span className="text-base text-white/50">
                    {isYearly ? "/ year" : "/ month"}
                  </span>
                </div>

                <p className="max-w-sm leading-relaxed text-white/60">
                  {plan.description}
                </p>

                <div>
                  <div className="mb-6 h-px w-full bg-white/10" />
                  {plan.featureListLabel && (
                    <p className="mb-4 text-sm font-medium">
                      {plan.featureListLabel}
                    </p>
                  )}
                  <ul className="flex flex-col gap-3.5">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-3 text-[15px] text-white/75"
                      >
                        <Check
                          className="mt-0.5 size-4 shrink-0 text-white"
                          strokeWidth={1.5}
                        />
                        <span className="min-w-0 wrap-break-word">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {plan.highlighted ? (
                <a
                  href={plan.button.url}
                  className={cn(
                    CUT,
                    "inline-flex h-12 w-full items-center justify-center bg-white px-8 text-sm font-semibold tracking-wide text-black outline-none transition-colors hover:bg-white/85 focus-visible:bg-white/85",
                  )}
                >
                  {plan.button.text}
                </a>
              ) : (
                <a
                  href={plan.button.url}
                  className="inline-flex h-12 w-full items-center justify-center border border-white/25 px-8 text-sm font-semibold tracking-wide text-white outline-none transition-colors hover:border-white hover:bg-white/5 focus-visible:border-white focus-visible:bg-white/5"
                >
                  {plan.button.text}
                </a>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Pricing };
export type { PricingProps };