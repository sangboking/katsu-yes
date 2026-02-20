"use client";

import PlaceDetailBasicInfo from "@/components/feature/PlaceDetailBasicInfo";
import PlaceDetailMenuList from "@/components/feature/PlaceDetailMenuList";
import PlaceDetailReviewList from "@/components/feature/PlaceDetailReviewList";

import { useSideBarState } from "@/store/useSideBarState";

const PlaceDetailSideBarContent = () => {
  const { selectedPlaceId } = useSideBarState();

  return (
    <div>
      <PlaceDetailBasicInfo key={selectedPlaceId} />

      <hr className="border-t-8 border-gray-100" />

      <div className="p-5">
        <PlaceDetailMenuList key={selectedPlaceId} />
      </div>

      <hr className="border-t-8 border-gray-100" />

      <div className="p-3">
        <PlaceDetailReviewList />
      </div>
    </div>
  );
};

export default PlaceDetailSideBarContent;
