"use client"

import * as React from "react"
import { SquarePen, Filter, MoreHorizontal } from "lucide-react"

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarGroupAction,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuAction,
  useSidebar,
} from "@workspace/ui/components/sidebar"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@workspace/ui/components/tooltip"

export function NavRecents() {
  const { setOpenMobile, isMobile } = useSidebar()

  const handleNewChat = () => {
    // Dispatch global event for New Chat
    window.dispatchEvent(new Event("new-chat"))
    
    // Close sidebar on mobile
    if (isMobile) {
      setOpenMobile(false)
    }
  }

  return (
    <SidebarGroup>
      <div className="flex items-center justify-between pr-2">
        <SidebarGroupLabel>Recents</SidebarGroupLabel>
        
        <div className="flex items-center gap-1 group-data-[collapsible=icon]:hidden">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger render={
                <button className="flex h-6 w-6 items-center justify-center rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-muted-foreground transition-colors">
                  <Filter className="h-3.5 w-3.5" />
                </button>
              } />
              <TooltipContent>Filter</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger render={
                <button 
                  onClick={handleNewChat}
                  aria-label="New chat"
                  className="flex h-6 w-6 items-center justify-center rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-muted-foreground transition-colors"
                >
                  <SquarePen className="h-3.5 w-3.5" />
                </button>
              } />
              <TooltipContent>New chat</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      <SidebarGroupContent>
        <SidebarMenu>
          {/* Example Recent Conversation */}
          <SidebarMenuItem>
            <SidebarMenuButton render={<a href="#" />}>
              <span className="truncate">Explain quantum computing</span>
            </SidebarMenuButton>
            <SidebarMenuAction showOnHover>
              <MoreHorizontal />
            </SidebarMenuAction>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
