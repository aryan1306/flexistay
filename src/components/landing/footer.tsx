import Image from "next/image";
import Link from "next/link";
import logoPic from "../../../public/logo.svg";

export const Footer = () => {
  return (
    <footer className="footer bg-brand-primary p-10 text-white">
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
      <div>
        <span className="footer-title">Company</span>
        <Link href="/about-us" className="link-hover link">
          About us
        </Link>
        <Link href="/contact" className="link-hover link">
          Contact
        </Link>
      </div>
      <div>
        <span className="footer-title">Legal</span>
        <Link href="/terms" className="link-hover link">
          Terms of use
        </Link>
        <Link href="/privacy-policy" className="link-hover link">
          Privacy policy
        </Link>
        <Link href="/refund-policy" className="link-hover link">
          Cancellation/Refund Policy
        </Link>
      </div>
    </footer>
  );
};
