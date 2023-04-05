import { Card } from "@/components/listing/Card";
import { Navbar } from "@/components/Navbar";
import { type Hotel } from "@prisma/client";
import { RiSortDesc } from "react-icons/ri";

interface Props {
  data: Hotel[] | undefined;
}

export const MobileListing = ({ data }: Props) => {
  return (
    <>
      <Navbar mobile={true} />
      <main className="h-screen w-full">
        <div id="sort-and-filter" className="sticky mb-5 h-14 shadow-md">
          <div className="flex h-full items-center justify-center text-lg">
            <RiSortDesc /> <p className="ml-2">Sort and Filter</p>
          </div>
          <div className="mx-3">
            {data?.map((item) => (
              <Card
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-unsafe-member-access
                src={item.images[0]!}
                key={item.id}
                name={item.name}
                area={item.district}
                fourHourPrice={item.fourHourPrice}
                eightHourPrice={item.eightHourPrice}
                fullDayPrice={item.generalPrice}
                ogPrice={item.originalPrice}
                facilities={item.facilities}
                hotelId={item.id}
              />
            ))}
          </div>
        </div>
      </main>
    </>
  );
};
