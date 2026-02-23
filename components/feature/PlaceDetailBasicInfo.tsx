"use client";

import Image from "next/image";
import { useState, ReactNode } from "react";
import {
  LuMapPin,
  LuClock,
  LuPhone,
  LuChevronDown,
  LuChevronUp,
} from "react-icons/lu";

import CopyButton from "@/components/common/CopyButton";

import { useOpeningHours } from "@/lib/hook/useOpeningHours";
import { renderDaySchedule } from "@/lib/time";
import { useSideBarState } from "@/store/useSideBarState";
import { useKatsuPlaceDetail } from "@/lib/hook/useKatsuPlaceDetail";

interface InfoRowProps {
  icon: ReactNode;
  label: string;
  children: ReactNode;
  action?: ReactNode;
}

const InfoRow = ({ icon, label, children, action }: InfoRowProps) => (
  <div className="flex items-center py-2">
    <div className="w-8 flex-shrink-0 flex justify-center mr-3 text-gray-500">
      {icon}
    </div>
    <div className="flex-grow text-sm text-gray-900">
      <strong className="font-semibold sr-only">{label}</strong>
      <div>{children}</div>
    </div>
    {action && <div className="ml-3 flex-shrink-0">{action}</div>}
  </div>
);

const PlaceDetailBasicInfo = () => {
  const { selectedPlaceId } = useSideBarState();
  const { data: placeDetail } = useKatsuPlaceDetail(selectedPlaceId);
  const { sortedOpeningHours, currentStatus } = useOpeningHours(
    placeDetail?.opening_hours,
  );
  const [isOpeningHoursExpanded, setIsOpeningHoursExpanded] = useState(false);

  if (!placeDetail) {
    return <div>로딩 중...</div>;
  }

  const averageRating =
    placeDetail?.reviews && placeDetail.reviews.length > 0
      ? placeDetail.reviews.reduce((acc, review) => acc + review.rating, 0) /
        placeDetail.reviews.length
      : 0;

  return (
    <div>
      <div className="relative w-full h-[200px] flex-shrink-0">
        {placeDetail.banner_img ? (
          <Image
            src={placeDetail.banner_img}
            alt={placeDetail.name}
            fill
            style={{ objectFit: "cover" }}
            priority
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
            이미지 없음
          </div>
        )}
      </div>

      <div className="px-5 pt-5 pb-">
        <h2 className="mt-0 mb-2 text-2xl font-bold">{placeDetail.name}</h2>
        <div className="mb-2">
          <span className="text-yellow-400 text-lg">
            {"★".repeat(Math.round(averageRating))}
            {"☆".repeat(5 - Math.round(averageRating))}
          </span>
          <span className="ml-2 font-semibold">{averageRating.toFixed(1)}</span>
          <span className="ml-2 text-gray-500">
            ({placeDetail.reviews?.length}개의 리뷰)
          </span>
        </div>

        <div>
          <InfoRow
            icon={<LuMapPin size={18} />}
            label="주소"
            action={<CopyButton textToCopy={placeDetail.address} />}
          >
            {placeDetail.address}
          </InfoRow>

          <InfoRow
            icon={<LuPhone size={18} />}
            label="가게번호"
            action={
              placeDetail.phone && <CopyButton textToCopy={placeDetail.phone} />
            }
          >
            {placeDetail.phone || "정보 없음"}
          </InfoRow>

          <InfoRow
            icon={<LuClock size={18} />}
            label="영업시간"
            action={
              <button
                onClick={() =>
                  setIsOpeningHoursExpanded(!isOpeningHoursExpanded)
                }
                className="text-gray-600"
              >
                {isOpeningHoursExpanded ? (
                  <LuChevronUp size={18} />
                ) : (
                  <LuChevronDown size={18} />
                )}
              </button>
            }
          >
            {isOpeningHoursExpanded ? (
              sortedOpeningHours.map((daySchedule) => {
                const scheduleInfo = renderDaySchedule(daySchedule);
                return (
                  <div key={scheduleInfo.key} className="flex">
                    <span className="w-10 font-semibold">
                      {scheduleInfo.day}
                    </span>
                    <span>{scheduleInfo.scheduleText}</span>
                  </div>
                );
              })
            ) : (
              <div>
                <span
                  className={
                    currentStatus.status === "영업 중"
                      ? "text-green-600 font-semibold"
                      : ""
                  }
                >
                  {currentStatus.status}
                </span>
                {currentStatus.subText && (
                  <span className="text-gray-500">
                    {" "}
                    - {currentStatus.subText}
                  </span>
                )}
              </div>
            )}
          </InfoRow>
        </div>
      </div>
    </div>
  );
};

export default PlaceDetailBasicInfo;
