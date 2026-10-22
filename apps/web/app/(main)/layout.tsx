"use client"

import { useAuth } from "@/components/auth-provider"
import { buttonVariants } from "@workspace/ui/components/button"
import Link from "next/link"
import { AppSidebar } from "@workspace/ui/components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@workspace/ui/components/sidebar"
import { Separator } from "@workspace/ui/components/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@workspace/ui/components/breadcrumb"
import { usePathname } from "next/navigation"
import { ThemeToggle } from "@workspace/ui/components/theme-toggle"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { session, isLoading } = useAuth()
  const pathname = usePathname()

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    )
  }

  if (!session) {
    return (
      <div className="flex flex-col gap-4 justify-center items-center min-h-screen">
        <p className="text-lg">Please sign in to access this page.</p>
        <Link href="/auth/sign-in" className={buttonVariants()}>
          Sign In
        </Link>
      </div>
    )
  }

  // Generate a basic breadcrumb from the pathname
  const segments = pathname?.split("/").filter(Boolean) || []
  const currentSegment = segments[segments.length - 1] || "dashboard"
  const title = currentSegment === "aiask" ? "AI Ask" : currentSegment.charAt(0).toUpperCase() + currentSegment.slice(1)

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-14 shrink-0 items-center gap-2 justify-between px-3">
          <div className="flex items-center gap-2">
            <SidebarTrigger />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage className="line-clamp-1">
                    {title}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
          </div>
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}
