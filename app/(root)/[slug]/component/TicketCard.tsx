import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { VnDong } from "@/lib/format";
import { Event } from "@/types/event";
import { Ticket } from "@/types/ticket";
import { format } from "date-fns";
import { MinusIcon, PlusIcon } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

interface TicketCardProps {
  ticket: Ticket;
  event: Event;
  handleSelectTicket: (ticket: Ticket, quantity: number) => void;
}

export default function TicketCard({
  ticket,
  event,
  handleSelectTicket,
}: TicketCardProps) {
  const [quantity, setQuantity] = useState<number>(0);

  const handleIncrement = () => {
    if (quantity < ticket.inStock) {
      setQuantity(quantity + 1);
      handleSelectTicket(ticket, quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
      handleSelectTicket(ticket, quantity - 1);
    }
  };

  return (
    <div className="relative aspect-[9/16] w-64 rounded-b-lg bg-white text-primary-foreground">
      {/* 3 dot on top */}
      <div className="absolute left-0 top-0 size-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-background-alpha"></div>
      <div className="absolute left-1/2 top-0 size-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-background-alpha"></div>
      <div className="absolute right-0 top-0 size-8 -translate-y-1/2 translate-x-1/2 rounded-full bg-background-alpha"></div>

      <div className="mt-6 line-clamp-1 px-2 text-center text-base font-semibold">
        {ticket.name.toUpperCase()}
      </div>
      <Image
        src={event.thumbnailUrl}
        alt={ticket.name}
        width={200}
        height={200}
        className="aspect-square w-full object-cover"
      />

      <div className="space-y-2 p-2 px-4">
        <div>
          <span className="text-base font-semibold">
            {format(event.eventStartDate, "EEE, dd/MM")}
          </span>
          <span className="text-sm text-black/50">
            {" "}
            {format(event.eventStartDate, "hh:mm a")}
          </span>
        </div>
        <div className="text-xs">{event.location.display}</div>
      </div>

      <div className="relative h-8 w-full">
        <div className="absolute left-0 top-0 size-8 -translate-x-1/2 rounded-full bg-background-alpha"></div>
        <div className="absolute top-1/2 w-full -translate-y-1/2 border-[1px] border-dashed border-background-alpha"></div>
        <div className="absolute right-0 top-0 size-8 translate-x-1/2 rounded-full bg-background-alpha"></div>
      </div>

      <div className="space-y-2 p-2 px-4">
        <div className="text-sm text-primary-foreground/50">
          <p>{ticket.description}</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex-1">
            <span className="text-sm text-black/50">Available: </span>
            <span className="font-semibold">{ticket.inStock}</span>
          </div>
          <div className="flex items-center">
            <Badge className="bg-background font-semibold text-foreground hover:bg-background">
              {ticket.price === 0 ? "Free" : VnDong.format(ticket.price)}
            </Badge>
          </div>
        </div>
        <div className="flex w-full items-center">
          <Button
            size="icon"
            onClick={handleDecrement}
            disabled={quantity === 0}
          >
            <MinusIcon className="h-4 w-4" />
          </Button>
          <p className="flex-1 text-center">
            {quantity} / {ticket.inStock}
          </p>
          <Button
            size="icon"
            onClick={handleIncrement}
            disabled={quantity === ticket.inStock}
          >
            <PlusIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
