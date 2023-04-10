import { Footer } from "@/components/landing/footer";
import { Navbar } from "@/components/Navbar";
import Image from "next/image";
import { TbBulb, TbHeartHandshake } from "react-icons/tb";
import { RiHandCoinLine } from "react-icons/ri";

import Logo from "../../public/logo.svg";

export default function About() {
  return (
    <div className="h-screen w-screen">
      <Navbar mobile={true} />
      <div className="mx-6 mt-6 mb-24">
        <h1 className="text-center text-4xl font-bold text-brand-primary">
          About Us
        </h1>
        <div className="flex items-center">
          <p className="px-8 text-xl leading-relaxed">
            There are several hotel booking websites available in the market,
            but not all of them provide the convenience of 24/7 check-in and
            check-out. We offer this flexibility in stay and hence coined the
            name <b>&quot;Flexistay&quot;</b>, allowing customers to arrive and
            leave the hotel at any time they prefer, without being restricted by
            traditional check-in and check-out times and{" "}
            <b>&quot;Pay at Hotel&quot;</b> facility across the site. Flexistay
            is designed for travelers who have unpredictable schedules or want
            to make the most out of their trip without worrying about timing or
            compromise on quality of stay. By providing this service, we are
            setting a new standard in the hospitality industry, making it easier
            for customers to plan their trips and enjoy their stay at handpicked
            premium properties at affordable prices.
          </p>
          <Image
            src={Logo as string}
            width={350}
            height={350}
            alt="flexistay"
            className="hidden md:block"
          />
        </div>
        <h2 className=" mt-8 text-center text-3xl font-semibold md:mt-12">
          Our Values
        </h2>
        <div
          id="cards"
          className="mt-8 flex flex-col items-center justify-center md:flex-row"
        >
          <div
            id="innov-card"
            className="mb-8 flex flex-col items-center justify-center px-9 md:mb-0"
          >
            <div className="flex h-28 w-28 items-center justify-center rounded-2xl border-2 border-brand-primary shadow-2xl">
              <TbBulb className="text-8xl text-brand-primary" />
            </div>
            <h3 className="px-6 pt-5 text-center text-xl font-semibold text-brand-primary">
              Innovation
            </h3>
          </div>
          <div
            id="customer-card"
            className="mb-8 flex flex-col  items-center justify-around md:mb-0"
          >
            <div className="flex h-28 w-28 items-center justify-center rounded-2xl border-2 border-brand-primary shadow-2xl">
              <TbHeartHandshake className="text-8xl text-brand-primary" />
            </div>
            <h3 className="px-6 pt-5 text-center text-xl font-semibold text-brand-primary">
              Customer Satisfaction
            </h3>
          </div>
          <div
            id="customer-card"
            className="flex flex-col items-center justify-center px-9"
          >
            <div className="flex h-28 w-28 items-center justify-center rounded-2xl border-2 border-brand-primary shadow-2xl">
              <RiHandCoinLine className="text-8xl text-brand-primary" />
            </div>
            <h3 className="px-6 pt-5 text-center text-xl font-semibold text-brand-primary">
              Convenience
            </h3>
          </div>
        </div>
        <p className="mt-8 px-8 text-xl leading-relaxed">
          Flexistay provides a platform for customers to check in and check out
          anytime and prioritizes flexibility, convenience, and customer
          satisfaction. We understand that the traditional check-in and
          check-out times of hotels may not suit everyone&apos;s schedule, so we
          prioritize your needs by offering a service that is accessible 24/7.
          Additionally, the company values transparency and clear communication
          to ensure that customers have all the necessary information to plan
          their stay. We also prioritize security and privacy to ensure that our
          customers&apos; personal and financial information is kept safe.
          Overall, Flexistay values innovation, customer-centricity, and
          convenience, making it a top choice for travelers looking for a
          hassle-free booking experience.
        </p>
      </div>
      <Footer />
    </div>
  );
}
