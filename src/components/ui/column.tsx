import { type Hotel } from "@prisma/client";
import { type ColumnDef } from "@tanstack/react-table";

import { MoreHorizontal, ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

export type MyHotel = Omit<
  Hotel,
  "email" | "pincode" | "address2" | "facilities" | "hotelType"
>;

export const columns: ColumnDef<MyHotel>[] = [
  {
    id: "actions",
    cell: ({ row }) => {
      const hotel = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel className="font-sans">Actions</DropdownMenuLabel>
            <DropdownMenuItem>
              <Link href={`/edit/${hotel.id}`}>Edit Details</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
  {
    accessorKey: "name",
    header: () => <div className="w-32 text-center">Name</div>,
    cell: ({ row }) => {
      return <div className="w-32 text-center">{row.getValue("name")}</div>;
    },
  },
  {
    accessorKey: "phone",
    header: () => <div className="text-center">Phone</div>,
  },
  {
    accessorKey: "district",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        <span className="text-center">District</span>
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "address1",
    header: () => <div className="w-22 text-center">Address</div>,
    cell: ({ row }) => {
      return (
        <div className="w-32 text-center">
          {!row.getValue("address1") ? "-" : row.getValue("address1")}
        </div>
      );
    },
  },
  {
    accessorKey: "city",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        <span className="text-center">City</span>
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "fourHourPrice",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        <span className="w-20 text-center">4hr Price</span>
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const amount = new Intl.NumberFormat("en-IN", {
        maximumSignificantDigits: 3,
        style: "currency",
        currency: "INR",
      }).format(parseInt(row.getValue("fourHourPrice")));
      return (
        <div className="text-center">
          {!row.getValue("fourHourPrice") ? "-" : amount}
        </div>
      );
    },
  },
  {
    accessorKey: "eightHourPrice",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        <span className="w-20 text-center">8hr Price</span>
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const amount = new Intl.NumberFormat("en-IN", {
        maximumSignificantDigits: 3,
        style: "currency",
        currency: "INR",
      }).format(parseInt(row.getValue("eightHourPrice")));
      return (
        <div className="text-center">
          {!row.getValue("eightHourPrice") ? "-" : amount}
        </div>
      );
    },
  },
  {
    accessorKey: "generalPrice",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        <span className="w-20 text-center">AC Room Price</span>
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const amount = new Intl.NumberFormat("en-IN", {
        maximumSignificantDigits: 3,
        style: "currency",
        currency: "INR",
      }).format(parseInt(row.getValue("generalPrice")));
      return (
        <div className="text-center">
          {!row.getValue("generalPrice") ? "-" : amount}
        </div>
      );
    },
  },
  {
    accessorKey: "originalPrice",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        <span className="w-20 text-center">Striked AC Room Price</span>
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const amount = new Intl.NumberFormat("en-IN", {
        maximumSignificantDigits: 3,
        style: "currency",
        currency: "INR",
      }).format(parseInt(row.getValue("originalPrice")));
      return (
        <div className="text-center">
          {!row.getValue("originalPrice") ? "-" : amount}
        </div>
      );
    },
  },
  {
    accessorKey: "nonACPrice",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        <span className="w-20 text-center">Non AC Room Price</span>
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const amount = new Intl.NumberFormat("en-IN", {
        maximumSignificantDigits: 3,
        style: "currency",
        currency: "INR",
      }).format(parseInt(row.getValue("nonACPrice")));
      return (
        <div className="text-center">
          {!row.getValue("nonACPrice") ? "-" : amount}
        </div>
      );
    },
  },
  {
    accessorKey: "nonACOgPrice",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        <span className="w-24 text-center">Striked Non AC Room</span>
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const amount = new Intl.NumberFormat("en-IN", {
        maximumSignificantDigits: 3,
        style: "currency",
        currency: "INR",
      }).format(parseInt(row.getValue("nonACOgPrice")));
      return (
        <div className="text-center">
          {!row.getValue("nonACOgPrice") ? "-" : amount}
        </div>
      );
    },
  },
  // {
  //   accessorKey: "createdAt",
  //   header: "Created At",
  // },
  // {
  //   accessorKey: "updatedAt",
  //   header: () => <div className="w-32 text-center">Updated At</div>,
  //   cell: ({ row }) => {
  //     const val = new Date(row.getValue("updatedAt"));
  //     const formatted = format(val, "dd/MM/yyyy p");

  //     return <div className="w-36 text-center">{formatted}</div>;
  //   },
  // },
];
