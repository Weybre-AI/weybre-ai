"use client"

import { authClient } from "@/lib/auth-client"
import { Auth } from "@workspace/ui/components/auth/auth"
import { Button, buttonVariants } from "@workspace/ui/components/button"
import Link from "next/link"
import { Navbar } from "@workspace/ui/components/navbar1"
import { Hero } from "@workspace/ui/components/hero115";
import { Logos } from "@workspace/ui/components/logos18";
import { Features } from "@workspace/ui/components/feature43";
import { Testimonials } from "@workspace/ui/components/testimonial9";
import { Pricing } from "@workspace/ui/components/pricing2";
import { Cta } from "@workspace/ui/components/cta10";
import { Footer } from "@workspace/ui/components/footer2";
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
      <main className="flex w-full flex-col">
        <Navbar />
        <Hero />
        <Logos />
        <Features />
        <Testimonials />
        <Pricing />
        <Cta />
        <Footer />
      </main>
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
