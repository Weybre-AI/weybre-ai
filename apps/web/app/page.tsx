"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

import { Navbar } from "@workspace/ui/components/navbar1";
import { Hero } from "@workspace/ui/components/hero115";
import { Logos } from "@workspace/ui/components/logos18";
import { Features } from "@workspace/ui/components/feature43";
import { Testimonials } from "@workspace/ui/components/testimonial9";
import { Pricing } from "@workspace/ui/components/pricing2";
import { Cta } from "@workspace/ui/components/cta10";
import { Footer } from "@workspace/ui/components/footer2";

export default function Page() {
  const router = useRouter();

  const { data: session, isPending: isLoading } =
    authClient.useSession();

  useEffect(() => {
    if (!isLoading && session) {
      router.replace("/dashboard");
    }
  }, [session, isLoading, router]);

  if (isLoading || session) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

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
  );
}