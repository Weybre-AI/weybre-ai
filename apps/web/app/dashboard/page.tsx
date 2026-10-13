"use client"

import { useAuth } from "@/components/auth-provider"
import { authClient } from "@/lib/auth-client"
import { Button, buttonVariants } from "@workspace/ui/components/button"
import Link from "next/link"

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
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex justify-between items-center border-b pb-4">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <Button
            variant="destructive"
            onClick={() => authClient.signOut({
              fetchOptions: {
                onSuccess: () => {
                  window.location.href = "/auth/sign-in"
                }
              }
            })}
          >
            Sign Out
          </Button>
        </div>

        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">User Information</h2>
          <div className="space-y-2 text-sm">
            <p>
              <strong className="text-muted-foreground">Email:</strong> {session.user?.email}
            </p>
            <p>
              <strong className="text-muted-foreground">Name:</strong> {session.user?.name || "N/A"}
            </p>
            <p>
              <strong className="text-muted-foreground">User ID:</strong> {session.user?.id}
            </p>
          </div>
        </div>

        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Protected Content</h2>
          <p className="text-muted-foreground">
            This is a protected dashboard page that only authenticated users can access.
          </p>
        </div>
      </div>
    </div>
  )
}
