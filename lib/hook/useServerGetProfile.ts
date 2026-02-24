import { supabase } from "@/lib/supabase/client";
import { useQuery } from "@tanstack/react-query";

export interface Profile {
  id: string;
  nickname: string;
  avatar_url: string | null;
  created_at: string;
}

export const getCurrentProfile = async (): Promise<Profile | null> => {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return null;
  }

  const { data, error } = await supabase
    .from("profiles")
    .select("id, nickname, avatar_url, created_at")
    .eq("id", user.id)
    .maybeSingle();

  if (error || !data) {
    return null;
  }

  return data as Profile;
};

export const useCurrentProfile = () => {
  return useQuery({
    queryKey: ["currentProfile"],
    queryFn: getCurrentProfile,
    staleTime: Infinity,
    retry: false,
  });
};
