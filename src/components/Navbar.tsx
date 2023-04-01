import Image from "next/image";
import { useEffect, useState } from "react";

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
    </div>
  );
};
