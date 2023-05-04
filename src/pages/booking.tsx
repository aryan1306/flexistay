import BookingHeader from "@/components/BookingHeader";
import { useHotelDetailsStore } from "@/utils/zustand.store";

export default function Booking() {
  const [hotelId, hotelType] = useHotelDetailsStore((state) => [
    state.hotelId,
    state.hotelType,
  ]);
  return (
    <>
      <BookingHeader />
      <p>booking page</p>
      <pre>
        {hotelId}, {hotelType}
      </pre>
    </>
  );
}
