import Image from "next/image";
import { TfiLocationPin, TfiMapAlt } from "react-icons/tfi";
import { BiWater } from "react-icons/bi";
import { TbAirConditioning } from "react-icons/tb";
import { IoRestaurantOutline } from "react-icons/io5";
import { AiOutlineWifi } from "react-icons/ai";
import { SlScreenDesktop } from "react-icons/sl";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";
import { Navbar } from "@/components/Navbar";
import type { GetServerSidePropsContext, InferGetStaticPropsType } from "next";
import { Fragment, useCallback, useEffect, useState } from "react";
import { Transition, Dialog, RadioGroup } from "@headlessui/react";
import superjson from "superjson";
import { SignUpButton, useUser } from "@clerk/nextjs";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { appRouter } from "@/server/api/root";
import { prisma } from "@/server/db";
import { api } from "@/utils/api";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import Head from "next/head";
import { HOURLY_HOTEL, RUPEE_SYMBOL } from "@/utils/constants";
import { useHotelDetailsStore } from "@/utils/zustand.store";

const inter = Inter({ subsets: ["latin"] });

export const getStaticProps = async (
  context: GetServerSidePropsContext<{ id: string }>
) => {
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: { prisma },
    transformer: superjson,
  });
  const id = context.params?.id as string;
  await ssg.hotel.getById.prefetch({ id });
  return {
    props: {
      trpcState: ssg.dehydrate(),
      id,
    },
  };
};

export const getStaticPaths = () => {
  return { paths: [], fallback: "blocking" };
};

export default function Hotel(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { id } = props;
  const router = useRouter();
  const { hour: hours, hotelType: requestedHotelType } = router.query;
  const [isOpen, setIsOpen] = useState(false);
  const { isLoaded, isSignedIn } = useUser();
  const [setHotelId, setHotelType] = useHotelDetailsStore((state) => [
    state.setHotelId,
    state.setHotelType,
  ]);
  const { data, isLoading, isError } = api.hotel.getById.useQuery({ id });
  const [option, setOption] = useState<{
    price: string | null;
    hour: string | null;
  }>({ price: "", hour: "" });

  const renderCorrectPrice = useCallback(
    (hour: string) => {
      if (data) {
        switch (hour) {
          case "4":
            setOption({ price: data.fourHourPrice, hour: "4" });
          case "8":
            setOption({ price: data.eightHourPrice, hour: "8" });
          case "24":
            setOption({ price: data.generalPrice, hour: "24" });
          default:
            return "";
        }
      }
    },
    [data]
  );

  useEffect(() => {
    renderCorrectPrice(hours as string);
  }, [hours, renderCorrectPrice]);

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <h1>Error...</h1>;

  const renderIcons = (item: string, className: string) => {
    switch (item) {
      case "WIFI":
        return <AiOutlineWifi className={className} />;
      case "AC":
        return <TbAirConditioning className={className} />;
      case "RESTAURANT":
        return <IoRestaurantOutline className={className} />;
      case "HOT WATER":
        return <BiWater className={className} />;
      case "TV":
        return <SlScreenDesktop className={className} />;
      default:
        return <></>;
    }
  };

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  return (
    data && (
      <>
        <Head>
          <title>{data?.name} - Flexistay</title>
          <meta name="description" content="Generated by create next app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Navbar mobile={true} />
        <div className="mx-3">
          <div className="carousel-center carousel rounded-box mt-6 max-w-md space-x-4 bg-red-100 p-4 md:w-full">
            {/* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call */}
            {data?.images.map((img) => (
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
              <div
                key={img.id}
                className="carousel-item max-h-52 min-h-[13rem]"
              >
                <Image
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
                  src={img.url}
                  width={290}
                  height={190}
                  className="rounded-box max-h-52 min-h-[13rem]"
                  alt={data.name}
                />
              </div>
            ))}
          </div>
          <div className="mt-4 px-1">
            <h1 className="text-2xl font-semibold">{data?.name}</h1>
            <div className="mt-2 flex items-center">
              <TfiLocationPin />
              <p className="ml-1 text-slate-500">
                {data?.address1}, {data?.address2}, {data?.district}
              </p>
            </div>
            <div className="mt-1 flex items-center">
              <TfiMapAlt />
              <a
                href="https://maps.google.com"
                target="_blank"
                className="ml-1 hover:text-brand-primary hover:underline"
              >
                View on Maps
              </a>
            </div>
            <hr className="my-5 bg-slate-400" />
            <Transition show={isOpen} as={Fragment}>
              <Dialog as="div" className="relative z-10" onClose={closeModal}>
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                  <div className="flex min-h-full items-center justify-center p-4 text-center">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-out duration-300"
                      enterFrom="opacity-0 scale-95"
                      enterTo="opacity-100 scale-100"
                      leave="ease-in duration-200"
                      leaveFrom="opacity-100 scale-100"
                      leaveTo="opacity-0 scale-95"
                    >
                      <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                        <div className="mt-2">
                          <RadioGroup
                            defaultValue={{
                              price: data.generalPrice,
                              hour: "24",
                            }}
                            value={option}
                            onChange={setOption}
                          >
                            <RadioGroup.Label>
                              <span
                                className={
                                  "text-xl font-semibold" +
                                  " " +
                                  inter.className
                                }
                              >
                                Choose your slot
                              </span>
                            </RadioGroup.Label>
                            <RadioGroup.Option
                              className="mt-3 mb-1 w-full"
                              value={{ price: data.generalPrice, hour: "24" }}
                            >
                              {({ active }) => (
                                <p
                                  className={
                                    active
                                      ? `w-full rounded-lg bg-brand-primary py-1 pl-1 text-white ${inter.className}`
                                      : `ml-1 ${inter.className}`
                                  }
                                >
                                  24 hours
                                </p>
                              )}
                            </RadioGroup.Option>
                            <RadioGroup.Option
                              className="mb-1 w-full"
                              value={{ price: data.eightHourPrice, hour: "8" }}
                            >
                              {({ active }) => (
                                <p
                                  className={
                                    active
                                      ? `w-full rounded-lg bg-brand-primary py-1 pl-1 text-white ${inter.className}`
                                      : `ml-1 ${inter.className}`
                                  }
                                >
                                  8 hours
                                </p>
                              )}
                            </RadioGroup.Option>
                            <RadioGroup.Option
                              className="mb-1 w-full"
                              value={{ price: data.fourHourPrice, hour: "4" }}
                            >
                              {({ active }) => (
                                <p
                                  className={
                                    active
                                      ? `w-full rounded-lg bg-brand-primary py-1 pl-1 text-white ${inter.className}`
                                      : `ml-1 ${inter.className}`
                                  }
                                >
                                  4 hours
                                </p>
                              )}
                            </RadioGroup.Option>
                          </RadioGroup>
                        </div>
                      </Dialog.Panel>
                    </Transition.Child>
                  </div>
                </div>
              </Dialog>
            </Transition>
            <h1 className="text-xl font-semibold">Amenities</h1>
            <div className="my-4 grid grid-flow-row grid-cols-2 place-items-start">
              {data?.facilities.map((item) => (
                <div key={item} className="mb-2 flex items-center">
                  {renderIcons(item.toUpperCase(), "text-lg")}
                  <span className="ml-2 text-lg text-black">
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </span>
                </div>
              ))}
            </div>
            <hr className="my-5 bg-slate-400" />
          </div>
        </div>
        <div className="btm-nav btm-nav-lg rounded-t-md drop-shadow-2xl">
          <div>
            <span className="text-xs">
              {data.hotelType === HOURLY_HOTEL &&
              requestedHotelType === HOURLY_HOTEL
                ? option.hour && `${option.hour} hours`
                : ""}
            </span>
            <div className="flex items-center">
              <p className="text-xl font-bold">
                {data.hotelType === HOURLY_HOTEL &&
                requestedHotelType === HOURLY_HOTEL
                  ? option.price && `${RUPEE_SYMBOL}${option.price}`
                  : // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion, @typescript-eslint/no-non-null-assertion
                    `${RUPEE_SYMBOL}${data.generalPrice!.toString()}`}
              </p>
              <p className="ml-1 text-sm line-through">{`${RUPEE_SYMBOL}${data.originalPrice}`}</p>
            </div>
          </div>
          {data.hotelType === HOURLY_HOTEL &&
            requestedHotelType === HOURLY_HOTEL && (
              <span
                onClick={openModal}
                className="tracking-tighter text-brand-primary"
              >
                Change Slot
              </span>
            )}
          {isLoaded || isSignedIn ? (
            <div className="w-full">
              <button
                onClick={() => {
                  setHotelId(data.id);
                  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                  setHotelType(data.hotelType!);
                  void router.push("/booking");
                }}
                className="h-10 w-[85%] self-center justify-self-center rounded-md bg-brand-primary text-white shadow-lg disabled:bg-slate-500 disabled:text-slate-300 disabled:shadow-none"
              >
                Book Now
              </button>
            </div>
          ) : (
            <SignUpButton>
              <div className="w-full">
                <button className="h-10 w-[85%] self-center justify-self-center rounded-md bg-brand-primary text-white shadow-lg disabled:bg-slate-500 disabled:text-slate-300 disabled:shadow-none">
                  Sign Up and Book
                </button>
              </div>
            </SignUpButton>
          )}
        </div>
      </>
    )
  );
}
