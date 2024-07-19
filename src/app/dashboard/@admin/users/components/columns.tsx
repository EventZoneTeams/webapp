"use client";

import { User } from "@/types/authuser";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import Image from "next/image";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "Id",
    header: "ID",
  },
  {
    accessorKey: "Image",
    header: "Image",
    cell: ({ row }) => {
      return (
        <Image
          src={row.original.Image}
          alt="user"
          className="w-10 h-10 rounded-full"
          width={50}
          height={50}
        />
      );
    },
  },
  {
    accessorKey: "Email",
    header: "Email",
  },
  {
    accessorKey: "FullName",
    header: "Full Name",
  },
  {
    accessorKey: "Dob",
    header: "Date of Birth",
    cell: ({ row }) => {
      return <div>{format(row.original.Dob, "PP")}</div>;
    },
  },
  {
    accessorKey: "University",
    header: "University",
  },
  {
    accessorKey: "Gender",
    header: "Gender",
  },
  {
    accessorKey: "RoleName",
    header: "Role",
  },
];
