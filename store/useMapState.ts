import { create } from "zustand";
import type { NaverMapInstance } from "@/types/naver";

interface MapState {
  map: NaverMapInstance | null;
  setMap: (map: NaverMapInstance) => void;
  moveMap: (lat: number, lng: number) => void;
}

export const useMapState = create<MapState>((set, get) => ({
  map: null,
  setMap: (map) => set({ map }),
  moveMap: (lat: number, lng: number) => {
    const { map } = get();
    if (map) {
      map.panTo(new window.naver.maps.LatLng(lat, lng));
      map.setZoom(18);
    }
  },
}));
