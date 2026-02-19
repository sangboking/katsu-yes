import { supabase } from "@/lib/supabase";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface ReviewInput {
  nickname: string;
  rating: number | null;
  reviewText: string;
}

// 2. API 호출 함수
const createReview = async (placeId: number | null, { nickname, rating, reviewText }: ReviewInput) => {
  const { data, error } = await supabase
    .from('reviews')
    .insert([
      { 
        place_id: placeId,
        nickname: nickname,
        rating: rating,
        review_text: reviewText 
      }
    ])
    .select(); // 등록 후 생성된 데이터를 반환받기 위해 추가

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
      queryClient.invalidateQueries({ queryKey: ['placeDetail', placeId] });
    },
    
    onError: (error) => {
      console.error('리뷰 등록 실패:', error.message);
    }
  });
};