import { Menu, Transition } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { TbMenu } from "react-icons/tb";
import { RiUserAddLine, RiBriefcase3Line } from "react-icons/ri";
import { SlLogin } from "react-icons/sl";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

import logoPic from "../../public/logo.svg";

interface Props {
  mobile?: boolean;
  dropShadow?: boolean;
  isListingPage?: boolean;
}

export const Navbar = ({
  mobile = false,
  dropShadow = true,
  isListingPage = false,
}: Props) => {
  return (
    <div
      className={`bg-red flex h-20 w-full justify-between bg-brand-primary ${
        dropShadow ? "drop-shadow-md" : ""
      }`}
    >
      <div className="ml-5 flex grow items-center">
        <Image
          src={logoPic as string}
          alt="Flexistay"
          priority={true}
          className={`${mobile ? "w-[21.3%]" : "w-[24.3%]"} pb-1 md:w-[12.3%]`}
        />
        <Link href="/">
          <h2 className="mt-1 self-center text-4xl font-semibold text-white">
            Flexistay
          </h2>
        </Link>
      </div>
      {!isListingPage ? (
        <>
          <SignedIn>
            <div className="flex self-center pr-2">
              <UserButton />
              <Menu as="div" className="self-center px-2">
                <Menu.Button>
                  <TbMenu className="text-4xl text-white" />
                </Menu.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="px-1 py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            href="/bookings"
                            className={`${
                              active ? "bg-red-400 text-white" : "text-gray-900"
                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                          >
                            <RiBriefcase3Line className="mr-2 text-lg" />
                            My Bookings
                          </Link>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </SignedIn>
          <SignedOut>
            <Menu as="div" className="self-center pr-2">
              <Menu.Button>
                <TbMenu className="text-4xl text-white" />
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="px-1 py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <SignUpButton>
                          <button
                            className={`${
                              active ? "bg-red-400 text-white" : "text-gray-900"
                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                          >
                            <RiUserAddLine className="mr-2 text-lg" />
                            Sign Up
                          </button>
                        </SignUpButton>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <SignInButton>
                          <button
                            className={`${
                              active ? "bg-red-400 text-white" : "text-gray-900"
                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                          >
                            <SlLogin className="mr-2 text-lg" />
                            Login
                          </button>
                        </SignInButton>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </SignedOut>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};
