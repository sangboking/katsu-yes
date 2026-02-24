import { create } from "zustand";

interface ModalState {
  isCreateReviewModalOpen: boolean;
  openCreateReviewModal: () => void;
  closeCreateReviewModal: () => void;

  isLoginRequiredModalOpen: boolean;
  openLoginRequiredModal: () => void;
  closeLoginRequiredModal: () => void;

  isProfileModalOpen: boolean;
  openProfileModal: () => void;
  closeProfileModal: () => void;
}

export const useModalState = create<ModalState>((set) => ({
  isCreateReviewModalOpen: false,
  openCreateReviewModal: () => set({ isCreateReviewModalOpen: true }),
  closeCreateReviewModal: () => set({ isCreateReviewModalOpen: false }),

  isLoginRequiredModalOpen: false,
  openLoginRequiredModal: () => set({ isLoginRequiredModalOpen: true }),
  closeLoginRequiredModal: () => set({ isLoginRequiredModalOpen: false }),

  isProfileModalOpen: false,
  openProfileModal: () => set({ isProfileModalOpen: true }),
  closeProfileModal: () => set({ isProfileModalOpen: false }),
}));
