"use client";

import { DataTable } from "@/app/dashboard/@organizer/my-events/[id]/orders/components/data-table";
import { Input } from "@/components/ui/input";
import useEventOrder from "@/hooks/useEventOrder";
import React, { useEffect, useState } from "react";
import { columns } from "./components/columns";
import { Button } from "@/components/ui/button";

export default function page({ params }: { params: { id: string } }) {
  const { orders, setQueryObj } = useEventOrder();
  const [pageNumber, setPageNumber] = useState<number>(1);

  useEffect(() => {
    setQueryObj({ id: Number(params.id) });
  }, [params]);

  const handlePageChange = (page: number) => {
    setPageNumber(page);
    setQueryObj({ id: Number(params.id), "page-number": page });
  };

  const handleSearch = (value: string) => {
    setQueryObj({ id: Number(params.id), "search-term": value });
  };

  return (
    <div className="space-y-4 px-2 py-4">
      <div className="flex gap-4 justify-between">
        <Input
          placeholder="Search"
          className="w-96"
          onChange={(e) => {
            setTimeout(() => {
              handleSearch(e.target.value);
            }, 300);
          }}
        />
      </div>
      <DataTable columns={columns} data={orders || []} />
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
