"use client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Event as EventService } from "@/lib/api/event";
import { Event } from "@/types/event";
import React from "react";
import { toast } from "sonner";

interface EventSettingProps {
  event: Event;
}

export default function EventSetting(props: EventSettingProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isLoading, startTransition] = React.useTransition();

  const handleDisableEvent = () => {
    if (props.event) {
      startTransition(() => {
        EventService.disable(props.event.id)
          .then((response) => {
            if (response.isSuccess) {
              toast.success("Event has been disabled successfully");
            }
          })
          .finally(() => {
            setIsOpen(false);
          });
      });
    }
  };

  return (
    <div className="space-y-4">
      <p className="text-primary/50">Event Settings</p>
      {props.event.isDeleted ? (
        <div>{/* more content */}</div>
      ) : (
        <AlertDialog open={isOpen}>
          <AlertDialogTrigger asChild>
            <Button variant={"destructive"} onClick={() => setIsOpen(true)}>
              Disabled Event
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently disable your
                Event and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <Button variant={"outline"} onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleDisableEvent}>Continue</Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
}
