import { Navbar } from "@/components/Navbar";
import { DropDown } from "@/components/Dropdown";
import ReactDatePicker from "react-datepicker";
import { addDays, setHours, setMinutes } from "date-fns";
import { TbClockEdit, TbCurrencyRupee, TbHotelService } from "react-icons/tb";
import { Footer } from "@/components/landing/footer";
import { useRouter } from "next/router";
import Link from "next/link";

interface Props {
  setter: (value: { name: string } | undefined) => void;
  value: { name: string } | undefined;
  list: { name: string }[];
  startDate: Date;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setStartDate: any;
}

const date = new Date();

export const Landing = ({
  setter,
  value,
  list,
  startDate,
  setStartDate,
}: Props) => {
  const router = useRouter();
  const handleClick = () => {
    void (async () => {
      await router.push("/listing");
    });
  };
  return (
    <>
      <Navbar mobile={true} dropShadow={false} />
      <main className="h-screen">
        <div className="h-2/3 w-full bg-gradient-to-b from-brand-primary to-white">
          <h4 className="pt-10 text-center text-2xl font-bold text-white">
            Book Premium Hotels by Hour
          </h4>
          <h4 className="pt-5 text-center text-2xl font-bold text-white">
            At Affordable Prices
          </h4>
          <div className="mt-4 flex w-full flex-col items-center justify-center px-8">
            <DropDown setter={setter} value={value} list={list} mobile={true} />
            <ReactDatePicker
              wrapperClassName="h-20 w-full"
              className="w-full"
              customInput={
                <input className="relative mt-5 h-20 w-full cursor-pointer rounded-lg bg-white py-2 pl-3 pr-10 shadow-md focus:outline-none focus-visible:ring-white sm:text-sm" />
              }
              minDate={new Date()}
              maxDate={addDays(new Date(), 60)}
              selected={startDate}
              // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
              onChange={(date) => setStartDate(date!)}
              showTimeSelect
              // minTime={setHours(setMinutes(new Date(), 30), 20)}
              minTime={
                (date.getDate() < new Date().getDate() ||
                  date.getMonth() <= new Date().getMonth()) &&
                date.getMinutes() > 30
                  ? setHours(setMinutes(new Date(), 0), date.getHours() + 1)
                  : setHours(setMinutes(new Date(), 30), date.getHours())
              }
              maxTime={setHours(setMinutes(new Date(), 30), 23)}
              dateFormat="MMMM d, yyyy"
            />
          </div>
          <div className="mt-10 flex justify-center">
            <Link href={"/listing"} className="btn-brand-primary no-underline">
              Search Hotels
            </Link>
            <button className="btn-brand-outline ml-4">Book by Referral</button>
          </div>
          <p className="mt-6 text-center text-lg font-semibold text-brand-primary">
            Sign up to get upto 50% discount*
          </p>
        </div>
        <h2 className="mb-5 text-center text-2xl font-semibold text-brand-primary">
          Why Book Hotel By Hour?
        </h2>
        <div className="carousel-center carousel rounded-box mb-10 max-w-md space-x-4 bg-white p-4">
          <div className="carousel-item">
            <div className="flex flex-col items-center justify-center">
              <div className="flex h-28 w-28 items-center justify-center rounded-2xl border-2 border-brand-primary shadow-2xl">
                <TbClockEdit className="text-8xl text-brand-primary" />
              </div>
              <h3 className="px-6 pt-5 text-center text-xl">
                Choose your Check-in
                <br />
                and Check-out Time
              </h3>
            </div>
          </div>
          <div className="carousel-item">
            <div className="flex flex-col items-center justify-center">
              <div className="flex h-28 w-28 items-center justify-center rounded-2xl border-2 border-brand-primary shadow-2xl">
                <TbCurrencyRupee className="text-8xl text-brand-primary" />
              </div>
              <h3 className="px-6 pt-5 text-center text-xl">
                Pay Less when you
                <br />
                book by hour
              </h3>
            </div>
          </div>
          <div className="carousel-item">
            <div className="flex flex-col items-center justify-center">
              <div className="flex h-28 w-28 items-center justify-center rounded-2xl border-2 border-brand-primary shadow-2xl">
                <TbHotelService className="text-8xl text-brand-primary" />
              </div>
              <h3 className="px-6 pt-5 text-center text-xl">
                Pay at Hotel across website
              </h3>
            </div>
          </div>
        </div>
        <Footer mobile={true} />
      </main>
    </>
  );
};
