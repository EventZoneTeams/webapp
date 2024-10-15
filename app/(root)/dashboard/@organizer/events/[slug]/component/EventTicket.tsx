"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, MoreHorizontal } from "lucide-react";
import { Ticket } from "@/types/ticket";
import { Ticket as TicketAPI } from "@/lib/api/ticket";
import { VnDong } from "@/lib/format";

// Component for creating a new ticket type
function NewTicketTypeDialog({
  onAdd,
  eventId,
}: {
  onAdd: (ticket: Ticket) => void;
  eventId: string;
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [inStock, setInStock] = useState(0);
  const [price, setPrice] = useState(0);

  const handleCreateTicket = async () => {
    try {
      const payload = { eventId: eventId, name, description, inStock, price };
      const response = await TicketAPI.create(payload);

      if (response.isSuccess) {
        const newTicket: Ticket = {
          id: "generated_id",
          eventId: eventId,
          name,
          description,
          inStock,
          price,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        onAdd(newTicket);
      }
    } catch (error) {
      console.error("Failed to create ticket:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="text-gray-400 hover:text-white hover:bg-background/50"
        >
          <Plus className="mr-2 h-4 w-4" />
          New Ticket Type
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-background/50 backdrop-blur-xl sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New Ticket Type</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="Enter ticket name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Enter ticket description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="inStock">In Stock</Label>
            <Input
              type="number"
              id="inStock"
              placeholder="0"
              value={inStock}
              onChange={(e) => setInStock(Number(e.target.value))}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="price">Price</Label>
            <Input
              type="number"
              id="price"
              placeholder="0.00"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
            />
          </div>
        </div>
        <Button className="w-full" onClick={handleCreateTicket}>
          Create Ticket Type
        </Button>
      </DialogContent>
    </Dialog>
  );
}

// Component for displaying a single ticket item
function TicketItem({
  name,
  price,
  sold,
  total,
}: {
  name: string;
  price: number;
  sold: number;
  total?: number;
}) {
  return (
    <div className="flex items-center justify-between rounded-lg bg-background/50 p-3 backdrop-blur-xl">
      <div className="flex items-center">
        <span className="mr-2 font-medium">{name}</span>
        <span className="text-sm text-gray-400">
          {price === 0 ? "Free" : `${VnDong.format(Number(price.toFixed(2)))}`}
        </span>
      </div>
      <div className="flex items-center">
        <span className="mr-4 text-sm text-gray-400">
          {total ? `${sold}/${total} sold` : `${sold} sold`}
        </span>
        <Button
          variant="ghost"
          size="sm"
          className="p-0 text-gray-400 hover:text-white"
        >
          <MoreHorizontal className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}

// Main component for managing tickets
export default function EventTicket({ eventId }: { eventId: string }) {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    // Fetch tickets by event ID
    const fetchTickets = async () => {
      try {
        const response = await TicketAPI.getTicketsByEventId(eventId);
        if (response.isSuccess) {
          console.log(response.data);
          if (response.data) {
            setTickets(response.data);
          }
        }
      } catch (error) {
        console.error("Failed to fetch tickets:", error);
      }
    };

    fetchTickets();
  }, [eventId]);

  const handleAddTicket = (newTicket: Ticket) => {
    setTickets([...tickets, newTicket]);
  };

  console.log(tickets);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Tickets</h2>
        <NewTicketTypeDialog onAdd={handleAddTicket} eventId={eventId} />
      </div>
      <div className="flex items-center justify-between">
        <div className="w-full space-y-3">
          {tickets.map((ticket) => (
            <TicketItem
              key={ticket.id}
              name={ticket.name}
              price={ticket.price}
              sold={0} // Placeholder, adjust based on actual data
              total={ticket.inStock}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
