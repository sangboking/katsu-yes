import { create } from "zustand";

interface ModalState {
  isOpen: boolean;
  selectedPlaceId: number | null;
  openModal: (placeId: number) => void;
  closeModal: () => void;
}

export const useModalState = create<ModalState>((set) => ({
  isOpen: false,
  selectedPlaceId: null,
  openModal: (placeId) => set({ isOpen: true, selectedPlaceId: placeId }),
  closeModal: () => set({ isOpen: false, selectedPlaceId: null }),
}));
