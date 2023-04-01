import { Card } from "@/components/listing/Card";
import { Navbar } from "@/components/Navbar";
import { RiSortDesc } from "react-icons/ri";
import Room from "../../public/room.webp";
import Room2 from "../../public/room2.webp";

export const MobileListing = () => {
  return (
    <>
      <Navbar mobile={true} />
      <main className="h-screen w-full">
        <div id="sort-and-filter" className="sticky mb-5 h-14 shadow-md">
          <div className="flex h-full items-center justify-center text-lg">
            <RiSortDesc /> <p className="ml-2">Sort and Filter</p>
          </div>
          <div className="mx-3">
            <Card
              name="Hotel Crystal Palace"
              area="Kormangla"
              fourHourPrice="1500"
              eightHourPrice="3000"
              fullDayPrice="4000"
              ogPrice="5000"
            />
            <Card
              src={Room}
              name="Hotel Royal Blue"
              area="Hesaraghatta"
              fourHourPrice="1500"
              eightHourPrice="2000"
              fullDayPrice="3000"
              ogPrice="4000"
            />
            <Card
              src={Room2}
              name="The Monarch Hotel"
              area="Brigade Road"
              fourHourPrice="1600"
              eightHourPrice="2500"
              fullDayPrice="4000"
              ogPrice="4500"
            />
          </div>
        </div>
      </main>
    </>
  );
};
