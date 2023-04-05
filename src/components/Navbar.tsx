import Image from "next/image";

import logoPic from "../../public/logo.svg";

interface Props {
  mobile?: boolean;
  dropShadow?: boolean;
}

export const Navbar = ({ mobile = false, dropShadow = true }: Props) => {
  return (
    <div
      className={`bg-red flex h-20 w-full justify-between bg-brand-primary ${
        dropShadow ? "drop-shadow-md" : ""
      }`}
    >
      <div className="ml-5 flex items-center">
        <Image
          src={logoPic as string}
          alt="logo"
          className={`${mobile ? "w-[21.3%]" : "w-[24.3%]"} pb-1 md:w-[12.3%]`}
        />
        <h2 className="mt-1 self-center text-4xl font-semibold text-white">
          Flexistay
        </h2>
      </div>
    </div>
  );
};
