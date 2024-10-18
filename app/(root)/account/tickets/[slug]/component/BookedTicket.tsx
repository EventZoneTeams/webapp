"use client";

import { Ticket } from "@/lib/api/ticket";
import { BookedTicket as BookedTicketType } from "@/types/ticket";
import React, { useEffect, useState } from "react";

interface BookedTicketProps {
  ticketId: string;
}

export default function BookedTicket(props: BookedTicketProps) {
  const [ticket, setTicket] = useState<BookedTicketType | null>(null);

  useEffect(() => {
    Ticket.getBookedTicketById(props.ticketId).then((response) => {
      if (response.isSuccess) {
        setTicket(response.data);
      }
    });
  }, [props]);
  return <div>BookedTicket</div>;
}
