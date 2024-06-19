import React, { useEffect } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useFilterAndPaging } from "@/stores/manager/filter-paging";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Paging() {
  const { setQueryObj, queryObj, metaData } = useFilterAndPaging();
  const searchParams = useSearchParams();
  const pageNumberParam = searchParams.get("page-number");
  const { replace } = useRouter();

  const setPaginationToUrl = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page-number", pageNumber.toString());
    replace(`?${params.toString()}`);
  };

  return (
    metaData.totalPages > 1 && (
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <Button
              variant="ghost"
              onClick={() => {
                setPaginationToUrl(metaData.currentPage - 1);
              }}
            >
              <ChevronLeft />
            </Button>
          </PaginationItem>
          {Array.from({ length: metaData.totalPages }, (_, i) => (
            <PaginationItem key={i}>
              <Button
                variant={
                  i + 1 === Number(pageNumberParam ?? "1")
                    ? "secondary"
                    : "ghost"
                }
                onClick={() => {
                  setPaginationToUrl(i + 1);
                }}
              >
                {i + 1}
              </Button>
            </PaginationItem>
          ))}
          <PaginationItem>
            <Button
              variant="ghost"
              onClick={() => {
                setPaginationToUrl(metaData.currentPage + 1);
              }}
            >
              <ChevronRight />
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    )
  );
}
