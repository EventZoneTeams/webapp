"use client";

import { useCreateEventStore } from "@/stores/createEvent";
import Image from "next/image";
import React, { useEffect } from "react";
import { Trash2 } from "lucide-react";
import { compareAsc, format } from "date-fns";

export default function EventPreview() {
  const { Thumbnail, BasicInfo } = useCreateEventStore();

  useEffect(() => {
    console.log(BasicInfo.EventDateRange);
  }, [BasicInfo.EventDateRange]);

  return (
    <div className="flex flex-col gap-4 ">
      <div>
        {Thumbnail ? (
          <div className="relative group">
            <Image
              src={Thumbnail?.dataURL ?? ""}
              width={500}
              height={280}
              alt=""
              className="rounded-md w-full"
            />
            <div
              className="absolute top-2 right-2 hover:cursor-pointer text-destructive hidden group-hover:block"
              onClick={() => {
                useCreateEventStore.setState({ Thumbnail: null });
              }}
            >
              <Trash2 />
            </div>
          </div>
        ) : (
          <div className="bg-secondary w-full aspect-video rounded-md">
            <div className="flex items-center justify-center h-full">
              <h1 className="text-muted-foreground">No Image Selected</h1>
            </div>
          </div>
        )}
      </div>
      <div>
        <h1 className="text-2xl font-semibold">{BasicInfo?.Name}</h1>
        <p className="text-muted-foreground">
          {BasicInfo?.EventDateRange?.from && BasicInfo?.EventDateRange?.to && (
            <div>
              {format(BasicInfo?.EventDateRange?.from, "PPP")}
              {" - "}
              {format(BasicInfo?.EventDateRange?.to, "PPP")}
            </div>
          )}
        </p>
      </div>
    </div>
  );
}
