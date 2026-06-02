import { NextResponse, type NextRequest } from "next/server";

import { getSupabaseServerClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const next = requestUrl.searchParams.get("next") ?? "/my-account";
  const redirectUrl = new URL(next.startsWith("/") ? next : "/my-account", requestUrl.origin);
  const supabase = await getSupabaseServerClient();

  if (code && supabase) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      return NextResponse.redirect(redirectUrl);
    }
  }

  const loginUrl = new URL("/my-account", requestUrl.origin);
  loginUrl.searchParams.set("error", "Unable to complete authentication. Please try again.");
  return NextResponse.redirect(loginUrl);
}
