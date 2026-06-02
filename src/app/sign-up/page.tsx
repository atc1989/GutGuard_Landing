import type { Metadata } from "next";

import AuthPage from "@/components/auth/AuthPage";

export const metadata: Metadata = {
  title: "Sign up | GutGuard",
  description: "Create your GutGuard account.",
};

export default function SignUpPage() {
  return <AuthPage mode="signup" />;
}
