import { create } from "zustand";

interface ModalState {
  isOpen: boolean;
  selectedPlaceId: number | null;
  openSideBar: (placeId: number) => void;
  closeSideBar: () => void;
}

export const useSideBarState = create<ModalState>((set) => ({
  isOpen: false,
  selectedPlaceId: null,
  openSideBar: (placeId) => set({ isOpen: true, selectedPlaceId: placeId }),
  closeSideBar: () => set({ isOpen: false, selectedPlaceId: null }),
}));
