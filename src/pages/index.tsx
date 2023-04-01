import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { addDays, setHours, setMinutes } from "date-fns";

import CoverImg from "../../public/cover-img.jpg";
import "react-datepicker/dist/react-datepicker.css";

import { Navbar } from "@/components/Navbar";
import { api } from "@/utils/api";
import { DropDown } from "@/components/Dropdown";
import { TbClockEdit, TbCurrencyRupee, TbHotelService } from "react-icons/tb";
import { Footer } from "@/components/landing/footer";
import { Landing } from "@/mobile/landing";

const cities = [{ name: "Bangalore" }, { name: "Delhi" }, { name: "Mumbai" }];
const date = new Date();

const Home: NextPage = () => {
  const data = api.hotel.getAllByCity.useQuery({ city: "Mumbai" });
  const [selected, setSelected] = useState(cities[0]);
  const [startDate, setStartDate] = useState(new Date());
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const width = window.innerWidth;
    setWindowWidth(width);
  }, [windowWidth]);

  return (
    <>
      <Head>
        <title>Flexistay- Book Hotels by Hour | 4, 8, 24 hours stays</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {windowWidth < 600 ? (
        <Landing
          setter={setSelected}
          value={selected}
          list={cities}
          startDate={startDate}
          setStartDate={setStartDate}
        />
      ) : (
        <>
          <Navbar />
          <main className="h-screen">
            <div className="relative h-[35rem] w-full bg-red-400">
              <div className="absolute h-[35rem] w-[70vw] bg-gradient-to-r from-brand-primary via-brand-primary">
                <div className="p-10">
                  <h2 className="hidden text-xs">
                    Book Hotels by Hour at Affordable Prices
                  </h2>
                  <TypeAnimation
                    sequence={[
                      "Book Hotels by Hour",
                      700,
                      "Book Premium Hotels By Hour",
                    ]}
                    cursor={false}
                    wrapper="h2"
                    className="ml-8 mb-5 mt-14 text-8xl font-bold text-white"
                  />
                  <h4 className="mt-10 ml-8 text-4xl font-semibold text-white">
                    At Affordable Prices | Check-in and Check-out anytime
                  </h4>
                  <h4 className="mt-5 ml-8 text-3xl font-semibold text-white">
                    Available at all major cities
                  </h4>
                </div>
              </div>
              <Image
                src={CoverImg}
                alt="room"
                className="object-fit h-[35rem] w-screen pl-[27rem]"
              />
            </div>
            <div className="-mt-7 flex w-full items-center justify-center">
              <div className="flex w-1/2 items-center justify-center">
                <DropDown setter={setSelected} value={selected} list={cities} />
                <div className="customDatePickerWidth w-1/2">
                  <DatePicker
                    wrapperClassName="h-20 w-full"
                    className="w-full"
                    customInput={
                      <input className="relative mt-[0.1rem] h-20 w-full cursor-pointer rounded-r-lg bg-white py-2 pl-3 pr-10 text-center shadow-md focus:outline-none focus-visible:ring-white sm:text-sm" />
                    }
                    minDate={new Date()}
                    maxDate={addDays(new Date(), 60)}
                    selected={startDate}
                    onChange={(date) => setStartDate(date!)}
                    showTimeSelect
                    // minTime={setHours(setMinutes(new Date(), 30), 20)}
                    minTime={
                      (date.getDate() < new Date().getDate() ||
                        date.getMonth() <= new Date().getMonth()) &&
                      date.getMinutes() > 30
                        ? setHours(
                            setMinutes(new Date(), 0),
                            date.getHours() + 1
                          )
                        : setHours(setMinutes(new Date(), 30), date.getHours())
                    }
                    maxTime={setHours(setMinutes(new Date(), 30), 23)}
                    dateFormat="MMMM d, yyyy"
                  />
                </div>
              </div>
            </div>
            <div className="mt-10 flex justify-center">
              <button className="btn-brand-primary">Search Hotels</button>
              <button className="btn-brand-outline ml-4">
                Book by Referral
              </button>
            </div>
            <div id="benefits" className="mt-48 mb-32 w-full">
              <h1 className="mb-16 text-center text-5xl font-semibold text-brand-primary">
                Why Book Hotels By Hour?
              </h1>
              <div className="w-full px-40">
                <div className="flex items-center">
                  <div className="flex h-28 w-28 items-center justify-center rounded-2xl border-2 border-brand-primary shadow-2xl">
                    <TbClockEdit className="text-8xl text-brand-primary" />
                  </div>
                  <h3 className="ml-10 text-4xl">
                    Choose your Check-in and Check-out Time
                  </h3>
                </div>
                <div className="my-6 flex items-center">
                  <div className="flex h-28 w-28 items-center justify-center rounded-2xl border-2 border-brand-primary shadow-2xl">
                    <TbCurrencyRupee className="text-8xl text-brand-primary" />
                  </div>
                  <h3 className="ml-10 text-4xl">
                    Pay Less when you book by hour
                  </h3>
                </div>
                <div className="flex items-center">
                  <div className="flex h-28 w-28 items-center justify-center rounded-2xl border-2 border-brand-primary shadow-2xl">
                    <TbHotelService className="text-8xl text-brand-primary" />
                  </div>
                  <h3 className="ml-10 text-4xl">
                    Pay at Hotel across website
                  </h3>
                </div>
              </div>
            </div>
            <Footer />
          </main>
        </>
      )}
    </>
  );
};

export default Home;
