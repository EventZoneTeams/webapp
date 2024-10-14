"use client";

import { useState, useEffect } from "react";
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { Staff } from "@/lib/api/staff";
import { UserOrder } from "@/types/check-in";

export default function EventStaffPage({
  params,
}: {
  params: { slug: string };
}) {
  const [attendees, setAttendees] = useState<UserOrder[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAttendee, setSelectedAttendee] = useState<UserOrder | null>(
    null,
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [attendeesPerPage, setAttendeesPerPage] = useState(5);
  const { toast } = useToast();

  useEffect(() => {
    const fetchAttendees = async () => {
      try {
        const response = await Staff.getUserListOrder(params.slug);
        if (response.isSuccess && response.data) {
          setAttendees(response.data);
        } else {
          setAttendees([]);
          toast({
            title: "Error",
            description: response.message || "Failed to fetch attendees",
            variant: "destructive",
          });
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "An unexpected error occurred",
          variant: "destructive",
        });
      }
    };

    fetchAttendees();
  }, [params.slug, toast]);

  const filteredAttendees = attendees.filter(
    (attendee) =>
      attendee.user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      attendee.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      attendee.user.id.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const totalPages = Math.ceil(filteredAttendees.length / attendeesPerPage);
  const paginatedAttendees = filteredAttendees.slice(
    (currentPage - 1) * attendeesPerPage,
    currentPage * attendeesPerPage,
  );

  const handleTicketCheckInOut = async (
    attendeeId: string,
    ticketId: string,
    checkIn: boolean,
  ) => {
    // Immediately update the UI
    setSelectedAttendee((prevAttendee) => {
      if (!prevAttendee) return null;
      return {
        ...prevAttendee,
        bookedTickets: prevAttendee.bookedTickets.map((ticket) =>
          ticket.id === ticketId ? { ...ticket, isCheckedIn: checkIn } : ticket,
        ),
      };
    });

    try {
      const response = await Staff.checkInTicket(ticketId);
      if (response.isSuccess) {
        toast({
          title: checkIn ? "Ticket Checked In" : "Ticket Check-In Reversed",
          description: "Operation successful",
        });
        // Update the attendees list
        setAttendees((prevAttendees) =>
          prevAttendees.map((attendee) =>
            attendee.user.id === attendeeId
              ? {
                  ...attendee,
                  bookedTickets: attendee.bookedTickets.map((ticket) =>
                    ticket.id === ticketId
                      ? { ...ticket, isCheckedIn: checkIn }
                      : ticket,
                  ),
                }
              : attendee,
          ),
        );
      } else {
        // Revert the UI change if the API call fails
        setSelectedAttendee((prevAttendee) => {
          if (!prevAttendee) return null;
          return {
            ...prevAttendee,
            bookedTickets: prevAttendee.bookedTickets.map((ticket) =>
              ticket.id === ticketId
                ? { ...ticket, isCheckedIn: !checkIn }
                : ticket,
            ),
          };
        });
        toast({
          title: "Error",
          description: response.message || "Failed to update ticket status",
          variant: "destructive",
        });
      }
    } catch (error) {
      // Revert the UI change if an error occurs
      setSelectedAttendee((prevAttendee) => {
        if (!prevAttendee) return null;
        return {
          ...prevAttendee,
          bookedTickets: prevAttendee.bookedTickets.map((ticket) =>
            ticket.id === ticketId
              ? { ...ticket, isCheckedIn: !checkIn }
              : ticket,
          ),
        };
      });
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    }
  };

  const handleProductCheckInOut = async (
    attendeeId: string,
    productId: string,
    checkOut: boolean,
  ) => {
    // Immediately update the UI
    setSelectedAttendee((prevAttendee) => {
      if (!prevAttendee) return null;
      return {
        ...prevAttendee,
        products: prevAttendee.products.map((product) =>
          product.id === productId
            ? { ...product, isReceived: checkOut }
            : product,
        ),
      };
    });

    try {
      const response = await Staff.checkOutOrder(productId);
      if (response.isSuccess) {
        toast({
          title: checkOut
            ? "Product Checked Out"
            : "Product Check-Out Reversed",
          description: "Operation successful",
        });
        // Update the attendees list
        setAttendees((prevAttendees) =>
          prevAttendees.map((attendee) =>
            attendee.user.id === attendeeId
              ? {
                  ...attendee,
                  products: attendee.products.map((product) =>
                    product.id === productId
                      ? { ...product, isReceived: checkOut }
                      : product,
                  ),
                }
              : attendee,
          ),
        );
      } else {
        // Revert the UI change if the API call fails
        setSelectedAttendee((prevAttendee) => {
          if (!prevAttendee) return null;
          return {
            ...prevAttendee,
            products: prevAttendee.products.map((product) =>
              product.id === productId
                ? { ...product, isReceived: !checkOut }
                : product,
            ),
          };
        });
        toast({
          title: "Error",
          description: response.message || "Failed to update product status",
          variant: "destructive",
        });
      }
    } catch (error) {
      // Revert the UI change if an error occurs
      setSelectedAttendee((prevAttendee) => {
        if (!prevAttendee) return null;
        return {
          ...prevAttendee,
          products: prevAttendee.products.map((product) =>
            product.id === productId
              ? { ...product, isReceived: !checkOut }
              : product,
          ),
        };
      });
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    }
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
            <Label htmlFor="attendeesPerPage">Number per page</Label>
            <Select
              value={attendeesPerPage.toString()}
              onValueChange={(value) => setAttendeesPerPage(Number(value))}
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
              <TableHead>Avatar</TableHead>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Tickets</TableHead>
              <TableHead>Products</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-primary/5">
            {paginatedAttendees.map((attendee) => (
              <TableRow
                key={attendee.user.id}
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => setSelectedAttendee(attendee)}
              >
                <TableCell>
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={attendee.user.avatar}
                      alt={attendee.user.fullName}
                    />
                    <AvatarFallback>
                      {attendee.user.fullName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell>{attendee.user.id}</TableCell>
                <TableCell>{attendee.user.fullName}</TableCell>
                <TableCell>{attendee.user.email}</TableCell>
                <TableCell>{attendee.bookedTickets.length}</TableCell>
                <TableCell>{attendee.products.length}</TableCell>
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
          <DialogContent className="flex max-h-[95vh] max-w-7xl flex-col overflow-hidden">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage
                    src={selectedAttendee?.user.avatar}
                    alt={selectedAttendee?.user.fullName}
                  />
                  <AvatarFallback>
                    {selectedAttendee?.user.fullName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                {selectedAttendee?.user.fullName} ({selectedAttendee?.user.id})
              </DialogTitle>
              <DialogDescription>
                {selectedAttendee?.user.email}
              </DialogDescription>
            </DialogHeader>
            <div className="flex-grow overflow-hidden">
              <div className="grid h-full grid-cols-1 gap-8">
                {selectedAttendee?.bookedTickets &&
                  selectedAttendee.bookedTickets.length > 0 && (
                    <div
                      className={`w-full ${
                        selectedAttendee?.products &&
                        selectedAttendee.products.length > 0
                          ? "max-h-[30vh]"
                          : "max-h-[80vh]"
                      }`}
                    >
                      <h4 className="mb-2 font-semibold">Booked Tickets:</h4>
                      <ScrollArea
                        className="h-full rounded-md border"
                        style={{ maxHeight: "100%" }}
                      >
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="sticky top-0 bg-background">
                                ID
                              </TableHead>
                              <TableHead className="sticky top-0 bg-background">
                                Type
                              </TableHead>
                              <TableHead className="sticky top-0 bg-background">
                                Status
                              </TableHead>
                              <TableHead className="sticky top-0 bg-background">
                                Action
                              </TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {selectedAttendee.bookedTickets.map((ticket) => (
                              <TableRow key={ticket.id}>
                                <TableCell>{ticket.id}</TableCell>
                                <TableCell>{ticket.attendeeNote}</TableCell>
                                <TableCell>
                                  {ticket.isCheckedIn ? (
                                    <span className="flex items-center text-green-500">
                                      <CheckCircle className="mr-1 h-4 w-4" />{" "}
                                      Checked In
                                    </span>
                                  ) : (
                                    <span className="flex items-center text-yellow-500">
                                      <XCircle className="mr-1 h-4 w-4" /> Not
                                      Checked In
                                    </span>
                                  )}
                                </TableCell>
                                <TableCell>
                                  {ticket.isCheckedIn ? (
                                    <AlertDialog>
                                      <AlertDialogTrigger asChild>
                                        <Button variant="outline" size="sm">
                                          Reverse Check-in
                                        </Button>
                                      </AlertDialogTrigger>
                                      <AlertDialogContent>
                                        <AlertDialogHeader>
                                          <AlertDialogTitle>
                                            Are you sure?
                                          </AlertDialogTitle>
                                          <AlertDialogDescription>
                                            This action will reverse the
                                            check-in for this ticket.
                                          </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                          <AlertDialogCancel>
                                            Cancel
                                          </AlertDialogCancel>
                                          <AlertDialogAction
                                            onClick={() =>
                                              handleTicketCheckInOut(
                                                selectedAttendee.user.id,
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
                                          selectedAttendee.user.id,
                                          ticket.id,
                                          true,
                                        )
                                      }
                                      size="sm"
                                    >
                                      Check-in
                                    </Button>
                                  )}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </ScrollArea>
                    </div>
                  )}
                {selectedAttendee?.products &&
                  selectedAttendee.products.length > 0 && (
                    <div
                      className={`w-full ${
                        selectedAttendee?.bookedTickets &&
                        selectedAttendee.bookedTickets.length > 0
                          ? "max-h-[35vh]"
                          : "max-h-[80vh]"
                      }`}
                    >
                      <h4 className="mb-2 font-semibold">
                        Purchased Products:
                      </h4>
                      <ScrollArea
                        className="h-full rounded-md border"
                        style={{ maxHeight: "100%" }}
                      >
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="sticky top-0 bg-background">
                                ID
                              </TableHead>
                              <TableHead className="sticky top-0 bg-background">
                                Product
                              </TableHead>
                              <TableHead className="sticky top-0 bg-background">
                                Quantity
                              </TableHead>
                              <TableHead className="sticky top-0 bg-background">
                                Status
                              </TableHead>
                              <TableHead className="sticky top-0 bg-background">
                                Action
                              </TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {selectedAttendee.products.map((product) => (
                              <TableRow key={product.id}>
                                <TableCell>{product.id}</TableCell>
                                <TableCell>{product.name}</TableCell>
                                <TableCell>{product.quantity}</TableCell>
                                <TableCell>
                                  {product.isReceived ? (
                                    <span className="flex items-center text-green-500">
                                      <CheckCircle className="mr-1 h-4 w-4" />{" "}
                                      Checked Out
                                    </span>
                                  ) : (
                                    <span className="flex items-center text-yellow-500">
                                      <XCircle className="mr-1 h-4 w-4" /> Not
                                      Checked Out
                                    </span>
                                  )}
                                </TableCell>
                                <TableCell>
                                  {product.isReceived ? (
                                    <AlertDialog>
                                      <AlertDialogTrigger asChild>
                                        <Button variant="outline" size="sm">
                                          Reverse Check-out
                                        </Button>
                                      </AlertDialogTrigger>
                                      <AlertDialogContent>
                                        <AlertDialogHeader>
                                          <AlertDialogTitle>
                                            Are you sure?
                                          </AlertDialogTitle>
                                          <AlertDialogDescription>
                                            This action will reverse the
                                            check-out status for this product.
                                          </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                          <AlertDialogCancel>
                                            Cancel
                                          </AlertDialogCancel>
                                          <AlertDialogAction
                                            onClick={() =>
                                              handleProductCheckInOut(
                                                selectedAttendee.user.id,
                                                product.id,
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
                                        handleProductCheckInOut(
                                          selectedAttendee.user.id,
                                          product.id,
                                          true,
                                        )
                                      }
                                      size="sm"
                                    >
                                      Check-out
                                    </Button>
                                  )}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </ScrollArea>
                    </div>
                  )}
                {(!selectedAttendee?.bookedTickets ||
                  selectedAttendee.bookedTickets.length === 0) &&
                  (!selectedAttendee?.products ||
                    selectedAttendee.products.length === 0) && (
                    <div className="col-span-full text-center text-gray-500">
                      No tickets or products found for this attendee.
                    </div>
                  )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
