"use client";

import * as React from "react";
import { cn } from "@workspace/ui/lib/utils";
import { authClient } from "../lib/auth-client";

/* Same corner-cut silhouette as the rest of the page. */
const CUT =
  "[clip-path:polygon(0_0,calc(100%-10px)_0,100%_10px,100%_100%,10px_100%,0_calc(100%-10px))]";

/* ---------- Shared pieces ---------- */

const Shell = ({
  title,
  subtitle,
  className,
  children,
}: {
  title: string;
  subtitle?: string;
  className?: string;
  children: React.ReactNode;
}) => (
  <div
    className={cn(
      "dark mx-auto w-full max-w-md border border-white/10 bg-black p-8 text-white lg:p-10",
      className,
    )}
  >
    <h2 className="text-3xl font-semibold tracking-tight">{title}</h2>
    {subtitle && <p className="mt-3 text-sm text-white/50">{subtitle}</p>}
    <div className="mt-10">{children}</div>
  </div>
);

const Field = ({
  label,
  id,
  ...props
}: { label: string; id: string } & React.ComponentProps<"input">) => (
  <div className="flex flex-col gap-2">
    <label
      htmlFor={id}
      className="text-xs font-medium tracking-[0.2em] text-white/50 uppercase"
    >
      {label}
    </label>
    <input
      id={id}
      name={id}
      required
      className="h-12 w-full border border-white/15 bg-transparent px-4 text-sm text-white outline-none transition-colors placeholder:text-white/30 hover:border-white/30 focus:border-white disabled:opacity-50"
      {...props}
    />
  </div>
);

const SubmitButton = ({
  loading,
  idleText,
  loadingText,
}: {
  loading: boolean;
  idleText: string;
  loadingText: string;
}) => (
  <button
    type="submit"
    disabled={loading}
    className={cn(
      CUT,
      "inline-flex h-12 w-full items-center justify-center bg-white px-8 text-sm font-semibold tracking-wide text-black outline-none transition-colors hover:bg-white/85 focus-visible:bg-white/85 disabled:cursor-not-allowed disabled:opacity-50",
    )}
  >
    {loading ? loadingText : idleText}
  </button>
);

const ErrorMessage = ({ message }: { message: string | null }) =>
  message ? (
    <p
      role="alert"
      className="border-l-2 border-white/60 bg-white/5 px-4 py-3 text-sm text-white/80"
    >
      {message}
    </p>
  ) : null;

const SwitchLink = ({
  text,
  linkText,
  href,
}: {
  text: string;
  linkText: string;
  href: string;
}) => (
  <p className="mt-8 border-t border-white/10 pt-6 text-sm text-white/50">
    {text}{" "}
    <a
      href={href}
      className="text-white underline decoration-white/30 underline-offset-4 outline-none transition-colors hover:decoration-white focus-visible:decoration-white"
    >
      {linkText}
    </a>
  </p>
);

/* Better Auth resolves with { data, error } instead of throwing on
   failed requests, so every call checks `error` explicitly. */
const FALLBACK_ERROR = "Something went wrong. Please try again.";

interface AuthFormProps {
  /** Where to send the user after success. */
  callbackURL?: string;
  /** Link to the other form (sign up from login, and vice versa). */
  switchHref?: string;
  className?: string;
}

/* ---------- Login ---------- */

export function LoginForm({
  callbackURL = "/",
  switchHref,
  className,
}: AuthFormProps) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const { error } = await authClient.signIn.email({
        email,
        password,
        callbackURL,
      });
      if (error) setError(error.message ?? FALLBACK_ERROR);
    } catch (err) {
      console.error("Login failed:", err);
      setError(FALLBACK_ERROR);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Shell
      title="Sign in"
      subtitle="Use your work email to access your workspace."
      className={className}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <Field
          label="Email"
          id="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
        />
        <Field
          label="Password"
          id="password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        />
        <ErrorMessage message={error} />
        <SubmitButton
          loading={isLoading}
          idleText="Sign in"
          loadingText="Signing in..."
        />
      </form>
      {switchHref && (
        <SwitchLink
          text="No account yet?"
          linkText="Create one"
          href={switchHref}
        />
      )}
    </Shell>
  );
}

/* ---------- Sign up ---------- */

export function SignUpForm({
  callbackURL = "/",
  switchHref,
  className,
}: AuthFormProps) {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const { error } = await authClient.signUp.email({
        name,
        email,
        password,
        callbackURL,
      });
      if (error) setError(error.message ?? FALLBACK_ERROR);
    } catch (err) {
      console.error("Sign up failed:", err);
      setError(FALLBACK_ERROR);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Shell
      title="Create account"
      subtitle="Set up your access in under a minute."
      className={className}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <Field
          label="Name"
          id="name"
          type="text"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={isLoading}
        />
        <Field
          label="Email"
          id="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
        />
        <Field
          label="Password"
          id="password"
          type="password"
          autoComplete="new-password"
          minLength={8}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        />
        <ErrorMessage message={error} />
        <SubmitButton
          loading={isLoading}
          idleText="Create account"
          loadingText="Creating account..."
        />
      </form>
      {switchHref && (
        <SwitchLink
          text="Already have an account?"
          linkText="Sign in"
          href={switchHref}
        />
      )}
    </Shell>
  );
}