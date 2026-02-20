import { supabase } from "@/lib/supabase";

export interface Place {
  id: number;
  name: string;
  lat: number;
  lng: number;
  address: string;
  banner_img: string;
}

const getKatsuPlaces = async (): Promise<Place[]> => {
  const { data, error } = await supabase
    .from("places")
    .select("id, name, lat, lng, address, banner_img");

  if (error) {
    console.error("데이터 로드 실패:", error.message);
    return []; // 에러 시 빈 배열 반환 (Early Return)
  }

  return data;
};

export default getKatsuPlaces;
