import { useCurrentEvent } from "@/stores/manager/current-event";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { isValidImageUrl } from "@/lib/image";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin } from "lucide-react";

export default function CurrentEvent() {
  const { currentEvent } = useCurrentEvent();
  const [isValidImage, setIsValidImage] = useState<boolean>(false);

  useEffect(() => {
    if (currentEvent?.ThumbnailUrl) {
      isValidImageUrl(currentEvent.ThumbnailUrl).then((res) => {
        setIsValidImage(res as boolean);
      });
    }
  }, [currentEvent?.ThumbnailUrl]);
  return currentEvent ? (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>{currentEvent?.Name ?? "No Event Selected"}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-1 aspect-video">
            {currentEvent?.ThumbnailUrl ? (
              isValidImage ? (
                <Image
                  src={currentEvent.ThumbnailUrl ?? ""}
                  alt={currentEvent.Name}
                  width={800}
                  height={450}
                  className="w-full h-full rounded-md"
                />
              ) : (
                <div className="w-full h-full bg-secondary rounded-md flex items-center justify-center">
                  <p>Invalid Image</p>
                </div>
              )
            ) : (
              <div className="w-full h-full bg-secondary rounded-md flex items-center justify-center">
                <p>No Image</p>
              </div>
            )}
          </div>
          <div className="col-span-1  border rounded-md p-4 space-y-2"></div>
        </div>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  ) : (
    <Card className="h-full flex items-center justify-center">
      No Event Selected
    </Card>
  );
}
