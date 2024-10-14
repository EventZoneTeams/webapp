"use client";

import { useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Ticket {
  id: string;
  type: string;
  checkedIn: boolean;
}

interface PurchasedItem {
  id: string;
  name: string;
  quantity: number;
  checkedOut: boolean;
}

interface Attendee {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  tickets: Ticket[];
  purchasedItems: PurchasedItem[];
}

// Mock data with 25 entries
const mockAttendees: Attendee[] = Array.from({ length: 25 }, (_, index) => ({
  id: `ATT${(index + 1).toString().padStart(3, "0")}`,
  name: `Attendee ${index + 1}`,
  email: `attendee${index + 1}@example.com`,
  avatarUrl: `https://api.dicebear.com/6.x/initials/svg?seed=${encodeURIComponent(`Attendee ${index + 1}`)}`,
  tickets: [
    {
      id: `TKT${(index + 1).toString().padStart(3, "0")}A`,
      type: "General",
      checkedIn: Math.random() > 0.5,
    },
    {
      id: `TKT${(index + 1).toString().padStart(3, "0")}B`,
      type: "Workshop",
      checkedIn: Math.random() > 0.5,
    },
  ],
  purchasedItems: [
    {
      id: `ITM${(index + 1).toString().padStart(3, "0")}A`,
      name: "T-Shirt",
      quantity: Math.floor(Math.random() * 3) + 1,
      checkedOut: Math.random() > 0.5,
    },
    {
      id: `ITM${(index + 1).toString().padStart(3, "0")}B`,
      name: "Mug",
      quantity: Math.floor(Math.random() * 2) + 1,
      checkedOut: Math.random() > 0.5,
    },
  ],
}));

export default function EventAttendeeManagement() {
  const [attendees, setAttendees] = useState<Attendee[]>(mockAttendees);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAttendee, setSelectedAttendee] = useState<Attendee | null>(
    null,
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const { toast } = useToast();

  const filteredAttendees = attendees.filter(
    (attendee) =>
      attendee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      attendee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      attendee.id.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const totalPages = Math.ceil(filteredAttendees.length / itemsPerPage);
  const paginatedAttendees = filteredAttendees.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleTicketCheckInOut = (
    attendeeId: string,
    ticketId: string,
    checkIn: boolean,
  ) => {
    setAttendees(
      attendees.map((attendee) => {
        if (attendee.id === attendeeId) {
          const updatedTickets = attendee.tickets.map((ticket) =>
            ticket.id === ticketId ? { ...ticket, checkedIn: checkIn } : ticket,
          );
          return { ...attendee, tickets: updatedTickets };
        }
        return attendee;
      }),
    );
    setSelectedAttendee((prev) => {
      if (prev && prev.id === attendeeId) {
        const updatedTickets = prev.tickets.map((ticket) =>
          ticket.id === ticketId ? { ...ticket, checkedIn: checkIn } : ticket,
        );
        return { ...prev, tickets: updatedTickets };
      }
      return prev;
    });
    toast({
      title: checkIn ? "Ticket Checked In" : "Ticket Check-In Reversed",
      description: checkIn
        ? "The ticket has been successfully checked in."
        : "The ticket check-in has been reversed.",
    });
  };

  const handleItemCheckInOut = (
    attendeeId: string,
    itemId: string,
    checkOut: boolean,
  ) => {
    setAttendees(
      attendees.map((attendee) => {
        if (attendee.id === attendeeId) {
          const updatedItems = attendee.purchasedItems.map((item) =>
            item.id === itemId ? { ...item, checkedOut: checkOut } : item,
          );
          return { ...attendee, purchasedItems: updatedItems };
        }
        return attendee;
      }),
    );
    setSelectedAttendee((prev) => {
      if (prev && prev.id === attendeeId) {
        const updatedItems = prev.purchasedItems.map((item) =>
          item.id === itemId ? { ...item, checkedOut: checkOut } : item,
        );
        return { ...prev, purchasedItems: updatedItems };
      }
      return prev;
    });
    toast({
      title: checkOut ? "Item Checked Out" : "Item Check-Out Reversed",
      description: checkOut
        ? "The item has been successfully checked out."
        : "The item check-out has been reversed.",
    });
  };

  return (
    <Card className="mx-auto w-full border-none bg-transparent">
      <CardHeader>
        <CardTitle>Event Attendee Management</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6 flex items-center gap-4">
          <div className="flex-1 space-y-2">
            <Label htmlFor="search">Search Attendees</Label>
            <Input
              id="search"
              placeholder="Search by name, email, or ID"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="itemsPerPage">Number per page</Label>
            <Select
              value={itemsPerPage.toString()}
              onValueChange={(value) => setItemsPerPage(Number(value))}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Avatar</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Tickets</TableHead>
              <TableHead>Items</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-primary/5">
            {paginatedAttendees.map((attendee) => (
              <TableRow
                key={attendee.id}
                className="cursor-pointer hover:bg-muted/50"
              >
                <TableCell onClick={() => setSelectedAttendee(attendee)}>
                  {attendee.id}
                </TableCell>
                <TableCell onClick={() => setSelectedAttendee(attendee)}>
                  <Avatar>
                    <AvatarImage src={attendee.avatarUrl} alt={attendee.name} />
                    <AvatarFallback>
                      {attendee.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell onClick={() => setSelectedAttendee(attendee)}>
                  {attendee.name}
                </TableCell>
                <TableCell onClick={() => setSelectedAttendee(attendee)}>
                  {attendee.email}
                </TableCell>
                <TableCell onClick={() => setSelectedAttendee(attendee)}>
                  {attendee.tickets.length}
                </TableCell>
                <TableCell onClick={() => setSelectedAttendee(attendee)}>
                  {attendee.purchasedItems.length}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Pagination className="mt-4">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                isActive={currentPage > 1}
                href={""}
              />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  onClick={() => setCurrentPage(page)}
                  isActive={currentPage === page}
                  href={""}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                href={""}
                isActive={currentPage < totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>

        <Dialog
          open={!!selectedAttendee}
          onOpenChange={(open) => !open && setSelectedAttendee(null)}
        >
          <DialogContent className="max-w-7xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage
                    src={selectedAttendee?.avatarUrl}
                    alt={selectedAttendee?.name}
                  />
                  <AvatarFallback>
                    {selectedAttendee?.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                {selectedAttendee?.name} ({selectedAttendee?.id})
              </DialogTitle>
              <DialogDescription>{selectedAttendee?.email}</DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h4 className="mb-2 font-semibold">Tickets:</h4>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead className="min-w-[100px]">Type</TableHead>
                      <TableHead className="min-w-[148px]">Status</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedAttendee?.tickets.map((ticket) => (
                      <TableRow key={ticket.id}>
                        <TableCell>{ticket.id}</TableCell>
                        <TableCell>{ticket.type}</TableCell>
                        <TableCell>
                          {ticket.checkedIn ? (
                            <span className="flex items-center text-green-500">
                              <CheckCircle className="mr-1 h-4 w-4" /> Checked
                              In
                            </span>
                          ) : (
                            <span className="flex items-center text-yellow-500">
                              <XCircle className="mr-1 h-4 w-4" /> Not Checked
                              In
                            </span>
                          )}
                        </TableCell>
                        <TableCell>
                          {ticket.checkedIn ? (
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="outline" size="sm">
                                  Reverse Check-In
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    Are you sure?
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This action will reverse the check-in for
                                    this ticket.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() =>
                                      handleTicketCheckInOut(
                                        selectedAttendee.id,
                                        ticket.id,
                                        false,
                                      )
                                    }
                                  >
                                    Confirm
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          ) : (
                            <Button
                              onClick={() =>
                                handleTicketCheckInOut(
                                  selectedAttendee.id,
                                  ticket.id,
                                  true,
                                )
                              }
                              size="sm"
                            >
                              Check In
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div>
                <h4 className="mb-2 font-semibold">Purchased Items:</h4>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead className="min-w-[100px]">Item</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead className="min-w-[160px]">Status</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedAttendee?.purchasedItems.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.id}</TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>
                          {item.checkedOut ? (
                            <span className="flex items-center text-green-500">
                              <CheckCircle className="mr-1 h-4 w-4" /> Checked
                              Out
                            </span>
                          ) : (
                            <span className="flex items-center text-yellow-500">
                              <XCircle className="mr-1 h-4 w-4" /> Not Checked
                              Out
                            </span>
                          )}
                        </TableCell>
                        <TableCell>
                          {item.checkedOut ? (
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="outline" size="sm">
                                  Reverse Check-Out
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    Are you sure?
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This action will reverse the check-out for
                                    this item.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() =>
                                      handleItemCheckInOut(
                                        selectedAttendee.id,
                                        item.id,
                                        false,
                                      )
                                    }
                                  >
                                    Confirm
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          ) : (
                            <Button
                              onClick={() =>
                                handleItemCheckInOut(
                                  selectedAttendee.id,
                                  item.id,
                                  true,
                                )
                              }
                              size="sm"
                            >
                              Check Out
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
