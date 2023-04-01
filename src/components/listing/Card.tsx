import Image, { StaticImageData } from "next/image";
import { TfiLocationPin } from "react-icons/tfi";
import HotelRoom from "../../../public/cover-img.jpg";

interface Props {
  src?: StaticImageData;
  name: string;
  area: string;
  fourHourPrice: string;
  eightHourPrice: string;
  fullDayPrice: string;
  ogPrice: string;
}

export const Card = ({
  src,
  name,
  area,
  fourHourPrice,
  eightHourPrice,
  fullDayPrice,
  ogPrice,
}: Props) => {
  return (
    <div className="mt-5 h-[28rem] w-full rounded-lg shadow-xl">
      <div className="h-[62%] w-full">
        <Image
          width={390}
          height={190}
          src={src ? src : HotelRoom}
          alt="hotel"
          className="h-full w-full rounded-t-lg"
        />
      </div>
      <div id="body" className="p-3">
        <p className="text-lg font-semibold">{name}</p>
        <div className="mt-3 flex w-full items-center">
          <div className="flex flex-1 items-center">
            <TfiLocationPin />
            <p className="ml-1 text-slate-500">{area}</p>
          </div>
          <p className="justify-self-end line-through">₹{ogPrice}</p>
        </div>
        <hr className="my-3 h-[1px] bg-slate-400 px-6" />
        <div className="flex items-center pb-2">
          <div className="flex flex-col items-center justify-center">
            <p className="text-xs text-slate-500">4 hours</p>
            <button className="mr-3 rounded-md bg-brand-primary py-2 px-7 text-white shadow-lg">
              ₹{fourHourPrice}
            </button>
          </div>
          <div className="flex flex-col items-center justify-center">
            <p className="text-xs text-slate-500">8 hours</p>
            <button className="mr-3 rounded-md bg-brand-primary py-2 px-7 text-white shadow-lg">
              ₹{eightHourPrice}
            </button>
          </div>
          <div className="flex flex-col items-center justify-center">
            <p className="text-xs text-slate-500">24 hours</p>
            <button className="mr-3 rounded-md bg-brand-primary py-2 px-7 text-white shadow-lg">
              ₹{fullDayPrice}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
