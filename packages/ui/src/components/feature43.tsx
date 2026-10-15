import * as React from "react";
import {
  ChartLine,
  Globe,
  Layers,
  Lock,
  Shield,
  Workflow,
} from "lucide-react";
import { cn } from "@workspace/ui/lib/utils";

interface FeatureItem {
  title: string;
  description: string;
  icon?: React.ReactNode;
  /** When set, the whole cell becomes a link. */
  href?: string;
}

interface FeatureAction {
  text: string;
  url: string;
}

interface FeaturesProps {
  heading: string;
  description?: string;
  features?: FeatureItem[];
  actions?: {
    primary?: FeatureAction;
  };
  className?: string;
}

const defaultProps: FeaturesProps = {
  heading: "Built for environments where failure is not an option.",
  description:
    "Every capability runs on the same foundation, so teams move from data to decision without switching systems.",
  features: [
    {
      icon: <Layers className="size-6" strokeWidth={1.5} />,
      title: "Unified data layer",
      description:
        "Connect every source in place and work from a single, governed model of your operation.",
    },
    {
      icon: <Workflow className="size-6" strokeWidth={1.5} />,
      title: "Automated workflows",
      description:
        "Turn recurring decisions into pipelines that run, escalate and log without manual hand-offs.",
    },
    {
      icon: <Shield className="size-6" strokeWidth={1.5} />,
      title: "Security by default",
      description:
        "Role-based access, full audit trails and encryption at rest and in transit, from day one.",
    },
    {
      icon: <Globe className="size-6" strokeWidth={1.5} />,
      title: "Deploy anywhere",
      description:
        "Run in the cloud, on-premises or fully air-gapped with the same codebase and the same controls.",
    },
    {
      icon: <ChartLine className="size-6" strokeWidth={1.5} />,
      title: "Live operational view",
      description:
        "Track assets, signals and outcomes in real time, with the history behind every number.",
    },
    {
      icon: <Lock className="size-6" strokeWidth={1.5} />,
      title: "Your data stays yours",
      description:
        "Models train and run on your own infrastructure. Nothing leaves your boundary unless you send it.",
    },
  ],
  actions: {
    primary: { text: "Explore the platform", url: "#" },
  },
};

const MAX_FEATURES = 6;

/* Same corner-cut silhouette as the navbar and hero actions. */
const CUT =
  "[clip-path:polygon(0_0,calc(100%-10px)_0,100%_10px,100%_100%,10px_100%,0_calc(100%-10px))]";

const cellClass =
  "group relative flex min-h-64 flex-col justify-between gap-12 border-r border-b border-white/10 bg-black p-8 transition-colors lg:min-h-72 lg:p-10";

const Features = (props: Partial<FeaturesProps>) => {
  const { heading, description, features, actions, className } = {
    ...defaultProps,
    ...props,
  };
  const items = (features ?? []).slice(0, MAX_FEATURES);

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

          {actions?.primary?.url && (
            <a
              href={actions.primary.url}
              className={cn(
                CUT,
                "inline-flex h-12 shrink-0 items-center justify-center self-start bg-white px-8 text-sm font-semibold tracking-wide text-black outline-none transition-colors hover:bg-white/85 focus-visible:bg-white/85 lg:self-auto",
              )}
            >
              {actions.primary.text}
            </a>
          )}
        </div>

        <ul className="grid border-t border-l border-white/10 md:grid-cols-2 lg:grid-cols-3">
          {items.map((feature) => {
            const body = (
              <>
                <span className="text-white/50 transition-colors group-hover:text-white">
                  {feature.icon}
                </span>
                <span className="flex flex-col gap-3">
                  <span className="text-xl font-medium tracking-tight">
                    {feature.title}
                  </span>
                  <span className="max-w-sm text-[15px] leading-relaxed text-white/60 transition-colors group-hover:text-white/75">
                    {feature.description}
                  </span>
                </span>
              </>
            );

            return (
              <li key={feature.title} className="contents">
                {feature.href ? (
                  <a
                    href={feature.href}
                    className={cn(
                      cellClass,
                      "outline-none hover:bg-white/[0.04] focus-visible:bg-white/[0.04] focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-inset",
                    )}
                  >
                    {body}
                  </a>
                ) : (
                  <div className={cn(cellClass, "hover:bg-white/[0.03]")}>
                    {body}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export { Features };
export type { FeaturesProps };