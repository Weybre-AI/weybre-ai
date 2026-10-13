"use client"

import { authClient } from "@/lib/auth-client"
import { Auth } from "@workspace/ui/components/auth/auth"
import { Button, buttonVariants } from "@workspace/ui/components/button"
import Link from "next/link"

export default function Page() {
  const { data: session, isPending: isLoading } = authClient.useSession()

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    )
  }

  if (session) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center space-y-6">
          <h1 className="text-3xl font-bold">Welcome back!</h1>
          <p className="text-muted-foreground">
            You are signed in as: <span className="font-medium text-foreground">{session.user.name || session.user.email}</span>
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/dashboard" className={buttonVariants()}>
              Go to Dashboard
            </Link>
            <Button
              variant="destructive"
              onClick={() => authClient.signOut()}
            >
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Auth view="signIn" />
      </div>
    </div>
  )
}
