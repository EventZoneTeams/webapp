"use client";

import { DataTable } from "@/app/dashboard/@organizer/my-events/[id]/orders/components/data-table";
import { Input } from "@/components/ui/input";
import useEventOrder from "@/hooks/useEventOrder";
import React, { useEffect } from "react";
import { columns } from "./components/columns";

export default function page({ params }: { params: { id: string } }) {
  const { getEventOrderMutation } = useEventOrder();
  useEffect(() => {
    getEventOrderMutation.mutate(Number(params.id));
  }, []);
  return (
    <div className="space-y-4 px-2 py-4">
      <div className="flex gap-4 justify-between">
        <Input placeholder="Search" className="w-96" />
      </div>
      <DataTable
        columns={columns}
        data={getEventOrderMutation.data?.data || []}
      />
    </div>
  );
}
