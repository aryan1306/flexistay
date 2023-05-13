import { Navbar } from "@/components/Navbar";
import { DropDown } from "@/components/Dropdown";
import { CLASSIC_HOTEL, HOURLY_HOTEL } from "@/utils/constants";
import {
  TbClockEdit,
  TbCurrencyRupee,
  TbHotelService,
  TbCircleCheck,
  TbCircle,
} from "react-icons/tb";
import { Footer } from "@/components/landing/footer";
import { type MouseEvent } from "react";
import { Toaster } from "react-hot-toast";
import { RadioGroup } from "@headlessui/react";
import { DatePicker } from "@/components/ui/DatePicker";

interface Props {
  setter: (value: { name: string } | undefined) => void;
  value: { name: string } | undefined;
  list: { name: string }[];
  handleClick: (e: MouseEvent<HTMLButtonElement>) => void;
  hotelType: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setHotelType: any;
}

export const Landing = ({
  setter,
  value,
  list,
  handleClick,
  hotelType,
  setHotelType,
}: Props) => {
  return (
    <>
      <Navbar mobile={true} dropShadow={false} />
      <main className="">
        <div className="h-2/3 w-full bg-gradient-to-b from-brand-primary to-white">
          <h1 className="px-4 pt-10 text-center text-2xl font-bold text-white">
            Book Premium Hotels by Hour
          </h1>
          <h1 className="pt-5 text-center text-2xl font-bold text-white">
            At Affordable Prices
          </h1>
          <div className="mt-10 flex w-full flex-col items-center justify-center px-8">
            {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
            <RadioGroup value={hotelType} onChange={setHotelType}>
              <RadioGroup.Label className={"text-sm text-slate-50"}>
                Hotel Type
              </RadioGroup.Label>
              <div className="mt-1 mb-3 flex justify-start">
                <RadioGroup.Option
                  className={({ checked }) =>
                    ` rounded-md px-3 py-2 shadow-md ${
                      checked ? "bg-red-400" : "bg-white"
                    }`
                  }
                  value={CLASSIC_HOTEL}
                >
                  {({ checked }) => (
                    <div className="flex items-center justify-center">
                      <span className={` ${checked ? "text-white" : ""}`}>
                        All Day Hotels
                      </span>
                      {checked ? (
                        <TbCircleCheck className="ml-2 text-white" />
                      ) : (
                        <TbCircle className="ml-2" />
                      )}
                    </div>
                  )}
                </RadioGroup.Option>
                <RadioGroup.Option
                  className={({ checked }) =>
                    `ml-3  rounded-md px-3 py-2 shadow-md ${
                      checked ? "bg-red-400" : "bg-white"
                    }`
                  }
                  value={HOURLY_HOTEL}
                >
                  {({ checked }) => (
                    <div className="flex items-center justify-center">
                      <span className={` ${checked ? "text-white" : ""}`}>
                        Hourly Hotels
                      </span>
                      {checked ? (
                        <TbCircleCheck className="ml-2 text-white" />
                      ) : (
                        <TbCircle className="ml-2" />
                      )}
                    </div>
                  )}
                </RadioGroup.Option>
              </div>
            </RadioGroup>
            <DropDown setter={setter} value={value} list={list} mobile={true} />
            <DatePicker />
          </div>
          <div className="mt-10 flex justify-center">
            <button
              type="submit"
              onClick={handleClick}
              className="btn-brand-primary no-underline"
            >
              {`Search ${
                hotelType === CLASSIC_HOTEL ? "All-day Hotels" : "Hourly Hotels"
              }`}
            </button>
          </div>
          <p className="mt-6 text-center text-lg font-semibold text-brand-primary">
            Sign up to get upto 50% discount*
          </p>
        </div>
        <div className="mt-10">
          <h2 className="mb-5 mt-10 text-center text-2xl font-semibold text-brand-primary">
            Why Book Hotel By Hour?
          </h2>
          <div className="carousel-center carousel rounded-box mb-10 max-w-md space-x-4 bg-white p-4">
            <div className="carousel-item">
              <div className="flex flex-col items-center justify-center">
                <div className="flex h-28 w-28 items-center justify-center rounded-2xl border-2 border-brand-primary shadow-2xl">
                  <TbClockEdit className="text-8xl text-brand-primary" />
                </div>
                <p className="px-6 pt-5 text-center text-xl">
                  Choose your Check-in
                  <br />
                  and Check-out Time
                </p>
              </div>
            </div>
            <div className="carousel-item">
              <div className="flex flex-col items-center justify-center">
                <div className="flex h-28 w-28 items-center justify-center rounded-2xl border-2 border-brand-primary shadow-2xl">
                  <TbCurrencyRupee className="text-8xl text-brand-primary" />
                </div>
                <p className="px-6 pt-5 text-center text-xl">
                  Pay Less when you
                  <br />
                  book by hour
                </p>
              </div>
            </div>
            <div className="carousel-item">
              <div className="flex flex-col items-center justify-center">
                <div className="flex h-28 w-28 items-center justify-center rounded-2xl border-2 border-brand-primary shadow-2xl">
                  <TbHotelService className="text-8xl text-brand-primary" />
                </div>
                <p className="px-6 pt-5 text-center text-xl">
                  Pay at Hotel across website
                </p>
              </div>
            </div>
          </div>
        </div>
        <Footer mobile={true} />
        <Toaster />
      </main>
    </>
  );
};
