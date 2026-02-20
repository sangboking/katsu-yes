import { create } from "zustand";

interface ModalState {
  isCreateReviewModalOpen: boolean;
  openCreateReviewModal: () => void;
  closeCreateReviewModal: () => void;
}

export const useModalState = create<ModalState>((set) => ({
  isCreateReviewModalOpen: false,
  openCreateReviewModal: () => set({ isCreateReviewModalOpen: true }),
  closeCreateReviewModal: () => set({ isCreateReviewModalOpen: false }),
}));
