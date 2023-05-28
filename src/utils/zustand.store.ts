import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";

interface HotelDetailsState {
  hotelId: string;
  hotelType: string;
  hotelName: string;
  noOfGuests: number;
  setHotelId: (hotelId: string) => void;
  setHotelType: (hotelType: string) => void;
  setGuests: (noOfGuests: number) => void;
  setHotelName: (hotelName: string) => void;
}

interface SearchDateProps {
  date: string;
  setDate: (date: string) => void;
}

interface HotelAdminState {
  hotelId: string;
  setHotelId: (hotelId: string) => void;
}

//hotel id and type to review booking
export const useHotelDetailsStore = create<HotelDetailsState>()(
  devtools(
    persist(
      (set) => ({
        hotelId: "",
        hotelType: "",
        hotelName: "",
        noOfGuests: 2,
        setHotelId: (hotelId) => set({ hotelId }),
        setHotelType: (hotelType) => set({ hotelType }),
        setGuests: (noOfGuests) => set({ noOfGuests }),
        setHotelName: (hotelName) => set({ hotelName }),
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

export const useHotelAdminStore = create<HotelAdminState>()(
  devtools(
    persist(
      (set) => ({
        hotelId: "",
        setHotelId: (hotelId) => set({ hotelId }),
      }),
      {
        name: "z/HotelAdmin",
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  )
);
