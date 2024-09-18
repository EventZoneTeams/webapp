import { GetEventsParams } from "@/types/api/event";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, FilterIcon } from "lucide-react";
import { format } from "date-fns";
import { EventCategory as EventCategoryType } from "@/types/event-category";
import { EventCategory } from "@/lib/api/event-category";

interface FilterProps {
  params: GetEventsParams | null;
  onFilter: (params: GetEventsParams) => void;
}

export default function Filter({ params, onFilter }: FilterProps) {
  const [eventCategories, setEventCategories] = useState<EventCategoryType[]>(
    [],
  );
  const [filters, setFilters] = useState<GetEventsParams>({
    SearchTerm: "",
    EventCategoryId: "",
    EventStartDate: undefined,
    EventEndDate: undefined,
    Status: undefined,
    PageNumber: 1,
    PageSize: 10,
    ...params, // Initialize with passed params if available
  });

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    onFilter(filters); // Notify parent whenever filters change
  }, [filters]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      SearchTerm: e.target.value,
    }));
  };

  const handleSelectChange = (
    key: keyof GetEventsParams,
    value: string | number | undefined,
  ) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: value,
    }));
  };

  const handleDateChange = (
    key: keyof GetEventsParams,
    date: Date | undefined,
  ) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: date,
    }));
  };

  const handleSearch = () => {
    onFilter(filters);
  };

  const handlePageChange = (direction: number) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      PageNumber: (prevFilters.PageNumber || 1) + direction,
    }));
  };

  useEffect(() => {
    EventCategory.getEventCategories().then((response) => {
      if (response.isSuccess && response.data) {
        setEventCategories(response.data);
      }
    });
  }, []);
  return (
    <div>
      <div className="space-y-4 rounded-xl border bg-background/50 p-4 shadow backdrop-blur-xl">
        <div className="flex items-center space-x-2">
          <Input
            name="SearchTerm"
            value={filters.SearchTerm || ""}
            onChange={handleInputChange}
            placeholder="Enter search term"
            className="flex-grow"
          />
          <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-[120px]">
                <FilterIcon className="mr-2 h-4 w-4" />
                Filters
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80" align={"end"}>
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Filters</h4>
                  <p className="text-sm text-muted-foreground">
                    Adjust the following filters to refine your search.
                  </p>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="EventCategoryId">Event Category</Label>
                  <Select
                    value={filters.EventCategoryId}
                    onValueChange={(value) =>
                      handleSelectChange("EventCategoryId", value)
                    }
                  >
                    <SelectTrigger id="EventCategoryId">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {eventCategories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label>Start Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={`w-full justify-start text-left font-normal ${
                          !filters.EventStartDate && "text-muted-foreground"
                        }`}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {filters.EventStartDate ? (
                          format(filters.EventStartDate, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={filters.EventStartDate}
                        onSelect={(date) =>
                          handleDateChange("EventStartDate", date)
                        }
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="grid gap-2">
                  <Label>End Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={`w-full justify-start text-left font-normal ${
                          !filters.EventEndDate && "text-muted-foreground"
                        }`}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {filters.EventEndDate ? (
                          format(filters.EventEndDate, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={filters.EventEndDate}
                        onSelect={(date) =>
                          handleDateChange("EventEndDate", date)
                        }
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <Button onClick={handleSearch}>Apply Filters</Button>
              </div>
            </PopoverContent>
          </Popover>
          <Button onClick={handleSearch}>Search</Button>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Label htmlFor="PageSize">Page Size:</Label>
            <Select
              value={filters.PageSize?.toString()}
              onValueChange={(value) =>
                handleSelectChange("PageSize", Number(value))
              }
            >
              <SelectTrigger id="PageSize" className="w-[70px]">
                <SelectValue placeholder="10" />
              </SelectTrigger>
              <SelectContent>
                {[10, 20, 50, 100].map((size) => (
                  <SelectItem key={size} value={size.toString()}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => handlePageChange(-1)}
              disabled={filters.PageNumber === 1}
            >
              &lt;
            </Button>
            <span>Page {filters.PageNumber}</span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => handlePageChange(1)}
            >
              &gt;
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
