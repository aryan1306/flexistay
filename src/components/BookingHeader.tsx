import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import { IoCloseSharp } from "react-icons/io5";

export default function BookingHeader() {
  const router = useRouter();
  return (
    <div className="sticky mb-7 flex w-full items-center py-5 pl-5 shadow-xl">
      <IoCloseSharp
        role="button"
        onClick={() => {
          toast("Please wait", {
            position: "top-center",
            style: { color: "#E26465" },
          });
          void router.back();
        }}
        className="text-2xl"
      />
      <h1 className="ml-4 text-xl font-semibold text-brand-primary">
        Review your booking
      </h1>
    </div>
  );
}
