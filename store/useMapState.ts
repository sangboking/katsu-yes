import { create } from "zustand";
import type { NaverMapInstance } from "@/types/naver";

interface MapState {
  map: NaverMapInstance | null;
  setMap: (map: NaverMapInstance | null) => void;
  moveMap: (lat: number, lng: number) => void;
}

export const useMapState = create<MapState>((set, get) => ({
  map: null,
  setMap: (map) => set({ map }),
  moveMap: (lat: number, lng: number) => {
    const { map } = get();

    if (map && typeof window !== "undefined" && window.naver?.maps) {
      const targetPoint = new window.naver.maps.LatLng(
        Number(lat),
        Number(lng),
      );

      map.setCenter(targetPoint);
      map.setZoom(18);
    }
  },
}));
