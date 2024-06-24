import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import React from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Ban,
  Bold,
  CircleCheck,
  Italic,
  SendHorizonal,
  Underline,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function FeedBackForm() {
  return (
    <div className="flex flex-col gap-2 h-40 ">
      <div className="flex justify-between bg-secondary rounded-md">
        <ToggleGroup type="multiple">
          <ToggleGroupItem value="bold" aria-label="Toggle bold">
            <Bold className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="italic" aria-label="Toggle italic">
            <Italic className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="underline" aria-label="Toggle underline">
            <Underline className="h-4 w-4" />
          </ToggleGroupItem>
        </ToggleGroup>
        <div className="flex items-center gap-2">
          <Button
            variant={"outline"}
            className={cn(
              "flex items-center gap-2 text-white bg-red-500 hover:bg-red-300 "
            )}
          >
            <Ban size={20} />
            Reject
          </Button>
          <Button
            variant={"outline"}
            className={cn(
              "flex items-center gap-2 text-white bg-green-500 hover:bg-green-300 "
            )}
          >
            <CircleCheck size={20} />
            Approve
          </Button>
        </div>
        <Button variant={"default"} className={cn("flex items-center gap-2 ")}>
          Send
          <SendHorizonal size={20} />
        </Button>
      </div>
      <Textarea
        placeholder="Write your feedback here"
        rows={5}
        className={cn("resize-none ")}
      />
    </div>
  );
}
