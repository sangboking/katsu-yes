/* eslint-disable @typescript-eslint/no-explicit-any */
import { useInfiniteQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase/client";

export interface Review {
  id: number;
  place_id: number;
  rating: number;
  review_text: string;
  created_at: string;
  profiles: {
    nickname: string | null;
    avatar_url: string | null;
  } | null;
}

const getKatsuPlaceReviews = async ({
  pageParam = 0,
  queryKey,
}: {
  pageParam: number;
  queryKey: (string | number | null)[];
}): Promise<Review[]> => {
  const [, placeId] = queryKey;
  if (!placeId || typeof placeId !== "number") return [];

  const itemsPerPage = 10;
  const from = pageParam * itemsPerPage;
  const to = from + itemsPerPage - 1;

  const { data, error } = await supabase
    .from("reviews")
    .select(
      `
      id,
      place_id,
      rating,
      review_text,
      created_at,
      profiles (
        nickname,
        avatar_url
      )
    `,
    )
    .eq("place_id", placeId)
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) throw error;

  // [핵심 수정 부분]
  // data를 순회하며 profiles 배열의 첫 번째 요소를 객체로 변환합니다.
  const reviews: Review[] = (data || []).map((item: any) => ({
    ...item,
    // profiles가 배열로 오면 첫 번째 요소를 쓰고, 없으면 null 처리
    profiles: Array.isArray(item.profiles) ? item.profiles[0] : item.profiles,
  }));

  return reviews;
};

export const useKatsuPlaceReviews = (placeId: number | null) => {
  return useInfiniteQuery({
    queryKey: ["reviews", placeId],
    queryFn: getKatsuPlaceReviews,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < 10) {
        return undefined;
      }
      return allPages.length;
    },
    enabled: !!placeId,
    staleTime: 1000 * 60 * 5,
  });
};
