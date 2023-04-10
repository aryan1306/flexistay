import { create } from "zustand";

interface HotelState {
  price: string;
  hours: string;
  setPrice: (price: string) => void;
  setHours: (hours: string) => void;
}
// hotel price and hours store
export const useHotelStore = create<HotelState>()((set) => ({
  price: "",
  hours: "",
  setPrice: (price) => set({ price }),
  setHours: (hours) => set({ hours }),
}));
