"use client";

import { DataTable } from "@/app/dashboard/@admin/users/components/data-table";
import useUser from "@/hooks/useUser";
import React from "react";
import { columns } from "./components/columns";

export default function page() {
  const { users, setQueryObj } = useUser();
  console.log(users);
  return (
    <div className="mt-4">
      <div>
        <DataTable columns={columns} data={users || []} />
      </div>
    </div>
  );
}
