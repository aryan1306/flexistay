import * as React from "react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function DatePicker() {
  const today = new Date();
  const [selectedDay, setSelectedDay] = React.useState<Date | undefined>(today);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={
            "relative mt-5 h-20 w-full cursor-pointer rounded-lg bg-white py-2 pl-3 pr-10 shadow-md focus:outline-none focus-visible:ring-white sm:text-sm"
          }
        >
          {selectedDay ? (
            format(selectedDay, "PPP")
          ) : (
            <span className="block truncate text-lg">
              {format(new Date(), "PPP")}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={selectedDay as Date}
          onSelect={setSelectedDay}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
