import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { VnDong } from "@/lib/format";
import { Event } from "@/types/event";
import { Ticket } from "@/types/ticket";
import { format } from "date-fns";
import { MinusIcon, PlusIcon, CalendarIcon, MapPinIcon } from "lucide-react";
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
    <div className="relative w-full rounded-lg bg-white/5 p-4 text-white shadow-lg backdrop-blur-3xl transition-all hover:shadow-xl">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="line-clamp-1 text-lg font-semibold">{ticket.name}</h3>
        <Badge variant="secondary" className="text-sm">
          {ticket.price === 0 ? "Free" : VnDong.format(ticket.price)}
        </Badge>
      </div>
      <Image
        src={event.thumbnailUrl}
        alt={ticket.name}
        width={300}
        height={200}
        className="mb-4 h-40 w-full rounded-md object-cover"
      />
      <div className="mb-4 space-y-2 text-sm">
        <div className="flex items-center">
          <CalendarIcon className="mr-2 h-4 w-4 text-gray-400" />
          <span>{format(event.eventStartDate, "EEE, dd/MM - hh:mm a")}</span>
        </div>
        <div className="flex items-center">
          <MapPinIcon className="mr-2 h-4 w-4 text-gray-400" />
          <span>{event.location.display}</span>
        </div>
      </div>
      <p className="mb-4 text-sm text-gray-400">{ticket.description}</p>
      <div className="mb-4 flex items-center justify-between">
        <span className="text-sm">
          Available: <strong>{ticket.inStock}</strong>
        </span>
        <div className="flex items-center space-x-2">
          <Button
            size="sm"
            variant="outline"
            onClick={handleDecrement}
            disabled={quantity === 0}
          >
            <MinusIcon className="h-4 w-4" />
          </Button>
          <span className="w-8 text-center">{quantity}</span>
          <Button
            size="sm"
            variant="outline"
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
