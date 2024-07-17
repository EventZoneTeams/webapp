"use client";

import React, { use, useEffect } from "react";
import useEvent from "@/hooks/useEvent";
import useAuth from "@/hooks/useAuth";
import EventsLoading from "@/components/Event/EventsLoading";
import NoEventFound from "@/components/Event/NoEventFound";
import Link from "next/link";
import EventCard from "@/components/Event/EventCard";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function page() {
  const { authUser } = useAuth();
  const { eventsMutation, queryObj, setQueryObj, metaData } = useEvent();
  const searchParams = useSearchParams();
  const pageNumber = Number(searchParams.get("page") || 1);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (authUser?.Id) {
      if (!Number.isNaN(pageNumber)) {
        const updatedQueryObj = {
          ...queryObj,
          UserId: authUser.Id,
          "page-number": pageNumber,
          "page-size": 8,
        };
        setQueryObj(updatedQueryObj);
        eventsMutation.mutate(updatedQueryObj);
      }
    }
  }, [authUser, pageNumber, pathname]);

  // useEffect(() => {
  //   eventsMutation.mutate(queryObj);
  // }, [queryObj]);

  const handlePageChange = (page: number) => {
    if (!Number.isNaN(pageNumber)) {
      const updatedQueryObj = {
        ...queryObj,
        "page-number": page,
      };
      setQueryObj(updatedQueryObj);
      const params = new URLSearchParams();
      params.set("page", page.toString());
      router.push(`/dashboard/my-events?${params.toString()}`);
    }
  };

  return (
    <div>
      <div className="w-full">
        {eventsMutation.isPending ? (
          <EventsLoading />
        ) : eventsMutation.data?.Data.length === 0 ? (
          <NoEventFound />
        ) : (
          <>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4 w-full p-4">
              {eventsMutation.data?.Data.map((event, index) => (
                <Link
                  key={index}
                  className=" flex items-center justify-center"
                  href={`/dashboard/my-events/${event.Id}`}
                >
                  <EventCard event={event} status />
                </Link>
              ))}
            </div>
            <div className="w-full ">
              <Pagination>
                <PaginationContent>
                  {pageNumber > 1 && (
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() => handlePageChange(pageNumber - 1)}
                      />
                    </PaginationItem>
                  )}
                  {metaData.totalPages > 0 &&
                    Array.from({ length: metaData.totalPages }).map(
                      (_, index) => (
                        <PaginationItem key={index}>
                          <PaginationLink
                            isActive={index + 1 === queryObj["page-number"]}
                            onClick={() => handlePageChange(index + 1)}
                          >
                            {index + 1}
                          </PaginationLink>
                        </PaginationItem>
                      )
                    )}
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  {metaData.totalPages !== Number(pageNumber) && (
                    <PaginationItem>
                      <PaginationNext
                        onClick={() => handlePageChange(pageNumber + 1)}
                      />
                    </PaginationItem>
                  )}
                </PaginationContent>
              </Pagination>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
