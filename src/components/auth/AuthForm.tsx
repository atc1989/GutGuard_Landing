"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

import Button from "@/components/ui/Button";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

type AuthMode = "login" | "signup";

interface AuthFormProps {
  initialError?: string;
  initialRecovery?: boolean;
  mode: AuthMode;
}

function EyeIcon({ hidden }: { hidden: boolean }) {
  return hidden ? (
    <svg aria-hidden="true" fill="none" height="20" viewBox="0 0 24 24" width="20">
      <path d="M3 3l18 18M10.6 10.6a2 2 0 0 0 2.8 2.8M9.9 4.2A10.8 10.8 0 0 1 12 4c5.5 0 9 5 9 5a17.4 17.4 0 0 1-3.2 3.5M6.6 6.6C4.2 8.1 3 10 3 10s3.5 5 9 5c1.1 0 2.1-.2 3-.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" />
    </svg>
  ) : (
    <svg aria-hidden="true" fill="none" height="20" viewBox="0 0 24 24" width="20">
      <path d="M3 12s3.5-5 9-5 9 5 9 5-3.5 5-9 5-9-5-9-5Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" />
      <circle cx="12" cy="12" r="2.2" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

export default function AuthForm({ initialError = "", initialRecovery = false, mode }: AuthFormProps) {
  const router = useRouter();
  const supabase = getSupabaseBrowserClient();
  const isSignup = mode === "signup";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [resetMode, setResetMode] = useState(false);
  const [recoveryMode, setRecoveryMode] = useState(initialRecovery);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(initialError);

  useEffect(() => {
    const isRecoveryLink = window.location.hash.includes("type=recovery");
    if (isRecoveryLink) {
      queueMicrotask(() => setRecoveryMode(true));
    }
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessage("");

    if (!supabase) {
      setError("Supabase is not configured yet. Add your project URL and publishable key to .env.local.");
      return;
    }

    if (isSignup && password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (recoveryMode && password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    if (recoveryMode) {
      const { error: recoveryError } = await supabase.auth.updateUser({ password });

      setLoading(false);
      if (recoveryError) {
        setError(recoveryError.message);
        return;
      }

      await supabase.auth.signOut();
      window.history.replaceState({}, document.title, window.location.pathname);
      setRecoveryMode(false);
      setPassword("");
      setConfirmPassword("");
      setMessage("Your password has been updated. Log in with your new password.");
      router.replace("/my-account");
      router.refresh();
      return;
    }

    if (resetMode) {
      const callbackUrl = new URL("/auth/callback", window.location.origin);
      callbackUrl.searchParams.set("next", "/my-account?recovery=1");
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: callbackUrl.toString(),
      });

      setLoading(false);
      if (resetError) {
        setError(resetError.message);
        return;
      }

      setMessage("Check your email for a password reset link.");
      return;
    }

    if (isSignup) {
      const callbackUrl = new URL("/auth/callback", window.location.origin);
      callbackUrl.searchParams.set("next", "/my-account");
      const { error: signupError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: callbackUrl.toString(),
          data: {
            first_name: firstName,
            last_name: lastName,
            full_name: `${firstName} ${lastName}`.trim(),
          },
        },
      });

      setLoading(false);
      if (signupError) {
        setError(signupError.message);
        return;
      }

      setMessage("Account created. Check your email to confirm your account, then log in.");
      return;
    }

    const { error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);
    if (loginError) {
      setError(loginError.message);
      return;
    }

    router.refresh();
  }

  return (
    <form className="rounded-lg border border-slate-200 bg-white px-6 pb-8 pt-6 sm:px-7 sm:pb-9 sm:pt-7" onSubmit={handleSubmit}>
      {isSignup && (
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block text-[0.92rem] text-slate-500">
            First name <span className="text-red-700">*</span>
            <input
              className="mt-2 block h-[52px] w-full rounded-md border border-slate-200 bg-[#EEF4FF] px-4 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              onChange={(event) => setFirstName(event.target.value)}
              required
              type="text"
              value={firstName}
            />
          </label>
          <label className="block text-[0.92rem] text-slate-500">
            Last name <span className="text-red-700">*</span>
            <input
              className="mt-2 block h-[52px] w-full rounded-md border border-slate-200 bg-[#EEF4FF] px-4 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              onChange={(event) => setLastName(event.target.value)}
              required
              type="text"
              value={lastName}
            />
          </label>
        </div>
      )}

      <label className={`block text-[0.92rem] text-slate-500 ${isSignup ? "mt-5" : ""}`}>
        Email address <span className="text-red-700">*</span>
        <input
          autoComplete="email"
          className="mt-2 block h-[52px] w-full rounded-md border border-slate-200 bg-[#EEF4FF] px-4 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          onChange={(event) => setEmail(event.target.value)}
          required
          type="email"
          value={email}
        />
      </label>

      {!resetMode && (
        <label className="mt-5 block text-[0.92rem] text-slate-500">
          Password <span className="text-red-700">*</span>
          <span className="relative mt-2 block">
            <input
              autoComplete={isSignup || recoveryMode ? "new-password" : "current-password"}
              className="block h-[52px] w-full rounded-md border border-slate-200 bg-[#EEF4FF] px-4 pr-12 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              minLength={6}
              onChange={(event) => setPassword(event.target.value)}
              required
              type={showPassword ? "text" : "password"}
              value={password}
            />
            <Button
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-slate-700"
              lift={false}
              onClick={() => setShowPassword((visible) => !visible)}
              size="none"
              type="button"
              variant="unstyled"
            >
              <EyeIcon hidden={!showPassword} />
            </Button>
          </span>
        </label>
      )}

      {(isSignup || recoveryMode) && (
        <label className="mt-5 block text-[0.92rem] text-slate-500">
          Confirm password <span className="text-red-700">*</span>
          <input
            autoComplete="new-password"
            className="mt-2 block h-[52px] w-full rounded-md border border-slate-200 bg-[#EEF4FF] px-4 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            minLength={6}
            onChange={(event) => setConfirmPassword(event.target.value)}
            required
            type={showPassword ? "text" : "password"}
            value={confirmPassword}
          />
        </label>
      )}

      {error && <p className="mt-4 text-sm text-red-700">{error}</p>}
      {message && <p className="mt-4 text-sm text-green-700">{message}</p>}

      <div className={`mt-5 flex flex-wrap items-center gap-4 ${isSignup ? "pb-2" : ""}`}>
        <Button
          className="rounded-md px-10 py-3.5 text-sm font-semibold disabled:cursor-wait disabled:opacity-60"
          disabled={loading}
          lift={false}
          type="submit"
          variant="auth-primary"
        >
          {loading ? "Please wait..." : recoveryMode ? "Update password" : resetMode ? "Send reset link" : isSignup ? "Sign up" : "Log in"}
        </Button>
        {!isSignup && !resetMode && !recoveryMode && (
          <Button className="rounded-md px-4 py-3 text-sm" href="/sign-up" lift={false} variant="auth-outline">
            Create an account
          </Button>
        )}
      </div>

      {!isSignup && !recoveryMode && (
        <Button
          className="mt-4 block text-sm text-[#1010C9] hover:underline"
          lift={false}
          onClick={() => {
            setResetMode((active) => !active);
            setError("");
            setMessage("");
          }}
          size="none"
          type="button"
          variant="unstyled"
        >
          {resetMode ? "Back to login" : "Lost your password?"}
        </Button>
      )}

      {isSignup && (
        <p className="mt-6 text-sm text-slate-500">
          Already have an account?{" "}
          <Button className="font-medium" href="/my-account" lift={false} size="none" variant="auth-text">
            Log in
          </Button>
        </p>
      )}
    </form>
  );
}
