import * as React from "react";
import { cn } from "@workspace/ui/lib/utils";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar";

interface TestimonialItem {
  id?: string;
  name: string;
  avatar: string;
  content: string;
  role?: string;
  /** Optional source link, wraps the company mark. */
  link?: string;
  /** Optional company mark (SVG/PNG). Rendered monochrome white. */
  icon?: string;
}

interface TestimonialsProps {
  heading: string;
  description?: string;
  testimonials: TestimonialItem[];
  className?: string;
}

const AVATAR_BASE =
  "https://cdn.shadcnblocks.com/shadcnblocks/image-set/modern/avatars";

const defaultProps: TestimonialsProps = {
  heading: "Trusted where the stakes are highest.",
  description:
    "Operators, engineers and analysts on what changed once their systems ran on one platform.",
  testimonials: [
    {
      id: "1",
      name: "Vernon Desilets",
      role: "Director of Operations, Meridian Logistics",
      avatar: `${AVATAR_BASE}/avatar3.webp`,
      content:
        "We replaced three internal tools with a single platform. What used to take a week of reconciliation across teams is now a view that is simply there when we open it in the morning.",
    },
    {
      id: "2",
      name: "Allison Goldstein",
      role: "VP of Product, Northfield Systems",
      avatar: `${AVATAR_BASE}/avatar7.webp`,
      content:
        "Production-ready from the first deployment. We shipped in weeks what we had budgeted a quarter for.",
    },
    {
      id: "3",
      name: "Yuki Tanaka",
      role: "General Manager, Hinoki Industries",
      avatar: `${AVATAR_BASE}/avatar12.webp`,
      content:
        "Access controls and audit trails were there from day one, which is why our security review passed without a single rework.",
    },
    {
      id: "4",
      name: "Lín Wàngshū",
      role: "Staff Engineer, Tenxcloud",
      avatar: `${AVATAR_BASE}/avatar4.webp`,
      content:
        "We evaluated five options. This was the only one that ran the same way in the cloud and on a disconnected network.",
    },
    {
      id: "5",
      name: "Charmaine Bellows",
      role: "Head of Analytics, Solstice",
      avatar: `${AVATAR_BASE}/avatar9.webp`,
      content:
        "Every number on the screen traces back to its source. Arguments about whose data is right just stopped.",
    },
    {
      id: "6",
      name: "Rafael Almeida",
      role: "Principal Engineer, Lume",
      avatar: `${AVATAR_BASE}/avatar11.webp`,
      content:
        "We rolled it across three products without forking anything, and nobody has had to refactor since.",
    },
    {
      id: "7",
      name: "Kim Jihoon",
      role: "Software Engineer, Saehan Electronics",
      avatar: `${AVATAR_BASE}/avatar8.webp`,
      content:
        "Our team iterates daily on live data now. Changes go from idea to production without a hand-off in between.",
    },
  ],
};

/* One featured quote plus up to six in the grid. */
const MAX_TESTIMONIALS = 7;

const initials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

const Testimonials = (props: Partial<TestimonialsProps>) => {
  const { heading, description, testimonials, className } = {
    ...defaultProps,
    ...props,
  };
  const [featured, ...rest] = testimonials.slice(0, MAX_TESTIMONIALS);

  return (
    <section
      className={cn("dark bg-black py-24 text-white lg:py-36", className)}
    >
      <div className="mx-auto w-full max-w-[1600px] px-6 lg:px-10">
        <div className="mb-14 max-w-3xl lg:mb-20">
          <h2 className="text-4xl leading-[1.02] font-semibold tracking-tight text-balance md:text-5xl lg:text-6xl">
            {heading}
          </h2>
          {description && (
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/60 md:text-lg">
              {description}
            </p>
          )}
        </div>

        <div className="grid border-t border-l border-white/10 md:grid-cols-2 lg:grid-cols-3">
          {featured && (
            <Quote
              item={featured}
              featured
              className="md:col-span-2 lg:col-span-3"
            />
          )}
          {rest.map((item) => (
            <Quote key={item.id ?? item.name} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

const Quote = ({
  item,
  featured = false,
  className,
}: {
  item: TestimonialItem;
  featured?: boolean;
  className?: string;
}) => (
  <figure
    className={cn(
      "flex flex-col justify-between gap-12 border-r border-b border-white/10 p-8 lg:p-10",
      featured && "gap-16 lg:p-14",
      className,
    )}
  >
    <blockquote
      className={cn(
        "leading-relaxed text-white/80",
        featured
          ? "max-w-5xl text-2xl leading-snug font-medium tracking-tight text-white md:text-3xl lg:text-4xl"
          : "text-[17px]",
      )}
    >
      {item.content}
    </blockquote>

    <figcaption className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <Avatar className="size-10 rounded-full ring-1 ring-white/20">
          <AvatarImage
            src={item.avatar}
            alt=""
            className="grayscale"
          />
          <AvatarFallback className="bg-white/10 text-xs text-white">
            {initials(item.name)}
          </AvatarFallback>
        </Avatar>
        <div className="text-sm">
          <p className="font-medium">{item.name}</p>
          {item.role && <p className="text-white/50">{item.role}</p>}
        </div>
      </div>

      {item.icon && (
        <a
          href={item.link ?? "#"}
          aria-label={`${item.name}'s company`}
          className="shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-white/60"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={item.icon}
            alt=""
            className="h-5 w-auto opacity-50 brightness-0 invert transition-opacity hover:opacity-90"
          />
        </a>
      )}
    </figcaption>
  </figure>
);

export { Testimonials };
export type { TestimonialsProps };