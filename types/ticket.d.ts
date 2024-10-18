// ticket.d.ts
import { Event } from "@/types/event";

export interface CreateTicketRequest {
  eventId: string; // ID of the event this ticket belongs to
  name: string; // Name of the ticket
  description?: string; // Optional description of the ticket
  inStock: number; // Number of tickets available in stock
  price: number; // Price of the ticket
}

export interface Ticket {
  id: string; // Unique ID of the ticket
  eventId: string; // ID of the event this ticket is associated with
  name: string; // Name of the ticket
  description?: string; // Optional description of the ticket
  inStock: number; // Number of tickets available in stock
  price: number; // Price of the ticket
  createdAt: string; // Timestamp when the ticket was created
  updatedAt: string; // Timestamp when the ticket was last updated
}

export interface BookedTicket {
  id: string;
  userId: string;
  isCheckedIn: boolean;
  eventOrderId: string;
  createdAt: string;
  isDeleted: boolean;
  eventName: string;
  event: Event;
  eventTicket: Ticket;
  eventTicketId: string;
  eventId: string;
  paidPrice: number;
  attendeeNote: string;
}
