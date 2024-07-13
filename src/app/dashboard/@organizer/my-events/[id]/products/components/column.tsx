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
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export const columns: ColumnDef<EventProduct>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => {
      return <div>{row.original.id}</div>;
    },
  },
  {
    accessorKey: "productImages",
    header: "Image",
    cell: ({ row }) => {
      return (
        <Image
          src={row.original.productImages[0].imageUrl}
          width={80}
          height={45}
          alt={row.original.name}
          className="rounded-lg aspect-video object-cover"
        />
      );
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
      return (
        <Badge
          className={cn(
            row.original.isDeleted
              ? "bg-red-200 text-red-800 hover:bg-red-300"
              : "bg-green-200 text-green-800 hover:bg-green-300"
          )}
        >
          {row.original.isDeleted ? "Deactived" : "Actived"}
        </Badge>
      );
    },
  },
  // {
  //   id: "actions",
  //   header: "",
  //   cell: ({ row }) => {
  //     return (
  //       <DropdownMenu>
  //         <DropdownMenuTrigger asChild>
  //           <Button aria-haspopup="true" size="icon" variant="ghost">
  //             <MoreHorizontal className="h-4 w-4" />
  //             <span className="sr-only">Toggle menu</span>
  //           </Button>
  //         </DropdownMenuTrigger>
  //         <DropdownMenuContent
  //           align="end"
  //           className="mt-0 bg-secondary-background"
  //         >
  //           <DropdownMenuLabel>Actions</DropdownMenuLabel>
  //           <DropdownMenuItem>Edit</DropdownMenuItem>
  //           <DropdownMenuItem>Delete</DropdownMenuItem>
  //         </DropdownMenuContent>
  //       </DropdownMenu>
  //     );
  //   },
  //   enableSorting: false,
  //   enableHiding: false,
  // },
];
