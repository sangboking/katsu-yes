"use client";

import Script from "next/script";
import { useEffect, useRef } from "react";

import SearchBar from "@/components/common/SearchBar";

import type { NaverMapInstance } from "@/types/naver";
import type { Place } from "@/lib/hook/useKatsuPlaces";
import { useSideBarState } from "@/store/useSideBarState";
import { useMapState } from "@/store/useMapState";

const NAVER_CLIENT_ID = process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID;

const Home = ({ katsuPlaces }: { katsuPlaces: Place[] }) => {
  const mapElementRef = useRef<HTMLDivElement | null>(null);
  const markersRef = useRef<{ id: number; marker: naver.maps.Marker }[]>([]);
  const { openSideBar, selectedPlaceId } = useSideBarState();
  const { setMap } = useMapState();

  useEffect(() => {
    if (markersRef.current.length === 0 || !window.naver) return;

    markersRef.current.forEach(({ id, marker }) => {
      const animation =
        id === selectedPlaceId ? window.naver.maps.Animation.BOUNCE : null;
      marker.setAnimation(animation);
    });
  }, [selectedPlaceId]);

  if (!NAVER_CLIENT_ID) {
    return <div>NAVER 지도 클라이언트 ID가 설정되지 않았습니다.</div>;
  }

  const createMarkers = (map: NaverMapInstance) => {
    if (!map) return;

    const infoWindow = new window.naver.maps.InfoWindow({
      content: "",
      borderWidth: 0,
      disableAutoPan: true,
      backgroundColor: "transparent",
      anchorSize: new window.naver.maps.Size(0, 0),
      pixelOffset: new window.naver.maps.Point(0, -5),
    });

    katsuPlaces.forEach((place) => {
      const marker = new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(place.lat, place.lng),
        map,
        title: place.name,
        icon: {
          url: "/images/Katsu.png",
          size: new window.naver.maps.Size(35, 35),
          scaledSize: new window.naver.maps.Size(40, 40),
          anchor: new window.naver.maps.Point(20, 20),
        },
      });

      markersRef.current.push({ id: place.id, marker });

      window.naver.maps.Event.addListener(marker, "mouseover", () => {
        infoWindow.setContent(`
          <div style="
            padding: 12px;
            font-size: 14px;
            background-color: white;
            border-radius: 8px;
            box-shadow: 0 2px 6px rgba(0,0,0,0.3);
            pointer-events: none;
          ">
            <strong style="font-size: 16px; display: block; margin-bottom: 4px;">${place.name}</strong>
            <p style="margin: 0;">${place.address}</p>
          </div>
        `);
        infoWindow.open(map, marker);
      });

      window.naver.maps.Event.addListener(marker, "mouseout", () => {
        infoWindow.close();
      });

      window.naver.maps.Event.addListener(marker, "click", () => {
        openSideBar(place.id);
      });
    });
  };

  const handleScriptLoad = () => {
    if (typeof window === "undefined" || !mapElementRef.current) return;
    if (!window.naver || !window.naver.maps) return;

    if (useMapState.getState().map) {
      return;
    }

    const center = new window.naver.maps.LatLng(37.5493287, 126.9136246);

    const map = new window.naver.maps.Map(mapElementRef.current, {
      center,
      zoom: 15,
      mapDataControl: false,
    });

    setMap(map);

    markersRef.current = [];
    createMarkers(map);
  };

  return (
    <main className="relative w-screen h-screen m-0 p-0">
      <div className="absolute top-5 left-1/2 -translate-x-1/2 z-10 w-full px-4">
        <SearchBar />
      </div>

      <Script
        src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${NAVER_CLIENT_ID}`}
        strategy="afterInteractive"
        onLoad={handleScriptLoad}
      />

      <div ref={mapElementRef} style={{ width: "100%", height: "100%" }} />
    </main>
  );
};

export default Home;
