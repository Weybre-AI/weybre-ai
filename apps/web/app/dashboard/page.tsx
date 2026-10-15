"use client"

import { useAuth } from "@/components/auth-provider"
import { authClient } from "@/lib/auth-client"
import { Button, buttonVariants } from "@workspace/ui/components/button"
import Link from "next/link"
import { AppSidebar } from "@workspace/ui/components/app-sidebar"
import { NavActions } from "@workspace/ui/components/nav-actions"
import { UserButton } from "@workspace/ui/components/auth/user/user-button"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@workspace/ui/components/breadcrumb"
import { Separator } from "@workspace/ui/components/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@workspace/ui/components/sidebar"

export default function Dashboard() {
  const { session, isLoading } = useAuth()

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

  return (
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <header className="flex h-14 shrink-0 items-center gap-2">
              <div className="flex flex-1 items-center gap-2 px-3">
                <SidebarTrigger />
                <Separator
                  orientation="vertical"
                  className="mr-2 data-[orientation=vertical]:h-4"
                />
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbPage className="line-clamp-1">
                        Dashboard
                      </BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
            </header>
            <div className="flex flex-1 flex-col gap-4 px-4 py-10">
              <div className="mx-auto h-24 w-full max-w-3xl rounded-xl bg-muted/50" />
              <div className="mx-auto h-full w-full max-w-3xl rounded-xl bg-muted/50" />
            </div>
          </SidebarInset>
        </SidebarProvider>
  )
}
