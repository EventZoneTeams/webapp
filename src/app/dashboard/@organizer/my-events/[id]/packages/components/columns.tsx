"use client";

import { ColumnDef } from "@tanstack/react-table";
import { EventPackage } from "@/types/event-packages.";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export const columns: ColumnDef<EventPackage>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => {
      return <div>{row.original.id}</div>;
    },
  },
  {
    accessorKey: "imageUrl",
    header: "Image",
    cell: ({ row }) => {
      return (
        <Image
          src={row.original.thumbnailUrl}
          alt={row.original.description}
          width={80}
          height={45}
          className="rounded-lg aspect-video object-cover"
        />
      );
    },
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      return (
        <div className="line-clamp-2 max-w-96">{row.original.description}</div>
      );
    },
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      return (
        <div>
          {Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(row.original.totalPrice)}
        </div>
      );
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
];
