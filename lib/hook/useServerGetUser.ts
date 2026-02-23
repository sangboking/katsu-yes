import type { User } from "@supabase/supabase-js";
import { createServerSupabase } from "@/lib/supabase/server";

export const getCurrentUser = async (): Promise<User | null> => {
  const serverSupabase = await createServerSupabase();

  const {
    data: { user },
    error,
  } = await serverSupabase.auth.getUser();

  if (error) {
    return null;
  }

  return user;
};
