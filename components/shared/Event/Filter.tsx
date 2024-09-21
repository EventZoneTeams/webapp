"use client";

import { Input } from "@/components/ui/input";
import { EventCategory } from "@/lib/api/event-category";
import { EventCategory as EventCategoryType } from "@/types/event-category";
import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FilterIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { eventStatusConstances } from "@/constances/event";
import { DateTimePicker } from "@/components/input/DateTimePicker";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface FilterProps {
  children?: React.ReactNode;
  maxPage?: number;
}

export default function Filter(props: FilterProps) {
  const [categories, setCategories] = React.useState<EventCategoryType[]>();
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    EventCategory.get().then((response) => {
      if (response.isSuccess && response.data) {
        setCategories(response.data);
      }
    });
  }, []);

  const updateSearchParams = (updates: Record<string, string | undefined>) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (value !== undefined) {
        newSearchParams.set(key, value);
      } else {
        newSearchParams.delete(key);
      }
    });
    router.push(`${pathname}?${newSearchParams.toString()}`, { scroll: false });
  };

  const generatePageNumberLink = (pageNumber: number) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("PageNumber", pageNumber.toString());
    return `${pathname}?${newSearchParams.toString()}`;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateSearchParams({ SearchTerm: e.target.value });
  };

  const handleSelectChange = (key: string, value: string) => {
    updateSearchParams({ [key]: value });
  };

  const handleDateChange = (
    key: "EventStartDate" | "EventEndDate",
    value: Date | undefined,
  ) => {
    updateSearchParams({ [key]: value?.toISOString() });
  };

  const handlePageChange = (pageNumber: number) => {
    updateSearchParams({ PageNumber: pageNumber.toString() });
  };

  const handleClearFilter = () => {
    updateSearchParams({
      SearchTerm: undefined,
      EventCategoryId: undefined,
      Status: undefined,
      EventStartDate: undefined,
      EventEndDate: undefined,
      PageSize: undefined,
      PageNumber: undefined,
    });
  };

  const renderPaginationItems = () => {
    if (!props.maxPage) {
      return (
        <PaginationItem>
          <PaginationLink
            href={generatePageNumberLink(1)}
            isActive={true}
            onClick={() => handlePageChange(1)}
          >
            1
          </PaginationLink>
        </PaginationItem>
      );
    }

    const items = [];
    const currentPage = parseInt(searchParams.get("PageNumber") || "1", 10);

    // Always show first 3 pages
    for (let i = 1; i <= Math.min(3, props.maxPage); i++) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink
            href={generatePageNumberLink(i)}
            isActive={currentPage === i}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </PaginationLink>
        </PaginationItem>,
      );
    }

    // If maxPage > 5, add ellipsis and last page
    if (props.maxPage > 5) {
      items.push(
        <PaginationItem key="ellipsis">
          <PaginationEllipsis />
        </PaginationItem>,
      );
      items.push(
        <PaginationItem key={props.maxPage}>
          <PaginationLink
            href={generatePageNumberLink(props.maxPage)}
            isActive={currentPage === props.maxPage}
            onClick={() => handlePageChange(props.maxPage || 1)}
          >
            {props.maxPage}
          </PaginationLink>
        </PaginationItem>,
      );
    } else if (props.maxPage > 3) {
      // If 3 < maxPage <= 5, show all pages
      for (let i = 4; i <= props.maxPage; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              href={generatePageNumberLink(i)}
              isActive={currentPage === i}
              onClick={() => handlePageChange(i)}
            >
              {i}
            </PaginationLink>
          </PaginationItem>,
        );
      }
    }

    return items;
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Input
          type="text"
          placeholder="Search events"
          className="w-96"
          value={searchParams.get("SearchTerm") || ""}
          onChange={handleInputChange}
        />
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="flex w-36 items-center gap-2 bg-background/50"
            >
              <FilterIcon size={16} />
              Filter
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-background-alpha sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Filter events</DialogTitle>
              <DialogDescription>
                Filter events by category, status, and more.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-6">
              <div className="space-y-3">
                <Label>Category</Label>
                <Select
                  onValueChange={(value) =>
                    handleSelectChange("EventCategoryId", value)
                  }
                  value={searchParams.get("EventCategoryId") || ""}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select event category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {categories?.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.title}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label>Status</Label>
                <Select
                  value={searchParams.get("Status") || ""}
                  onValueChange={(value) => handleSelectChange("Status", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select event status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {eventStatusConstances.map((status) => (
                        <SelectItem
                          key={status.value}
                          value={status.value.toString()}
                        >
                          {status.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label>Time</Label>
                <div className="grid grid-cols-2 gap-4">
                  <DateTimePicker
                    placeholder="Start Date"
                    granularity="day"
                    value={
                      searchParams.get("EventStartDate")
                        ? new Date(searchParams.get("EventStartDate")!)
                        : undefined
                    }
                    onChange={(date) =>
                      handleDateChange("EventStartDate", date)
                    }
                    displayFormat={{ hour24: "dd/MM/yyyy" }}
                  />
                  <DateTimePicker
                    placeholder="End Date"
                    granularity="day"
                    value={
                      searchParams.get("EventEndDate")
                        ? new Date(searchParams.get("EventEndDate")!)
                        : undefined
                    }
                    onChange={(date) => handleDateChange("EventEndDate", date)}
                    displayFormat={{ hour24: "dd/MM/yyyy" }}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label>Page size</Label>
                <Select
                  value={searchParams.get("PageSize") || "10"}
                  onValueChange={(value) =>
                    handleSelectChange("PageSize", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select page size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="20">20</SelectItem>
                      <SelectItem value="30">30</SelectItem>
                      <SelectItem value="40">40</SelectItem>
                      <SelectItem value="50">50</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant={"destructive"}
                onClick={handleClearFilter}
              >
                Clear Filter
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className="min-h-96 py-6">{props.children}</div>
      <div className="flex items-start justify-start">
        <Pagination className="w-auto rounded-lg bg-background/50">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() =>
                  handlePageChange(
                    Math.max(
                      1,
                      parseInt(searchParams.get("PageNumber") || "1", 10) - 1,
                    ),
                  )
                }
              />
            </PaginationItem>

            {renderPaginationItems()}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={() =>
                  handlePageChange(
                    Math.min(
                      props.maxPage || 1,
                      parseInt(searchParams.get("PageNumber") || "1", 10) + 1,
                    ),
                  )
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
