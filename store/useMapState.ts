/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";

// 1. 네이버 지도 인스턴스에서 사용할 메서드들을 명시적으로 정의합니다.
interface NaverMapInstance {
  panTo: (latlng: any) => void;
  setZoom: (level: number) => void;
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
    
    // window.naver가 존재하는지도 함께 체크해주는 것이 배포 시 안전합니다.
    if (map && typeof window !== "undefined" && window.naver) {
      const targetPoint = new window.naver.maps.LatLng(lat, lng);
      
      // 이제 map은 NaverMapInstance 타입을 가지므로 panTo를 인식합니다.
      map.panTo(targetPoint);
      map.setZoom(18);
    }
  },
}));