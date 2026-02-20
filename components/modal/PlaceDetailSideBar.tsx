"use client";

import { Suspense } from "react";

import PlaceDetailSideBarSkeleton from "@/components/skeleton/PlaceDetailSideBarSkeleton";
import PlaceDetailSideBarContent from "@/components/feature/PlaceDetailSideBarContent";

import { useSideBarState } from "@/store/useSideBarState";

const PlaceDetailSideBar = () => {
  const { isOpen, selectedPlaceId, closeSideBar } = useSideBarState();

  if (!isOpen || !selectedPlaceId) return null;

  return (
    <div className="fixed top-0 left-0 w-[390px] h-screen bg-white shadow-lg z-[1000] flex flex-col overflow-y-auto overflow-x-hidden scrollbar-gutter-stable">
      <button
        onClick={closeSideBar}
        className="absolute top-2 right-2 z-10 flex h-8 w-8 items-center justify-center rounded-md bg-white bg-opacity-80 text-2xl text-gray-700 hover:bg-opacity-100 cursor-pointer"
      >
        &times;
      </button>

      <Suspense fallback={<PlaceDetailSideBarSkeleton />}>
        <PlaceDetailSideBarContent />
      </Suspense>
    </div>
  );
};

export default PlaceDetailSideBar;
