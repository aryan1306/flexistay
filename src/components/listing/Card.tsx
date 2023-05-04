import Image, { type StaticImageData } from "next/image";
import { TfiLocationPin } from "react-icons/tfi";
import { TbAirConditioning } from "react-icons/tb";
import { IoRestaurantOutline } from "react-icons/io5";
import { AiOutlineWifi } from "react-icons/ai";
import { type MouseEvent } from "react";
import { HOURLY_HOTEL, RUPEE_SYMBOL } from "@/utils/constants";
import { toast } from "react-hot-toast";
import Link from "next/link";

interface Props {
  hotelId: string;
  src: StaticImageData | string;
  name: string;
  area: string;
  fourHourPrice: string | null;
  eightHourPrice: string | null;
  fullDayPrice: string;
  ogPrice: string;
  facilities: string[];
  hotelType: string;
}

export const Card = ({
  src,
  name,
  area,
  fourHourPrice,
  eightHourPrice,
  fullDayPrice,
  ogPrice,
  facilities,
  hotelId,
  hotelType,
}: Props) => {
  const renderIcons = (item: string) => {
    switch (item) {
      case "wifi":
        return <AiOutlineWifi />;
      case "AC":
        return <TbAirConditioning />;
      case "restaurant":
        return <IoRestaurantOutline />;
      default:
        return <></>;
    }
  };

  return (
    <div className="mt-5 w-full rounded-lg shadow-xl">
      <div className="h-[62%] w-full">
        <Image
          width={390}
          height={190}
          src={
            src
              ? src
              : "https://flexistay.blob.core.windows.net/flexistay-hotels/room2.webp"
          }
          alt="hotel"
          className="h-full max-h-56 w-full rounded-t-lg"
        />
      </div>
      <div id="body" className="p-3">
        <div className="flex items-center">
          <p className="grow text-lg font-semibold">{name}</p>
          <div className="flex items-center justify-center">
            {facilities.map(
              (item, index) =>
                index <= 2 && (
                  <div key={item} className="mx-1 p-1">
                    {renderIcons(item)}
                  </div>
                )
            )}
          </div>
        </div>
        <div className="mt-3 flex w-full items-center">
          <div className="flex flex-1 items-center">
            <TfiLocationPin />
            <p className="ml-1 text-slate-500">{area}</p>
          </div>
          {hotelType === HOURLY_HOTEL && (
            <p className="justify-self-end line-through">₹{ogPrice}</p>
          )}
        </div>
        {hotelType === HOURLY_HOTEL ? (
          <div className="mt-3 flex items-center justify-evenly">
            <div className="flex flex-col items-center">
              <span className="text-xs text-slate-500">4 hours</span>
              {/* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */}
              <p className="text-brand-primary">{`${RUPEE_SYMBOL}${fourHourPrice!}`}</p>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-xs text-slate-500">8 hours</span>
              {/* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */}
              <p className="text-brand-primary">{`${RUPEE_SYMBOL}${eightHourPrice!}`}</p>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-xs text-slate-500">24 hours</span>
              {/* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */}
              <p className="text-brand-primary">{`${RUPEE_SYMBOL}${fullDayPrice}`}</p>
            </div>
          </div>
        ) : (
          <div className="mt-3 flex items-center justify-end">
            <p className="text-xl font-semibold text-brand-primary">{`${RUPEE_SYMBOL}${fullDayPrice}`}</p>
            <p className="ml-1 justify-self-end line-through">₹{ogPrice}</p>
          </div>
        )}
        <hr className="my-3 h-[1px] w-full bg-slate-400 px-6" />
        <div className="flex w-full items-center pb-2">
          <Link href={`/listing/hotel/${hotelId}/24`} className="w-full">
            <button
              onClick={(_e: MouseEvent<HTMLButtonElement>) => {
                toast("Please wait...", {
                  position: "top-center",
                  style: { color: "#E26465" },
                });
              }}
              className="h-10 w-full self-center justify-self-center rounded-md bg-brand-primary text-white shadow-lg"
            >
              Check it out
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
