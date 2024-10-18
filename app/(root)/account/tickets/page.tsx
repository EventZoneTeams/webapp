"use client";

import { useState, useEffect } from "react";
import { CalendarIcon, ClockIcon, MapPinIcon, QrCode } from "lucide-react";
import { BookedTicket } from "@/types/ticket";
import { Ticket } from "@/lib/api/ticket";
import { VnDong } from "@/lib/format";

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
      {Object.entries(groupedTickets).map(([eventId, eventTickets]) => (
        <div key={eventId} className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold">
            {eventTickets[0].eventName || "Event"}
          </h2>
          <div className="flex flex-col gap-4">
            {eventTickets.map((ticket) => (
              <div
                key={ticket.id}
                className="overflow-hidden rounded-lg bg-white/5 shadow-lg"
              >
                <div className="p-6 text-primary/50">
                  <div className="text-sm">{ticket.id}</div>
                  <h3 className="mb-2 text-xl font-bold text-white">
                    {ticket.eventName}
                  </h3>
                  <div className="mb-2 flex items-center">
                    <CalendarIcon className="mr-2 h-5 w-5" />
                    <span>
                      {new Date(ticket.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="mb-2 flex items-center">
                    <ClockIcon className="mr-2 h-5 w-5" />
                    <span>
                      {new Date(ticket.createdAt).toLocaleTimeString()}
                    </span>
                  </div>
                  <div className="mb-4 flex items-center">
                    <MapPinIcon className="mr-2 h-5 w-5" />
                    <span>{ticket.event.locationDisplay || "Venue TBA"}</span>
                  </div>
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
                      {ticket.isCheckedIn ? "Checked In" : "Not Checked In"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
