import { useInfiniteQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export interface Review {
  id: number;
  place_id: number;
  nickname: string;
  rating: number;
  review_text: string;
  created_at: string;
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
    .select("*")
    .eq("place_id", placeId)
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) throw error;
  return data;
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
