"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { EventProduct } from "@/types/event-product";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { IoMdMore } from "react-icons/io";
import { LogOut, MoreHorizontal, Pencil, Trash } from "lucide-react";

export const columns: ColumnDef<EventProduct>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => {
      return <div>{row.original.id}</div>;
    },
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      return <div>{row.original.name}</div>;
    },
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      return (
        <div className="line-clamp-2 max-w-96">
          {row.original.description} Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Facilis sed enim beatae obcaecati est magnam culpa
          iste molestiae amet cum, atque quis, odio natus eos voluptatum, soluta
          ex. Porro, impedit.
        </div>
      );
    },
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      return (
        <div>
          {Intl.NumberFormat("vn-Vi", {
            style: "currency",
            currency: "VND",
          }).format(row.original.price)}
        </div>
      );
    },
    enableSorting: true,
  },
  {
    accessorKey: "quantityInStock",
    header: "Quantity in Stock",
    cell: ({ row }) => {
      return <div>{row.original.quantityInStock}</div>;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      return <div>{format(row.original.createdAt, "Pp")}</div>;
    },
  },
  {
    accessorKey: "isDeleted",
    header: "Is Deleted",
    cell: ({ row }) => {
      return <div>{row.original.isDeleted ? "Yes" : "No"}</div>;
    },
  },
  {
    id: "actions",
    header: "",
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-haspopup="true" size="icon" variant="ghost">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
];
