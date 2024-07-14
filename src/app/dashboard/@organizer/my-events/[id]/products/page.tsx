"use client";

import AddEventProductButton from "@/app/dashboard/@organizer/my-events/[id]/products/components/AddEventProductButton";
import { columns } from "@/app/dashboard/@organizer/my-events/[id]/products/components/column";
import { DataTable } from "@/app/dashboard/@organizer/my-events/[id]/products/components/data-table";
import { Input } from "@/components/ui/input";
import useEventProduct from "@/hooks/useEventProduct";
import { useEffect } from "react";

export default function page({ params }: { params: { id: string } }) {
  const { setQueryObj, getEventProductMutation, trigger } = useEventProduct();

  useEffect(() => {
    setQueryObj({ EventId: Number(params.id) });
  }, [trigger]);

  return (
    <div className="space-y-4 p-2">
      <div>
        <div className="flex items-center gap-2 justify-between">
          <Input placeholder="Search" className="w-96" />
          <AddEventProductButton />
        </div>
      </div>
      <div>
        <DataTable
          columns={columns}
          data={getEventProductMutation.data || []}
        />
      </div>
    </div>
  );
}
