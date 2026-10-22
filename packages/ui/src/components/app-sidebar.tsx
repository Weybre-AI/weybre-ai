"use client"

import * as React from "react"

import { NavFavorites } from "@workspace/ui/components/nav-favorites"
import { NavMain } from "@workspace/ui/components/nav-main"
import { NavSecondary } from "@workspace/ui/components/nav-secondary"
import { NavWorkspaces } from "@workspace/ui/components/nav-workspaces"
import { NavRecents } from "@workspace/ui/components/nav-recents"
import { TeamSwitcher } from "@workspace/ui/components/team-switcher"
import { UserButton } from "@workspace/ui/components/auth/user/user-button"

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@workspace/ui/components/sidebar"
import { HugeiconsIcon } from "@hugeicons/react"
import { CommandIcon, AudioWave01Icon, SearchIcon, SparklesIcon, HomeIcon, InboxIcon, CalendarIcon, Settings05Icon, CubeIcon, Delete02Icon, MessageQuestionIcon } from "@hugeicons/core-free-icons"

// This is sample data.
const data = {
  teams: [
    {
      name: "Acme Inc",
      logo: (
        <HugeiconsIcon icon={CommandIcon} strokeWidth={2} />
      ),
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: (
        <HugeiconsIcon icon={AudioWave01Icon} strokeWidth={2} />
      ),
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: (
        <HugeiconsIcon icon={CommandIcon} strokeWidth={2} />
      ),
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Home",
      url: "/dashboard",
      icon: (
        <HugeiconsIcon icon={HomeIcon} strokeWidth={2} />
      ),
      isActive: true,
    },
    {
      title: "AI Ask",
      url: "/aiask",
      icon: (
        <HugeiconsIcon icon={SparklesIcon} strokeWidth={2} />
      ),
    },
    {
      title: "Search",
      url: "/search",
      icon: (
        <HugeiconsIcon icon={SearchIcon} strokeWidth={2} />
      ),
    },
    {
      title: "Inbox",
      url: "/inbox",
      icon: (
        <HugeiconsIcon icon={InboxIcon} strokeWidth={2} />
      ),
      badge: "10",
    },
  ],
  navSecondary: [
    {
      title: "Help",
      url: "/help",
      icon: (
        <HugeiconsIcon icon={MessageQuestionIcon} strokeWidth={2} />
      ),
    },
  ],
  workspaces: [
    {
      name: "Personal Life Management",
      emoji: "🏠",
      pages: [
        {
          name: "Daily Journal & Reflection",
          url: "#",
          emoji: "📔",
        },
        {
          name: "Health & Wellness Tracker",
          url: "#",
          emoji: "🍏",
        },
        {
          name: "Personal Growth & Learning Goals",
          url: "#",
          emoji: "🌟",
        },
      ],
    },
    {
      name: "Professional Development",
      emoji: "💼",
      pages: [
        {
          name: "Career Objectives & Milestones",
          url: "#",
          emoji: "🎯",
        },
        {
          name: "Skill Acquisition & Training Log",
          url: "#",
          emoji: "🧠",
        },
        {
          name: "Networking Contacts & Events",
          url: "#",
          emoji: "🤝",
        },
      ],
    },
    {
      name: "Creative Projects",
      emoji: "🎨",
      pages: [
        {
          name: "Writing Ideas & Story Outlines",
          url: "#",
          emoji: "✍️",
        },
        {
          name: "Art & Design Portfolio",
          url: "#",
          emoji: "🖼️",
        },
        {
          name: "Music Composition & Practice Log",
          url: "#",
          emoji: "🎵",
        },
      ],
    },
    {
      name: "Home Management",
      emoji: "🏡",
      pages: [
        {
          name: "Household Budget & Expense Tracking",
          url: "#",
          emoji: "💰",
        },
        {
          name: "Home Maintenance Schedule & Tasks",
          url: "#",
          emoji: "🔧",
        },
        {
          name: "Family Calendar & Event Planning",
          url: "#",
          emoji: "📅",
        },
      ],
    },
    {
      name: "Travel & Adventure",
      emoji: "🧳",
      pages: [
        {
          name: "Trip Planning & Itineraries",
          url: "#",
          emoji: "🗺️",
        },
        {
          name: "Travel Bucket List & Inspiration",
          url: "#",
          emoji: "🌎",
        },
        {
          name: "Travel Journal & Photo Gallery",
          url: "#",
          emoji: "📸",
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar className="border-r-0" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
        <NavMain items={data.navMain} />
      </SidebarHeader>
      <SidebarContent>
        <NavRecents />
      </SidebarContent>
      <NavMain items={data.navSecondary} />
      <SidebarRail />
      <UserButton />
    </Sidebar>
  )
}
