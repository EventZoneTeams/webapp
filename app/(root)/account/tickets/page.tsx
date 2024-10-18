"use client";

import { useState, useEffect } from "react";
import {
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "lucide-react";
import { BookedTicket } from "@/types/ticket";
import { Ticket } from "@/lib/api/ticket";
import { VnDong } from "@/lib/format";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";

export default function UserTickets() {
  const [tickets, setTickets] = useState<BookedTicket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const response = await Ticket.getMyTicket();
      if (response.isSuccess && response.data) {
        setTickets(response.data);
      } else {
        setError(response.message || "Failed to fetch tickets");
      }
    } catch (err) {
      setError("An error occurred while fetching tickets");
    } finally {
      setLoading(false);
    }
  };

  const groupTicketsByEvent = (tickets: BookedTicket[]) => {
    return tickets.reduce(
      (acc, ticket) => {
        const eventId = ticket.eventId;
        if (!acc[eventId]) {
          acc[eventId] = [];
        }
        acc[eventId].push(ticket);
        return acc;
      },
      {} as Record<string, BookedTicket[]>,
    );
  };

  if (loading)
    return <div className="py-8 text-center">Loading tickets...</div>;
  if (error)
    return <div className="py-8 text-center text-red-500">{error}</div>;

  const groupedTickets = groupTicketsByEvent(tickets);

  return (
    <div className="container mx-auto px-4 py-8">
      <Accordion type="single" collapsible className="w-full">
        {Object.entries(groupedTickets).map(([eventId, eventTickets]) => (
          <AccordionItem key={eventId} value={eventId}>
            <AccordionTrigger className="text-2xl font-semibold">
              {eventTickets[0].eventName || "Event"}
            </AccordionTrigger>
            <AccordionContent>
              <div className="mt-4 flex flex-col gap-4">
                {eventTickets.map((ticket) => (
                  <Link key={ticket.id} href={`/account/tickets/${ticket.id}`}>
                    <div className="overflow-hidden rounded-lg bg-white/5 shadow-lg transition-shadow hover:cursor-pointer hover:bg-white/10">
                      <div className="p-6 text-primary/50">
                        <div className="mb-2 text-sm">{ticket.id}</div>
                        <h3 className="mb-2 text-xl font-bold text-white">
                          {ticket.eventTicket.name}
                        </h3>
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-semibold">
                            {VnDong.format(ticket.paidPrice)}
                          </span>
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-medium ${
                              ticket.isCheckedIn
                                ? "bg-green-200/20 text-green-500"
                                : "bg-yellow-200/20 text-yellow-500"
                            }`}
                          >
                            {ticket.isCheckedIn
                              ? "Checked In"
                              : "Not Checked In"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
