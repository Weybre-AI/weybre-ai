"use client"
import { authClient } from "@/lib/auth-client"
import { Button } from "@workspace/ui/components/button"

export default function Page() {
  const { data: session, isPending: isLoading } = authClient.useSession()
  if (!isLoading) {
    <div className="flex justify-center items-center min-h-screen">
      Loading...
    </div>
  }
}
