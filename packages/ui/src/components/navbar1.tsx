"use client";

import * as React from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@workspace/ui/lib/utils";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@workspace/ui/components/accordion";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@workspace/ui/components/navigation-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@workspace/ui/components/sheet";

export interface MenuItem {
  title: string;
  url: string;
  description?: string;
  items?: MenuItem[];
}

export interface NavbarProps {
  className?: string;
  logo?: { url: string; title: string; src?: string; alt?: string };
  menu?: MenuItem[];
  /** Plain text link, left of the main action. */
  secondary?: { title: string; url: string };
  /** Main action, rendered as the angular filled button. */
  action?: { title: string; url: string };
}

const DEFAULT_LOGO: NonNullable<NavbarProps["logo"]> = {
  url: "/",
  title: "Weybre",
};

const DEFAULT_MENU: MenuItem[] = [
  {
    title: "Platform",
    url: "#",
    items: [
      {
        title: "Command",
        description: "One view of every asset, signal and decision",
        url: "#",
      },
      {
        title: "Data integration",
        description: "Connect any source without moving it",
        url: "#",
      },
      {
        title: "Models",
        description: "Deploy and monitor AI on your own data",
        url: "#",
      },
      {
        title: "Deployment",
        description: "Ship to cloud, edge or air-gapped networks",
        url: "#",
      },
    ],
  },
  {
    title: "Missions",
    url: "#",
    items: [
      {
        title: "Government",
        description: "Operational software for public-sector teams",
        url: "#",
      },
      {
        title: "Industry",
        description: "Manufacturing, logistics and energy at scale",
        url: "#",
      },
      {
        title: "Field reports",
        description: "What teams run in production, in their words",
        url: "#",
      },
    ],
  },
  { title: "Company", url: "#" },
  { title: "Careers", url: "#" },
];

/* Corner-cut silhouette, the angular button shape. */
const CUT =
  "[clip-path:polygon(0_0,calc(100%-10px)_0,100%_10px,100%_100%,10px_100%,0_calc(100%-10px))]";

const Navbar = ({
  logo = DEFAULT_LOGO,
  menu = DEFAULT_MENU,
  secondary = { title: "Sign in", url: "#" },
  action = { title: "Request access", url: "#" },
  className,
}: NavbarProps) => {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "dark fixed inset-x-0 top-0 z-50 text-white transition-[background-color,backdrop-filter] duration-300",
        scrolled
          ? "bg-black/25 backdrop-blur-md"
          : "bg-transparent backdrop-blur-0",
        className,
      )}
    >
      {/* Legibility scrim: fades out once the bar has its own blur. */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-black/55 to-transparent transition-opacity duration-300",
          scrolled ? "opacity-0" : "opacity-100",
        )}
      />
      {/* Hairline that fades toward both edges. */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent transition-opacity duration-300",
          scrolled ? "opacity-100" : "opacity-0",
        )}
      />

      <div className="mx-auto flex h-16 w-full max-w-[1600px] items-center justify-between px-6 lg:h-20 lg:px-10">
        <Brand logo={logo} />

        {/* Desktop nav */}
        <NavigationMenu className="hidden lg:flex" aria-label="Primary">
          <NavigationMenuList className="gap-2">
            {menu.map((item) => (
              <DesktopItem key={item.title} item={item} />
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Desktop actions */}
        <div className="hidden items-center gap-6 lg:flex">
          <a
            href={secondary.url}
            className="text-[13px] font-medium tracking-wide text-white/70 outline-none transition-colors hover:text-white focus-visible:text-white focus-visible:underline focus-visible:underline-offset-4"
          >
            {secondary.title}
          </a>
          <ActionLink href={action.url}>{action.title}</ActionLink>
        </div>

        {/* Mobile trigger + overlay */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            aria-label="Open menu"
            className="grid size-10 place-items-center text-white outline-none focus-visible:ring-2 focus-visible:ring-white/60 lg:hidden"
          >
            <Menu className="size-6" strokeWidth={1.5} />
          </SheetTrigger>

          <SheetContent
            side="top"
            showCloseButton={false}
            className="dark h-dvh w-full max-w-none border-0 bg-black/80 p-0 text-white backdrop-blur-2xl"
          >
            <SheetTitle className="sr-only">Menu</SheetTitle>

            <div className="flex h-16 items-center justify-between px-6">
              <Brand logo={logo} onClick={() => setOpen(false)} />
              <SheetClose
                aria-label="Close menu"
                className="grid size-10 place-items-center outline-none focus-visible:ring-2 focus-visible:ring-white/60"
              >
                <X className="size-6" strokeWidth={1.5} />
              </SheetClose>
            </div>

            <div className="flex h-[calc(100dvh-4rem)] flex-col justify-between overflow-y-auto px-6 pb-8">
              <Accordion className="flex w-full flex-col">
                {menu.map((item) => (
                  <MobileItem
                    key={item.title}
                    item={item}
                    onNavigate={() => setOpen(false)}
                  />
                ))}
              </Accordion>

              <div className="mt-10 flex flex-col gap-4">
                <a
                  href={secondary.url}
                  onClick={() => setOpen(false)}
                  className="py-2 text-sm text-white/70 outline-none hover:text-white focus-visible:text-white"
                >
                  {secondary.title}
                </a>
                <ActionLink
                  href={action.url}
                  onClick={() => setOpen(false)}
                  className="h-12 w-full"
                >
                  {action.title}
                </ActionLink>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

/* ---------- Pieces ---------- */

const Brand = ({
  logo,
  onClick,
}: {
  logo: NonNullable<NavbarProps["logo"]>;
  onClick?: () => void;
}) => (
  <a
    href={logo.url}
    onClick={onClick}
    className="flex items-center gap-3 outline-none focus-visible:ring-2 focus-visible:ring-white/60"
  >
    {logo.src && (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={logo.src} alt={logo.alt ?? ""} className="h-6 w-auto" />
    )}
    <span className="text-lg font-semibold tracking-[0.28em] uppercase">
      {logo.title}
    </span>
  </a>
);

const ActionLink = ({
  href,
  children,
  className,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) => (
  <a
    href={href}
    onClick={onClick}
    className={cn(
      CUT,
      "inline-flex h-10 items-center justify-center bg-white px-6 text-[13px] font-semibold tracking-wide text-black outline-none transition-colors hover:bg-white/85 focus-visible:bg-white/85",
      className,
    )}
  >
    {children}
  </a>
);

const DesktopItem = ({ item }: { item: MenuItem }) => {
  const base =
    "h-10 rounded-none bg-transparent px-4 text-[13px] font-medium tracking-wide text-white/70 transition-colors hover:bg-transparent hover:text-white focus:bg-transparent focus:text-white data-open:bg-transparent data-open:text-white";

  if (!item.items) {
    return (
      <NavigationMenuItem>
        <NavigationMenuLink
          render={<a href={item.url} />}
          className={cn(
            base,
            "inline-flex w-max items-center justify-center",
          )}
        >
          {item.title}
        </NavigationMenuLink>
      </NavigationMenuItem>
    );
  }

  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger className={base}>
        {item.title}
      </NavigationMenuTrigger>
      <NavigationMenuContent className="dark rounded-none border border-white/10 bg-black/55 text-white backdrop-blur-xl">
        <ul className="grid w-[40rem] grid-cols-2 gap-x-2 gap-y-1 p-3">
          {item.items.map((sub) => (
            <li key={sub.title}>
              <NavigationMenuLink
                render={<a href={sub.url} />}
                className="group flex h-full flex-col gap-1.5 rounded-none border-t border-white/10 p-4 transition-colors hover:border-white hover:bg-white/5 focus:border-white focus:bg-white/5"
              >
                <span className="text-sm font-semibold">{sub.title}</span>
                {sub.description && (
                  <span className="text-sm leading-snug text-white/60 transition-colors group-hover:text-white/80">
                    {sub.description}
                  </span>
                )}
              </NavigationMenuLink>
            </li>
          ))}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
};

const MobileItem = ({
  item,
  onNavigate,
}: {
  item: MenuItem;
  onNavigate: () => void;
}) => {
  const heading = "text-3xl font-medium tracking-tight";

  if (!item.items) {
    return (
      <a
        href={item.url}
        onClick={onNavigate}
        className={cn(
          heading,
          "border-b border-white/10 py-5 outline-none focus-visible:text-white/70",
        )}
      >
        {item.title}
      </a>
    );
  }

  return (
    <AccordionItem value={item.title} className="border-b border-white/10">
      <AccordionTrigger
        className={cn(heading, "py-5 hover:no-underline")}
      >
        {item.title}
      </AccordionTrigger>
      <AccordionContent>
        <ul className="flex flex-col pb-4">
          {item.items.map((sub) => (
            <li key={sub.title}>
              <a
                href={sub.url}
                onClick={onNavigate}
                className="flex flex-col gap-1 py-3 outline-none focus-visible:text-white"
              >
                <span className="text-base font-medium">{sub.title}</span>
                {sub.description && (
                  <span className="text-sm leading-snug text-white/60">
                    {sub.description}
                  </span>
                )}
              </a>
            </li>
          ))}
        </ul>
      </AccordionContent>
    </AccordionItem>
  );
};

export { Navbar };