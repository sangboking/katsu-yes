"use client";

import Script from "next/script";
import { useEffect, useRef } from "react";

import SearchBar from "@/components/common/SearchBar";

import type { NaverMapInstance } from "@/types/naver";
import type { Place } from "@/lib/hook/useKatsuPlaces";
import { useSideBarState } from "@/store/useSideBarState";
import { useMapState } from "@/store/useMapState";

interface NaverMarker {
  setAnimation: (animation: unknown) => void;
}

const NAVER_CLIENT_ID = process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID;

const NaverMap = ({ katsuPlaces }: { katsuPlaces: Place[] }) => {
  const mapElementRef = useRef<HTMLDivElement | null>(null);
  const markersRef = useRef<{ id: number; marker: NaverMarker }[]>([]);
  const { openSideBar, selectedPlaceId } = useSideBarState();
  const { map, setMap } = useMapState();

  // 1. 지도 초기화와 클린업(정리)을 담당하는 useEffect
  useEffect(() => {
    // 지도를 표시할 DOM 요소가 없으면 아무것도 하지 않음
    if (!mapElementRef.current) return;

    // 네이버 지도 스크립트가 로드되었는지 확인
    if (window.naver && window.naver.maps) {
      // 스크립트가 이미 로드되었다면, 즉시 지도를 생성 (뒤로가기 시 이 로직이 실행됨)
      initializeMap();
    }

    // 클린업 함수: 컴포넌트가 언마운트될 때 실행됨
    return () => {
      // 전역 상태에 저장된 지도 인스턴스를 가져와서 파괴
      const currentMap = useMapState.getState().map;
      if (!currentMap) return;

      currentMap.destroy();
      setMap(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 2. 마커 애니메이션을 위한 useEffect (기존과 동일)
  useEffect(() => {
    if (markersRef.current.length === 0 || !window.naver || !map) return;

    markersRef.current.forEach(({ id, marker }) => {
      const animation =
        id === selectedPlaceId ? window.naver.maps.Animation.BOUNCE : null;
      marker.setAnimation(animation);
    });
  }, [selectedPlaceId, map]);

  // 3. 지도 생성 로직을 별도 함수로 분리
  const initializeMap = () => {
    if (!mapElementRef.current || !window.naver || !window.naver.maps) return;

    // 이미 지도가 생성되어 있다면 중복 생성을 방지
    if (useMapState.getState().map) return;

    const center = new window.naver.maps.LatLng(37.5493287, 126.9136246);
    const newMap = new window.naver.maps.Map(mapElementRef.current, {
      center,
      zoom: 15,
      mapDataControl: false,
    });

    setMap(newMap);
    createMarkers(newMap);
  };

  // 4. 마커 생성 로직 (기존과 거의 동일, 리팩토링)
  const createMarkers = (mapInstance: NaverMapInstance) => {
    if (!mapInstance) return;

    markersRef.current = []; // 마커 배열 초기화

    const infoWindow = new window.naver.maps.InfoWindow({
      content: "",
      borderWidth: 0,
      disableAutoPan: true,
      backgroundColor: "transparent",
      anchorSize: new window.naver.maps.Size(0, 0),
      pixelOffset: new window.naver.maps.Point(0, -5),
    });

    katsuPlaces.forEach((place) => {
      const position = new window.naver.maps.LatLng(place.lat, place.lng);

      const marker = new window.naver.maps.Marker({
        position,
        map: mapInstance,
        title: place.name,
        icon: {
          url: "/images/Katsu.png",
          size: new window.naver.maps.Size(35, 35),
          scaledSize: new window.naver.maps.Size(40, 40),
          anchor: new window.naver.maps.Point(20, 20),
        },
      });

      markersRef.current.push({
        id: place.id,
        marker: marker as unknown as NaverMarker,
      });

      window.naver.maps.Event.addListener(marker, "mouseover", () => {
        infoWindow.setContent(`
          <div style="padding: 12px; font-size: 14px; background-color: white; border-radius: 8px; box-shadow: 0 2px 6px rgba(0,0,0,0.3); pointer-events: none;">
            <strong style="font-size: 16px; display: block; margin-bottom: 4px;">${place.name}</strong>
            <p style="margin: 0;">${place.address}</p>
          </div>
        `);
        infoWindow.open(mapInstance, marker);
      });

      window.naver.maps.Event.addListener(marker, "mouseout", () => {
        infoWindow.close();
      });

      window.naver.maps.Event.addListener(marker, "click", () => {
        mapInstance.panTo(position);
        openSideBar(place.id);
      });
    });
  };

  if (!NAVER_CLIENT_ID) {
    return <div>NAVER 지도 클라이언트 ID가 설정되지 않았습니다.</div>;
  }

  return (
    <main className="relative w-screen h-screen m-0 p-0">
      <div className="absolute top-5 left-1/2 -translate-x-1/2 z-10 w-full px-4">
        <SearchBar />
      </div>

      <Script
        src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${NAVER_CLIENT_ID}`}
        strategy="afterInteractive"
        onLoad={initializeMap} // 첫 로드 시 `initializeMap` 호출
      />

      <div ref={mapElementRef} style={{ width: "100%", height: "100%" }} />
    </main>
  );
};

export default NaverMap;
