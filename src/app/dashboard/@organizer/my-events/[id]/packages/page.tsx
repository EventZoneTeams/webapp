"use client";

import React, { useEffect } from "react";
import useEventPackage from "@/hooks/useEventPackage";
import { DataTable } from "@/app/dashboard/@organizer/my-events/[id]/packages/components/data-table";
import { columns } from "@/app/dashboard/@organizer/my-events/[id]/packages/components/columns";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import AddPackageButton from "@/app/dashboard/@organizer/my-events/[id]/packages/components/AddPackageButton";

export default function page({ params }: { params: { id: string } }) {
  const { getEventPackagesMutation, trigger } = useEventPackage();

  useEffect(() => {
    getEventPackagesMutation.mutate({
      EventId: Number(params.id),
      PageSize: 10,
      PageIndex: 1,
    });
  }, [trigger]);

  return (
    <div className="space-y-4 px-2 py-4">
      <div className="flex gap-4 justify-between">
        <Input placeholder="Search" className="w-96" />
        <AddPackageButton params={params} />
      </div>
      <DataTable columns={columns} data={getEventPackagesMutation.data || []} />
    </div>
  );
}
