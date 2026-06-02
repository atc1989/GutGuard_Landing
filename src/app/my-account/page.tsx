import type { Metadata } from "next";

import MemberDashboard, { type MemberAddress, type MemberProfile } from "@/components/account/MemberDashboard";
import AuthPage from "@/components/auth/AuthPage";
import Navbar from "@/components/landing/Navbar";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Login | GutGuard",
  description: "Log in to your GutGuard account.",
};

interface MyAccountPageProps {
  searchParams: Promise<{ error?: string; recovery?: string }>;
}

export default async function MyAccountPage({ searchParams }: MyAccountPageProps) {
  const params = await searchParams;
  if (params.recovery === "1") {
    return <AuthPage initialRecovery mode="login" />;
  }

  const supabase = await getSupabaseServerClient();
  if (!supabase) {
    return <AuthPage initialError="Supabase is not configured yet. Add your project URL and publishable key to .env.local." mode="login" />;
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <AuthPage initialError={params.error} mode="login" />;
  }

  const [{ data: storedProfile }, { data: storedAddresses }] = await Promise.all([
    supabase.from("profiles").select("id,email,first_name,last_name,full_name,phone").eq("id", user.id).maybeSingle(),
    supabase.from("addresses").select("id,user_id,address_type,recipient_name,phone,street,barangay,city,province,postal_code,country").eq("user_id", user.id),
  ]);

  const metadata = user.user_metadata;
  const profile: MemberProfile = {
    id: user.id,
    email: storedProfile?.email ?? user.email ?? "",
    first_name: storedProfile?.first_name ?? metadata.first_name ?? "",
    last_name: storedProfile?.last_name ?? metadata.last_name ?? "",
    full_name: storedProfile?.full_name ?? metadata.full_name ?? "",
    phone: storedProfile?.phone ?? "",
  };

  return (
    <>
      <Navbar />
      <MemberDashboard initialAddresses={(storedAddresses ?? []) as MemberAddress[]} initialProfile={profile} />
    </>
  );
}
