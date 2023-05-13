import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";

interface HotelDetailsState {
  hotelId: string;
  hotelType: string;
  setHotelId: (hotelId: string) => void;
  setHotelType: (hotelType: string) => void;
}

interface SearchDateProps {
  date: string;
  setDate: (date: string) => void;
}

//hotel id and type to review booking
export const useHotelDetailsStore = create<HotelDetailsState>()(
  devtools(
    persist(
      (set) => ({
        hotelId: "",
        hotelType: "",
        setHotelId: (hotelId) => set({ hotelId }),
        setHotelType: (hotelType) => set({ hotelType }),
      }),
      {
        name: "z/hotelDetails",
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  )
);
export const useSearchDateStore = create<SearchDateProps>()(
  devtools(
    persist(
      (set) => ({
        date: "",
        setDate: (date) => set({ date }),
      }),
      {
        name: "z/SearchDate",
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  )
);
