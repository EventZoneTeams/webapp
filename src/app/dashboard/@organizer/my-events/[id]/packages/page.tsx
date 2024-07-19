"use client";

import React, { useEffect, useState } from "react";
import useEventPackage from "@/hooks/useEventPackage";
import { DataTable } from "@/app/dashboard/@organizer/my-events/[id]/packages/components/data-table";
import { columns } from "@/app/dashboard/@organizer/my-events/[id]/packages/components/columns";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import AddPackageButton from "@/app/dashboard/@organizer/my-events/[id]/packages/components/AddPackageButton";
import { Button } from "@/components/ui/button";

export default function page({ params }: { params: { id: string } }) {
  const { eventPackages, setQueryObj } = useEventPackage();
  const [pageNumber, setPageNumber] = useState<number>(1);

  useEffect(() => {
    setQueryObj({ EventId: Number(params.id) });
  }, [params]);

  const handlePageChange = (page: number) => {
    setPageNumber(page);
    setQueryObj({ EventId: Number(params.id), PageIndex: page });
  };

  return (
    <div className="space-y-4 px-2 py-4">
      <div className="flex gap-4 justify-between">
        <Input placeholder="Search" className="w-96" />
        <AddPackageButton params={params} />
      </div>
      <DataTable columns={columns} data={eventPackages || []} />
      <div className="flex items-center gap-4 mt-4">
        <Button
          variant={"secondary"}
          onClick={() => {
            handlePageChange(pageNumber - 1);
          }}
        >
          Previous
        </Button>
        <div>{pageNumber}</div>
        <Button
          variant={"secondary"}
          onClick={() => {
            handlePageChange(pageNumber + 1);
          }}
        >
          Previous
        </Button>
      </div>
    </div>
  );
}
