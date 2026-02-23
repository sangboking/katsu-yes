"use client";

import useCurrentUser from "@/lib/hook/useClientGetUser";
import Button from "@/components/common/Button";
import LoginRequiredModal from "@/components/modal/LoginRequiredModal";

import { useKatsuPlaceReviews } from "@/lib/hook/useKatsuPlaceReviews";
import { useModalState } from "@/store/useModalState";
import { useSideBarState } from "@/store/useSideBarState";

const PlaceDetailReviewList = () => {
  const { selectedPlaceId } = useSideBarState();
  const {
    openCreateReviewModal,
    isLoginRequiredModalOpen,
    openLoginRequiredModal,
    closeLoginRequiredModal,
  } = useModalState();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useKatsuPlaceReviews(selectedPlaceId);
  const { data: currentUser } = useCurrentUser();

  const reviews = data?.pages.flatMap((page) => page) ?? [];

  const handleClickWriteReview = () => {
    if (!currentUser) {
      openLoginRequiredModal();
      return;
    }

    openCreateReviewModal();
  };

  return (
    <div className="py-2">
      <LoginRequiredModal
        isOpen={isLoginRequiredModalOpen}
        onClose={closeLoginRequiredModal}
      />
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-bold">
          <span>리뷰</span>
          <span className="ml-2 text-gray-400">{reviews.length ?? 0}</span>
        </h3>
        <button
          onClick={handleClickWriteReview}
          className="flex items-center gap-1 rounded-full bg-sky-100 px-3 py-1.5 text-sm font-semibold text-sky-600 hover:bg-sky-200"
        >
          <span>리뷰 작성</span>
        </button>
      </div>

      {reviews && reviews.length > 0 ? (
        <ul>
          {reviews.map((review, index) => {
            return (
              <li key={review.id}>
                {index > 0 && <hr className="my-4 border-gray-100 -mx-5" />}
                <div className="flex items-center mb-1">
                  <strong className="mr-2">
                    {review.profiles?.nickname ?? "익명"}
                  </strong>
                  <span className="text-yellow-400">
                    {"★".repeat(review.rating)}
                  </span>
                </div>
                <p className="text-gray-900 mb-1">{review.review_text}</p>
                <p className="text-xs text-gray-500">
                  {new Date(review.created_at).toLocaleDateString()}
                </p>
              </li>
            );
          })}
        </ul>
      ) : (
        <p>아직 작성된 리뷰가 없습니다.</p>
      )}

      {hasNextPage && (
        <div className="mt-4">
          <Button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="w-full"
          >
            {isFetchingNextPage ? "로딩 중..." : "리뷰 더보기"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default PlaceDetailReviewList;
