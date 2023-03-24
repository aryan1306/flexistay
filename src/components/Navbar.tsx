import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { RiMenu3Fill } from "react-icons/ri";

import logoPic from "../../public/logo.svg";

export const Navbar = () => {
  const [windowWidth, setWindowWidth] = useState(0);
  useEffect(() => {
    const width = window.innerWidth;
    setWindowWidth(width);
  }, [windowWidth]);
  return (
    <div className="bg-red flex h-20 w-full justify-between bg-brand-primary drop-shadow-md">
      <div className="ml-5 flex items-center">
        <Image
          src={logoPic as string}
          alt="logo"
          className="w-[24.3%] pb-1 md:w-[12.3%]"
        />
        <h2 className="mt-1 self-center text-4xl font-semibold text-white">
          FlexiStay
        </h2>
      </div>
      {windowWidth > 768 ? (
        <div className="mr-7 flex items-center justify-around space-x-4">
          <Link href="/about" className="text-white">
            About Us
          </Link>
          <Link href="/contact" className="text-white">
            Contact Us
          </Link>
          <Link href="/privacy-policy" className="text-white">
            Privacy Policy
          </Link>
          <Link href="/terms" className="text-white">
            Terms & Conditions
          </Link>
          <Link href="/cancellation-policy" className="pl-3 text-white">
            Cancellation/Refund Policy
          </Link>
        </div>
      ) : (
        <div className="mr-6 self-center">
          <RiMenu3Fill className="cursor-pointer text-3xl text-white" />
        </div>
      )}
    </div>
  );
};
