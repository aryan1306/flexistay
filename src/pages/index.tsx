import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

import CoverImg from "../../public/cover-img.jpg";

import { api } from "@/utils/api";
import { Navbar } from "@/components/Navbar";

const Home: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <Head>
        <title>Flexistay- Book Hotels by Hour 4, 8, 24 hour stays</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      {/* <div className="md:container container px-4 mx-auto ">
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
    </div> */}
      <div className="relative h-[35rem] w-full bg-red-400">
        <div className="absolute h-[35rem] w-[70vw] bg-gradient-to-r from-brand-primary via-brand-primary">
          <div className="p-10">
            <h2 className="ml-8 mb-5 mt-14 text-8xl font-bold text-white">
              Book Hotels by Hour
            </h2>
            <h2 className="mt-5 ml-8 mb-5 text-4xl font-semibold text-white">
              Check-in and Check-out anytime
            </h2>
            <h4 className="mt-5 ml-8 text-6xl font-semibold text-white">
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
    </>
  );
};

export default Home;