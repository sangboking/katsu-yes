/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";

// 1. 네이버 지도 인스턴스에서 사용할 메서드들을 명시적으로 정의합니다.
interface NaverMapInstance {
  panTo: (latlng: any) => void;
  setZoom: (level: number) => void;
  setCenter: (latlng: any) => void;
}

// 2. 전역 window 객체에 대한 타입 에러를 방지합니다.
declare global {
  interface Window {
    naver: any;
  }
}

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
