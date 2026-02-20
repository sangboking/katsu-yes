'use client'

import Image from 'next/image';
import { useState } from 'react';

import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import CopyButton from '@/components/common/CopyButton';

import { useKatsuPlaceDetail } from '@/lib/hook/useKatsuPlaceDetail';
import { renderDaySchedule } from '@/lib/time';
import { useCreateReview } from '@/lib/hook/useCreatePlaceReview';
import { useOpeningHours } from '@/lib/hook/useOpeningHours';


const PlaceDetailSideBarContent = ({selectedPlaceId}: {selectedPlaceId: number}) => {
  const { data: placeDetail } = useKatsuPlaceDetail(selectedPlaceId);
  const { mutate: createReview } = useCreateReview(selectedPlaceId as number);
  const { sortedOpeningHours, todayOpeningHours } = useOpeningHours(placeDetail?.opening_hours);
  const [isOpeningHoursExpanded, setIsOpeningHoursExpanded] = useState(false);
  const [nickname, setNickname] = useState('');
  const [rating, setRating] = useState<number | null>(null);
  const [reviewText, setReviewText] = useState('');

  const handleCreateReview = () => {
    createReview(
      {
        nickname,
        rating,
        reviewText,
      },
      {
        onSuccess: () => {
          setNickname('');
          setRating(null);
          setReviewText('');
        },
      },
    );
  };

  const averageRating =
    placeDetail?.reviews && placeDetail.reviews.length > 0
      ? placeDetail.reviews.reduce((acc, review) => acc + review.rating, 0) / placeDetail.reviews.length
      : 0;

  return (
   <>
      <div className="relative w-full h-[200px] flex-shrink-0">
        {placeDetail.banner_img ? (
          <Image
            src={placeDetail.banner_img}
            alt={placeDetail.name}
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
            이미지 없음
          </div>
        )}
      </div>
      
      <div className="p-5">
        <h2 className="mt-0 mb-2.5 text-xl font-bold">{placeDetail.name}</h2>
        <div className="mb-2.5">
          <strong className="font-semibold">별점:</strong>
          <span className="text-yellow-400">
            {'★'.repeat(Math.round(averageRating))}
            {'☆'.repeat(5 - Math.round(averageRating))}
          </span>
          <span className="ml-2">({averageRating.toFixed(1)})</span>
        </div>

        <div className="mb-2.5 flex items-center">
          <strong className="font-semibold mr-2">주소:</strong>
          <span>{placeDetail.address}</span>
          <CopyButton textToCopy={placeDetail.address} />
        </div>

        <div className="mb-2.5">
          <div className="flex justify-between items-center">
            <strong className="font-semibold">영업시간:</strong>
            <button
              onClick={() => setIsOpeningHoursExpanded(!isOpeningHoursExpanded)}
              className="text-gray-600"
            >
              {isOpeningHoursExpanded ? '▲' : '▼'}
            </button>
          </div>
          {isOpeningHoursExpanded
            ? sortedOpeningHours.map((daySchedule) => {
                const scheduleInfo = renderDaySchedule(daySchedule);
                return (
                  <div key={scheduleInfo.key} className="flex">
                    <span className="w-8 font-semibold">{scheduleInfo.day}</span>
                    <span>{scheduleInfo.scheduleText}</span>
                  </div>
                );
              })
            : todayOpeningHours &&
              (() => {
                const scheduleInfo = renderDaySchedule(todayOpeningHours);
                return (
                  <div className="flex">
                    <span className="w-8 font-semibold">{scheduleInfo.day}</span>
                    <span>{scheduleInfo.scheduleText}</span>
                  </div>
                );
              })()}
        </div>

        <div className="mb-5 flex items-center">
          <strong className="font-semibold mr-2">가게번호:</strong>
          <span>{placeDetail.phone || '정보 없음'}</span>
          <CopyButton textToCopy={placeDetail.phone || ''} />
        </div>

        <hr className="my-5 border-gray-200" />

        <div>
          <h3 className="text-lg font-bold mb-3">메뉴</h3>
          {placeDetail.menu_items && placeDetail.menu_items.length > 0 ? (
            <ul className="space-y-2">
              {placeDetail.menu_items.map((item, index) => (
                <li key={index} className="flex justify-between">
                  <span>{item.name}</span>
                  <span>{item.price.toLocaleString()}원</span>
                </li>
              ))}
            </ul>
          ) : (
            <p>메뉴 정보가 없습니다.</p>
          )}
        </div>

        <hr className="my-5 border-gray-200" />

        <div>
          <h3 className="text-lg font-bold mb-3">리뷰</h3>
          {placeDetail.reviews && placeDetail.reviews.length > 0 ? (
            <ul className="space-y-4">
              {placeDetail.reviews.map((review) => (
                <li key={review.id} className="border-b pb-4">
                  <div className="flex items-center mb-1">
                    <strong className="mr-2">{review.nickname}</strong>
                    <span className="text-yellow-400">{'★'.repeat(review.rating)}</span>
                  </div>
                  <p className="text-gray-700 mb-1">{review.review_text}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(review.created_at).toLocaleDateString()}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p>아직 작성된 리뷰가 없습니다.</p>
          )}
        </div>

        <hr className="my-5 border-gray-200" />

        <div>
          <h3 className="text-lg font-bold mb-3">리뷰 작성</h3>
          <div className="space-y-4">
            <Input
              type="text"
              placeholder="닉네임을 작성해주세요."
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />

            <div className="flex items-center">
              <strong className="mr-3">평점:</strong>
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    className={`w-8 h-8 rounded-full border ${
                      rating === star
                        ? 'bg-yellow-400 border-yellow-400 text-white'
                        : 'border-gray-300'
                    }`}
                  >
                    {star}
                  </button>
                ))}
              </div>
            </div>

            <Input
              as="textarea"
              placeholder="리뷰를 작성해주세요."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              rows={4}
            />

            <Button onClick={handleCreateReview}>
              리뷰 등록
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default PlaceDetailSideBarContent