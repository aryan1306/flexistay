import { Card } from "@/components/listing/Card";
import { Navbar } from "@/components/Navbar";
import type { Images, Hotel } from "@prisma/client";
import { RiSortDesc } from "react-icons/ri";
import { Toaster } from "react-hot-toast";
import { CLASSIC_HOTEL, HOURLY_HOTEL } from "@/utils/constants";

interface Props {
  data:
    | (Hotel & {
        images: Images[];
      })[]
    | undefined;
  hotelType: string;
}

export const MobileListing = ({ data, hotelType }: Props) => {
  console.log({ hotelType });
  return (
    <>
      <Navbar mobile={true} />
      <main className="h-screen w-full">
        <div id="sort-and-filter" className="sticky mb-5 h-14 shadow-md">
          <div className="flex h-full items-center justify-center text-lg">
            <RiSortDesc /> <p className="ml-2">Sort and Filter</p>
          </div>
          <div className="mx-3">
            {data
              ?.filter((item) => {
                return hotelType === item.hotelType;
              })
              .map((item) => (
                <Card
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-unsafe-member-access
                  src={item.images[0]!.url}
                  key={item.id}
                  name={item.name}
                  area={item.district}
                  fourHourPrice={item.fourHourPrice}
                  eightHourPrice={item.eightHourPrice}
                  fullDayPrice={item.generalPrice}
                  ogPrice={item.originalPrice}
                  facilities={item.facilities}
                  hotelId={item.id}
                  hotelType={item.hotelType!}
                />
              ))}
          </div>
        </div>
        <Toaster />
      </main>
    </>
  );
};
