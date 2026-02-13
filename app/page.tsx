'use client'

import Script from "next/script";
import { useRef } from "react";
import type { NaverMapInstance } from "@/types/naver";

const NAVER_CLIENT_ID = process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID;

const HOT_PLACES = [
  { id: 1, name: "강남역 다이소", lat: 37.498085, lng: 127.028001 },
  { id: 2, name: "강남 CGV", lat: 37.501552, lng: 127.026315 },
];

const Home = () => {
  const mapElementRef = useRef<HTMLDivElement | null>(null);

  if (!NAVER_CLIENT_ID) {
    return <div>NAVER 지도 클라이언트 ID가 설정되지 않았습니다.</div>;
  }

  const createMarkers = (map: NaverMapInstance) => {
    // 지도가 없으면 즉시 종료 (Early Return)
    if (!map) return;

    HOT_PLACES.forEach((place) => {
      new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(place.lat, place.lng),
        map,
        title: place.name,
        icon: {
          url: "/images/Katsu.png", // 아까 만든 돈까스 이미지 경로
          size: new window.naver.maps.Size(60, 60), // 보여줄 크기
          scaledSize: new window.naver.maps.Size(60, 60), // 이미지 리사이징
          anchor: new window.naver.maps.Point(20, 20), // 아이콘의 중심점을 좌표에 일치시킴
        },
      });
    });
  };

  const handleScriptLoad = () => {
    if (!mapElementRef.current) return;
    if (typeof window === "undefined") return;
    if (!window.naver || !window.naver.maps) return;

    const center = new window.naver.maps.LatLng(37.4979, 127.0276);

    const map = new window.naver.maps.Map(mapElementRef.current, {
      center,
      zoom: 15,
    });

    createMarkers(map);
  };

  return (
    <main
      style={{
        width: "100vw",
        height: "100vh",
        margin: 0,
        padding: 0,
      }}
    >
      <Script
        src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${NAVER_CLIENT_ID}`}
        strategy="afterInteractive"
        onLoad={handleScriptLoad}
      />
      <div
        ref={mapElementRef}
        style={{ width: "100%", height: "100%" }}
      />
    </main>
  );
};

export default Home;
