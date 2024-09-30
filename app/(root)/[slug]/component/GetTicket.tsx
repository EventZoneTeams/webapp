"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Ticket as TicketService } from "@/lib/api/ticket";
import { useAuthStore } from "@/stores/authStore";
import { Event } from "@/types/event";
import { Ticket as TicketType } from "@/types/ticket";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

interface GetTicketProps {
  event: Event;
}

export default function GetTicket({ event }: GetTicketProps) {
  const [ticket, setTicket] = useState<TicketType[] | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const router = useRouter();
  const { user } = useAuthStore();

  const handleOpenDialog = useCallback(() => {
    if (!user) {
      toast.info("Please sign in or sign up to get ticket");
      router.push("/sign-in");
    } else {
      setIsOpen(true);
    }
  }, []);

  const handleGetTicket = useCallback(async () => {
    const rs = (await TicketService.getTicketsByEventId(event.id)).data;
    setTicket(rs);
  }, [event]);

  useEffect(() => {
    handleGetTicket();
  }, [handleGetTicket]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Button className="w-full" onClick={handleOpenDialog}>
        Get Ticket
      </Button>
      <DialogContent className="max-w-[900px] border-none bg-background/50 backdrop-blur-3xl">
        <div className="flex gap-4">
          <div className="">
            <p className="mb-2 text-sm text-primary/50">Your info</p>
            <h2 className="text-lg font-medium">{user?.fullName}</h2>
            <p className="text-sm italic text-primary/50">{user?.email}</p>
          </div>
          <div className=""></div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
