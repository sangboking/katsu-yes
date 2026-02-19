import { useQuery } from '@tanstack/react-query';
import { supabase } from "@/lib/supabase";

export interface DaySchedule {
  open?: string;
  close?: string;
  break?: string;
  last_order?: string[];
  is_closed?: boolean;
  note?: string;
}

export interface OpeningHours {
  mon: DaySchedule;
  tue: DaySchedule;
  wed: DaySchedule;
  thu: DaySchedule;
  fri: DaySchedule;
  sat: DaySchedule;
  sun: DaySchedule;
}

export interface MenuItem {
  name: string;
  price: number;
}

export interface Review {
  id: number;
  place_id: number;
  nickname: string;
  rating: number;
  review_text: string;
  created_at: string;
}

export interface placeDetail {
  id: number;       
  name: string;
  lat: number;
  lng: number;
  address:string;
  phone:string;
  category:string;
  opening_hours: OpeningHours;
  menu_items: MenuItem[];
  reviews: Review[];
  banner_img:string;
}

const getKatsuPlaceDetail = async (placeId: number | null) :Promise<placeDetail> => {
  if (placeId === null) {
    return {} as placeDetail; // placeId가 null일 경우 빈 객체 반환 (Early Return)
  }

  const { data, error } = await supabase.from('places').select(`
    *,
    reviews ( * )
  `).eq('id', placeId).single();
  
  if (error) {
    console.error('데이터 로드 실패:', error.message);
    return {} as placeDetail; // 에러 시 빈 객체 반환 (Early Return)
  }

  return data;
};

export const useKatsuPlaceDetail = (placeId: number | null) => {
  return useQuery<placeDetail>({
    // 1. 쿼리 키: placeId가 바뀔 때마다 새로운 데이터를 가져오거나 캐시를 찾음
    queryKey: ['placeDetail', placeId],
    
    // 2. 쿼리 함수 호출
    queryFn: () => getKatsuPlaceDetail(placeId),
    
    // 3. 핵심! placeId가 있을 때만 API를 호출함
    enabled: placeId !== null,
    
    // 4. 옵션: 상세 정보는 자주 안 변하니 5분 동안은 캐시된 걸 그대로 씀
    staleTime: 1000 * 60 * 5, 
  });
};
