import { supabase } from "@/lib/supabase/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface ReviewInput {
  rating: number | null;
  reviewText: string;
}

const createReview = async (
  placeId: number,
  { rating, reviewText }: ReviewInput,
) => {
  // 🔐 로그인 체크
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("로그인이 필요합니다.");
  }

  const { data, error } = await supabase
    .from("reviews")
    .insert([
      {
        place_id: placeId,
        rating: rating,
        review_text: reviewText,
      },
    ])
    .select();

  if (error) throw error;
  return data;
};

export const useCreateReview = (placeId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    // 컴포넌트에서 mutate({ nickname, rating, reviewText }) 형태로 던져주면 됩니다.
    mutationFn: (reviewData: ReviewInput) => createReview(placeId, reviewData),

    onSuccess: () => {
      // 상세 정보와 그 안의 리뷰 목록을 최신화
      queryClient.invalidateQueries({ queryKey: ["reviews", placeId] });
    },

    onError: (error) => {
      console.error("리뷰 등록 실패:", error.message);
    },
  });
};
