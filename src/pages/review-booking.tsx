import BookingHeader from "@/components/BookingHeader";
import { priceDisplay } from "@/utils/common";
import {
  useHotelDetailsStore,
  useSearchDateStore,
} from "@/utils/zustand.store";
import { useUser } from "@clerk/nextjs";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { format } from "date-fns";
import { CloudSun, Info, MapPin } from "lucide-react";
import Head from "next/head";
import Image from "next/image";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { api } from "@/utils/api";

export default function ReviewBooking() {
  const [date] = useSearchDateStore((state) => [state.date]);
  const [hotelName, noOfGuests, hotelId] = useHotelDetailsStore((state) => [
    state.hotelName,
    state.noOfGuests,
    state.hotelId,
  ]);
  const { user } = useUser();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data } = api.hotel.getHotelPriceListById.useQuery({ id: hotelId });

  const formattedDate = (date: string) => {
    return format(new Date(date), "EE, d LLL");
  };
  return (
    <>
      <Head>
        <title>Confirm your Booking - Flexistay</title>
        <meta name="description" content="Book Premium Hotels by Hour" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <BookingHeader title="Review your booking" />
      <div className="container h-full w-full">
        <h1 className="mb-4 text-2xl text-brand-primary">Stay at HSR Layout</h1>
        <div
          id="hotel-info"
          className=" mt-3 flex rounded-lg border border-slate-300"
        >
          <Image
            src={"https://flexistay.s3.ap-south-1.amazonaws.com/dev/room2.avif"}
            alt={hotelName}
            width={100}
            height={100}
            className="w-auto rounded-tl-lg rounded-bl-lg"
            loading="lazy"
          />
          <div className="p-2">
            <div className="flex items-center">
              <span className="text-center text-lg font-semibold">
                {hotelName}
              </span>
            </div>
            <div className="mt-2 flex items-center">
              <MapPin className="text-xs text-slate-500" />
              <span className="ml-1">View on Maps</span>
            </div>
          </div>
        </div>
        <div
          id="time-info"
          className=" mt-3 flex flex-col rounded-lg border border-slate-300 p-2"
        >
          <div className="flex justify-center">
            <div className="flex flex-col">
              <span className="font-semibold">
                {formattedDate(date ? date : new Date().toUTCString())}
              </span>
              <div>
                <span className="text-center text-sm tracking-tighter">
                  Check-in: 10:30am
                </span>
              </div>
            </div>
            <CloudSun className="mx-5 text-slate-500" />
            <div className="flex flex-col">
              <span className="font-semibold">
                {formattedDate(date ? date : new Date().toUTCString())}
              </span>
              <div>
                <span className="text-center text-sm tracking-tighter">
                  Check-out: 12:30pm
                </span>
              </div>
            </div>
          </div>
          <div className="mt-2 flex items-center justify-center">
            <div className="text-center text-sm">
              No. of Guests: <span>{noOfGuests},</span>
            </div>
            <div className="ml-2 text-center text-sm">
              No. of Rooms: <span>{1}</span>
            </div>
          </div>
        </div>
        <div
          id="guest-info"
          className=" mt-3 rounded-lg border border-slate-300 p-2"
        >
          <p className="mb-3 font-semibold">Primary Guest Info</p>
          <div>
            <span className="text-slate-600">Full Name:</span>&ensp;{" "}
            {user?.fullName}
          </div>
          <span>
            <span className="text-slate-600">Mobile:</span>&ensp;
            {user?.primaryPhoneNumber?.phoneNumber}
          </span>
        </div>
        <div
          id="guest-info"
          className=" mt-3 mb-5 rounded-lg border-2 border-dashed border-slate-300 px-3 py-2"
        >
          <h2 className="mb-2 text-xl font-semibold">Price Breakup</h2>
          <div className="grid grid-flow-row grid-cols-3 gap-y-1">
            <div className="col-span-2 text-slate-600">Base price</div>
            <div className="text-right">{priceDisplay("1000")}</div>
            <div className="col-span-2 text-sm text-slate-600">
              &ensp; X1 rooms
            </div>
            <div></div>
            <div className="col-span-2 text-slate-600">Service Charge</div>
            <div className="text-right">{priceDisplay("100")}</div>
            <div className="col-span-2 text-slate-600">Discount</div>
            <div className="text-right">- {priceDisplay("100")}</div>
            <div className="col-span-2 text-slate-600">
              GST (payable at hotel)
            </div>
            <div className="text-right">{priceDisplay("96")}</div>
            <hr className="col-span-3" />
            <Separator className="col-span-3" />
            <div className="col-span-2 text-slate-600">Total amount</div>
            <div className="text-right">{priceDisplay("1096")}</div>
            <hr className="col-span-3" />
            <Separator className="col-span-3" />
            <div className="col-span-2 flex text-slate-600">
              <span>Payable Now</span>{" "}
              <Popover>
                <PopoverTrigger asChild>
                  <Info className="rounded-full px-1" />
                </PopoverTrigger>
                <PopoverContent>
                  This is the booking amount to be paid at the website.
                </PopoverContent>
              </Popover>
            </div>
            <div className="text-right">{priceDisplay("200")}</div>
            <div className="col-span-2 flex text-slate-600">
              <span>Pay at hotel</span>{" "}
              <Popover>
                <PopoverTrigger asChild>
                  <Info className="rounded-full px-1" />
                </PopoverTrigger>
                <PopoverContent>
                  This is the remaining amount payable at hotel property during
                  check-in
                </PopoverContent>
              </Popover>
            </div>
            <div className="text-right">{priceDisplay("896")}</div>
          </div>
        </div>
      </div>
    </>
  );
}
