"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { EventOrder } from "@/types/event-order";
import { ColumnDef } from "@tanstack/react-table";
import { useEffect } from "react";

export const columns: ColumnDef<EventOrder>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "userId",
    header: "User",
    cell: ({ row }) => {
      return <div>{row.original.userId}</div>;
    },
  },
  {
    accessorKey: "totalAmount",
    header: "Total Amount",
    cell: ({ row }) => {
      return (
        <div>
          {Intl.NumberFormat("vi-Vn", {
            style: "currency",
            currency: "VND",
          }).format(row.original.totalAmount)}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return (
        <Badge
          className={cn(
            "text-xs",
            row.original.status === "PENDING" &&
              "bg-yellow-200 text-yellow-800",
            row.original.status === "PAID" && "bg-green-200 text-green-800",
            row.original.status === "CANCELLED" && "bg-red-200 text-red-800"
          )}
        >
          {row.original.status}
        </Badge>
      );
    },
  },
];
