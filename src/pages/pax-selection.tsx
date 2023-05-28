import BookingHeader from "@/components/BookingHeader";
import { Button } from "@/components/ui/button";
import { useHotelDetailsStore } from "@/utils/zustand.store";
import { ArrowRight } from "lucide-react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Booking() {
  const [setGuests] = useHotelDetailsStore((state) => [state.setGuests]);
  const [people, setPeople] = useState(2);
  const [rooms, setRooms] = useState(1);
  const router = useRouter();

  const handleIncreasePeople = () => {
    if (people === 2) {
      setRooms(2);
    }
    if (people === 4) {
      setRooms(3);
    }
    setPeople((prev) => (prev === 6 ? prev : prev + 1));
  };

  const handleDecreasePeople = () => {
    if (people === 5) {
      setRooms(2);
    }
    if (people === 3) {
      setRooms(1);
    }
    setPeople((prev) => (prev < 2 ? 1 : prev - 1));
  };

  const handleClick = () => {
    setGuests(people);
    void router.push("/review-booking");
  };

  return (
    <>
      <Head>
        <title>Confirm your Booking - Flexistay</title>
        <meta name="description" content="Book Premium Hotels by Hour" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <BookingHeader title="Rooms and People" />
      <div className="container h-full">
        <h2 className="text-center text-lg font-semibold">
          Please Select No. of People and Rooms
        </h2>
        <div id="selection-pane" className="mt-8">
          <div
            id="people-selector"
            className="flex items-center justify-around"
          >
            <span>No. of Adults</span>
            <div className="border border-slate-100">
              <button
                onClick={handleIncreasePeople}
                className="bg-slate-100 py-2 px-4 text-brand-primary shadow"
              >
                +
              </button>
              <span className="px-3 py-2">{people}</span>
              <button
                onClick={handleDecreasePeople}
                className="bg-slate-100 py-2 px-4 text-brand-primary shadow"
              >
                -
              </button>
            </div>
          </div>
          <div
            id="room-selector"
            className="mt-5 flex items-center justify-around"
          >
            <span>No. of Rooms</span>
            <div className="border border-slate-100">
              <button className="bg-white py-2 px-4 text-white">+</button>
              <span className="px-3 py-2">{rooms}</span>
              <button className="bg-white py-2 px-4 text-white">-</button>
            </div>
          </div>
        </div>
        <div className="mt-10 w-full px-5">
          <Button type="submit" onClick={handleClick} className="w-full">
            Next <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </>
  );
}
