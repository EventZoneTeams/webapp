"use client";

import { Badge } from "@/components/ui/badge";
import useEvent from "@/hooks/useEvent";
import useUser from "@/hooks/useUser";
import { cn } from "@/lib/utils";
import { EventOrder } from "@/types/event-order";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { useEffect, useMemo } from "react";

export const columns: ColumnDef<EventOrder>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "userId",
    header: "User",
    cell: ({ row }) => {
      const { getUserByIdMutation } = useUser();

      useEffect(() => {
        getUserByIdMutation.mutate(row.original.userId);
      }, [row.original.userId]);

      const user = useMemo(
        () => getUserByIdMutation.data?.data,
        [getUserByIdMutation.data]
      );
      return (
        <div className="px-4 py-2 bg-background flex gap-2 rounded-md items-center w-72">
          <div>
            <Image
              src={
                user?.Image ||
                `https://avatar.iran.liara.run/public/boy?username=${user?.FullName}`
              }
              alt={user?.FullName || "User Avatar"}
              width={40}
              height={40}
              className="rounded-full"
            />
          </div>
          <div>
            <div className="font-semibold line-clamp-1">{user?.FullName}</div>
            <div className="line-clamp-1 text-gray-500">{user?.Email}</div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "eventId",
    header: "Event",
    cell: ({ row }) => {
      const { getEventByIdMutation } = useEvent();

      useEffect(() => {
        getEventByIdMutation.mutate(row.original.eventId);
      }, []);

      const event = useMemo(
        () => getEventByIdMutation.data,
        [getEventByIdMutation.data]
      );
      return <div>{event?.Name}</div>;
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
