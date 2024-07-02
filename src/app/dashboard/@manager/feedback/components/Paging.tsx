import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import useEvent from "@/hooks/useEvent";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export default function Paging() {
  const { metaData } = useEvent();
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
