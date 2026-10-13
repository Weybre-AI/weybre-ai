"use client";

import { AuthProvider as BetterAuthUIProvider } from "@workspace/ui/components/auth/auth-provider";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import React, { ComponentPropsWithoutRef, ComponentType, PropsWithChildren } from "react";

const NextAuthLink: ComponentType<
  PropsWithChildren<{
    className?: string;
    href?: string;
    to?: string;
  } & Pick<ComponentPropsWithoutRef<"a">, "aria-disabled" | "tabIndex" | "onClick">>
> = ({ href, to, children, ...props }) => {
  return (
    <Link href={href ?? to ?? "#"} {...props}>
      {children}
    </Link>
  );
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <BetterAuthUIProvider
      authClient={authClient}
      Link={NextAuthLink as any}
      navigate={({ to, replace }) => {
        if (replace) {
          router.replace(to);
        } else {
          router.push(to);
        }
      }}
      redirectTo="/dashboard"
    >
      {children}
    </BetterAuthUIProvider>
  );
}

export function useAuth() {
  const { data: session, isPending: isLoading, error } = authClient.useSession();
  return { session, isLoading, error };
}
