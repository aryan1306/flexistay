import Image, { type StaticImageData } from "next/image";
import { TfiLocationPin } from "react-icons/tfi";
import { TbAirConditioning } from "react-icons/tb";
import { IoRestaurantOutline } from "react-icons/io5";
import { AiOutlineWifi } from "react-icons/ai";
import { type MouseEvent } from "react";
import { useRouter } from "next/router";
import { RUPEE_SYMBOL } from "@/utils/constants";
import { useHotelStore } from "@/utils/zustand.store";

interface Props {
  hotelId: string;
  src: StaticImageData | string;
  name: string;
  area: string;
  fourHourPrice: string;
  eightHourPrice: string;
  fullDayPrice: string;
  ogPrice: string;
  facilities: string[];
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
}: Props) => {
  const router = useRouter();
  const [setPrice] = useHotelStore((state) => [state.setPrice]);
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
    <div className="mt-5 h-[28rem] w-full rounded-lg shadow-xl">
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
          className="h-full w-full rounded-t-lg"
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
          <p className="justify-self-end line-through">₹{ogPrice}</p>
        </div>
        <hr className="my-3 h-[1px] w-full bg-slate-400 px-6" />
        <div className="flex w-full items-center pb-2">
          <div className="flex w-1/3 flex-col items-center justify-center px-1">
            <p className="text-xs text-slate-500">4 hours</p>
            <button
              onClick={(e: MouseEvent<HTMLButtonElement>) => {
                e.preventDefault();
                setPrice(fourHourPrice);
                // eslint-disable-next-line @typescript-eslint/no-floating-promises
                router.push(`hotel/${hotelId}/4`);
              }}
              className="h-10 w-full self-center justify-self-center rounded-md bg-brand-primary text-white shadow-lg"
            >
              {RUPEE_SYMBOL + fourHourPrice}
            </button>
          </div>
          <div className="flex w-1/3 flex-col items-center justify-center px-1">
            <p className="text-xs text-slate-500">8 hours</p>
            <button
              onClick={(e: MouseEvent<HTMLButtonElement>) => {
                e.preventDefault();
                setPrice(eightHourPrice);
                // eslint-disable-next-line @typescript-eslint/no-floating-promises
                router.push(`hotel/${hotelId}/8`);
              }}
              className="h-10 w-full self-center justify-self-center rounded-md bg-brand-primary text-white shadow-lg"
            >
              {RUPEE_SYMBOL + eightHourPrice}
            </button>
          </div>
          <div className="flex w-1/3 flex-col items-center justify-center px-1">
            <p className="text-xs text-slate-500">24 hours</p>
            <button
              onClick={(e: MouseEvent<HTMLButtonElement>) => {
                e.preventDefault();
                setPrice(fullDayPrice);
                // eslint-disable-next-line @typescript-eslint/no-floating-promises
                router.push(`hotel/${hotelId}/24`);
              }}
              className="h-10 w-full self-center justify-self-center rounded-md bg-brand-primary text-white shadow-lg"
            >
              {RUPEE_SYMBOL + fullDayPrice}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
