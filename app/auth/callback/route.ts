import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  const response = NextResponse.redirect(new URL("/", request.url));

  if (code) {
    const supabase = await createClient(response);

    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
  }

  return response;
}
