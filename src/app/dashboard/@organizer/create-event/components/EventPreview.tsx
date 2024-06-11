"use client";

import { useCreateEventStore } from "@/stores/createEvent";
import Image from "next/image";
import React, { useEffect } from "react";
import { Trash2 } from "lucide-react";
import { compareAsc, format } from "date-fns";
import { Terminal } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function EventPreview() {
  const { Thumbnail, BasicInfo } = useCreateEventStore();

  return (
    <div className="flex flex-col gap-4 h-[600px] overflow-y-scroll px-4">
      <div>
        {Thumbnail ? (
          <div className="relative">
            <Image
              src={Thumbnail?.dataURL ?? ""}
              width={500}
              height={280}
              alt=""
              className="rounded-md w-full"
            />
          </div>
        ) : (
          <div className="bg-secondary w-full aspect-video rounded-md">
            <div className="flex items-center justify-center h-full">
              <h1 className="text-muted-foreground">No Image Selected</h1>
            </div>
          </div>
        )}
      </div>
      <Alert>
        <AlertTitle className="text-xl">
          {BasicInfo?.Name === "" ? "Event Name" : BasicInfo?.Name}
        </AlertTitle>
        <AlertDescription className="mt-4">
          <div className="grid grid-cols-5 gap-1">
            <p className="italic col-span-1">Time line: </p>
            <p className="col-span-4">
              {BasicInfo?.EventEndDate &&
                BasicInfo?.EventStartDate &&
                (compareAsc(
                  BasicInfo?.EventStartDate,
                  BasicInfo?.EventEndDate
                ) === 0
                  ? format(BasicInfo?.EventStartDate, "PPP p")
                  : `${format(BasicInfo?.EventStartDate, "PPP p")} - ${format(
                      BasicInfo?.EventEndDate,
                      "PPP p"
                    )}`)}
            </p>
            <p className="italic col-span-1">At: </p>
            <p className="col-span-4">
              {BasicInfo?.University
                ? `${BasicInfo?.University}`
                : "Your Event University"}
            </p>
            <p className="italic col-span-1">Location: </p>
            <p className="col-span-4">
              {BasicInfo?.Location
                ? `${BasicInfo?.Location}`
                : "Your Event Location"}
            </p>
          </div>
        </AlertDescription>
      </Alert>
    </div>
  );
}
