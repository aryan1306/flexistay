import BookingHeader from "@/components/BookingHeader";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { columns } from "@/components/ui/column";
import { DataTable } from "@/components/ui/data-table";
import { TableLoader } from "@/components/ui/TableLoader";
import { api } from "@/utils/api";
import Head from "next/head";

export default function Console() {
  const { isLoading, data, error } = api.hotel.getAll.useQuery();
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-2xl text-brand-primary">Something went wrong</h1>
      </div>
    );
  }
  return (
    <>
      <Head>
        <title>Admin Console</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="h-full w-full">
        <BookingHeader title="Flexistay Admin" />
        <div className="container mx-auto w-full overflow-x-auto py-10">
          {isLoading ? (
            <TableLoader />
          ) : (
            <DataTable columns={columns} data={data} />
          )}
        </div>
      </div>
    </>
  );
}
