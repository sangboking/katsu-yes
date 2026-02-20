import { useState } from "react";
import { LuChevronDown } from "react-icons/lu";

import { useKatsuPlaceDetail } from "@/lib/hook/useKatsuPlaceDetail";
import { useSideBarState } from "@/store/useSideBarState";

const PlaceDetailMenuList = () => {
  const { selectedPlaceId } = useSideBarState();
  const { data: placeDetail } = useKatsuPlaceDetail(selectedPlaceId);
  const [isExpanded, setIsExpanded] = useState(false);

  const visibleMenuItems =
    isExpanded || !placeDetail.menu_items
      ? placeDetail.menu_items
      : placeDetail.menu_items.slice(0, 5);

  return (
    <div>
      <h3 className="text-lg font-bold mb-3">메뉴</h3>
      {placeDetail.menu_items && placeDetail.menu_items.length > 0 ? (
        <>
          <ul className="space-y-2">
            {visibleMenuItems.map((item, index) => (
              <li key={index} className="flex justify-between">
                <span>{item.name}</span>
                <span>{item.price.toLocaleString()}원</span>
              </li>
            ))}
          </ul>
          {placeDetail.menu_items.length > 5 && !isExpanded && (
            <div className="mt-3 flex justify-center">
              <button
                onClick={() => setIsExpanded(true)}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100"
              >
                <LuChevronDown size={20} />
              </button>
            </div>
          )}
        </>
      ) : (
        <p>메뉴 정보가 없습니다.</p>
      )}
    </div>
  );
};

export default PlaceDetailMenuList;
