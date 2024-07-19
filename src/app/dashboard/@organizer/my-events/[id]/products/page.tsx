"use client";

import AddEventProductButton from "@/app/dashboard/@organizer/my-events/[id]/products/components/AddEventProductButton";
import { columns } from "@/app/dashboard/@organizer/my-events/[id]/products/components/column";
import { DataTable } from "@/app/dashboard/@organizer/my-events/[id]/products/components/data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useEventProduct from "@/hooks/useEventProduct";
import { use, useEffect, useState } from "react";

export default function page({ params }: { params: { id: string } }) {
  const { products, setQueryObj } = useEventProduct();
  const [pageNumber, setPageNumber] = useState<number>(1);

  useEffect(() => {
    setQueryObj({ EventId: Number(params.id) });
  }, [params.id]);

  const handlePageChange = (page: number) => {
    setPageNumber(page);
    setQueryObj({ EventId: Number(params.id), PageIndex: page });
  };

  const handleSearch = (value: string) => {
    console.log(value);
    setQueryObj({ EventId: Number(params.id), SearchName: value });
  };

  return (
    <div className="space-y-4 px-2 py-4">
      <div>
        <div className="flex items-center gap-2 justify-between">
          <Input
            placeholder="Search"
            className="w-96"
            onChange={(e) => {
              setTimeout(() => {
                handleSearch(e.target.value);
              }, 500);
            }}
          />
          <AddEventProductButton />
        </div>
      </div>
      <div>
        <DataTable columns={columns} data={products || []} />
        <div className="flex items-center gap-4 mt-4">
          <Button
            variant={"secondary"}
            onClick={() => {
              handlePageChange(pageNumber - 1);
            }}
          >
            Previous
          </Button>
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
    </div>
  );
}
