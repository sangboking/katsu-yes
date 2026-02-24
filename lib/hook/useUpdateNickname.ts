import { supabase } from "@/lib/supabase/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { Profile } from "@/lib/hook/useServerGetProfile";

const updateNickname = async (nickname: string): Promise<Profile> => {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("로그인이 필요합니다.");
  }

  const { data, error } = await supabase
    .from("profiles")
    .update({ nickname })
    .eq("id", user.id)
    .select("id, nickname, avatar_url, created_at")
    .maybeSingle();

  if (error || !data) {
    throw error ?? new Error("닉네임 수정에 실패했습니다.");
  }

  return data as Profile;
};

export const useUpdateNickname = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (nickname: string) => updateNickname(nickname),
    onSuccess: (updatedProfile) => {
      queryClient.setQueryData(["currentProfile"], updatedProfile);
    },
    onError: (error) => {
      console.error("닉네임 수정 실패:", error);
    },
  });
};
