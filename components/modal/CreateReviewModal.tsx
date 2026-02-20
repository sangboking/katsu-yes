"use client";

import { useState } from "react";

import Modal from "@/components/common/Modal";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";

import { useModalState } from "@/store/useModalState";
import { useSideBarState } from "@/store/useSideBarState";
import { useCreateReview } from "@/lib/hook/useCreatePlaceReview";

const CreateReviewModal = () => {
  const { isCreateReviewModalOpen, closeCreateReviewModal } = useModalState();
  const { selectedPlaceId } = useSideBarState();
  const { mutate: createReview } = useCreateReview(selectedPlaceId as number);

  const [nickname, setNickname] = useState("");
  const [rating, setRating] = useState<number | null>(null);
  const [reviewText, setReviewText] = useState("");

  const handleCreateReview = () => {
    createReview(
      {
        nickname,
        rating,
        reviewText,
      },
      {
        onSuccess: () => {
          setNickname("");
          setRating(null);
          setReviewText("");
          closeCreateReviewModal();
        },
      },
    );
  };

  return (
    <Modal isOpen={isCreateReviewModalOpen} onClose={closeCreateReviewModal}>
      <div className="p-6">
        <h3 className="text-lg font-bold mb-4">리뷰 작성</h3>
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
                      ? "bg-yellow-400 border-yellow-400 text-white"
                      : "border-gray-300"
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
        </div>
        <div className="flex justify-end gap-2 mt-6">
          <Button
            onClick={closeCreateReviewModal}
            className="bg-gray-200 text-gray-700 hover:bg-gray-300"
          >
            취소
          </Button>
          <Button onClick={handleCreateReview}>리뷰 등록</Button>
        </div>
      </div>
    </Modal>
  );
};

export default CreateReviewModal;
