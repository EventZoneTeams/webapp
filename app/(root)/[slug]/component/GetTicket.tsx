"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Ticket as TicketService } from "@/lib/api/ticket";
import { useAuthStore } from "@/stores/authStore";
import { Event } from "@/types/event";
import { Ticket as TicketType } from "@/types/ticket";
import { Wallet as WalletType } from "@/types/wallet";
import { Wallet as WalletService } from "@/lib/api/wallet";
import { useRouter } from "next/navigation";
import { memo, useCallback, useEffect, useState, useTransition } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { VnDong } from "@/lib/format";
import TicketCard from "@/app/(root)/[slug]/component/TicketCard";
import { cn } from "@/lib/utils";
import { BuyTicketRequest } from "@/types/api/attendee";
import { Attendee } from "@/lib/api/attendee";

interface GetTicketProps {
  event: Event;
}

interface SelectedTicket {
  ticket: TicketType;
  quantity: number;
}

export default memo(function GetTicket({ event }: GetTicketProps) {
  const [tickets, setTicket] = useState<TicketType[] | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [wallet, setWallet] = useState<WalletType | null>(null);
  const [selectedTickets, setSelectedTicket] = useState<
    SelectedTicket[] | null
  >(null);
  const router = useRouter();
  const { user } = useAuthStore();
  const [isLoading, startTransition] = useTransition();

  const handleSelectTicket = useCallback(
    (ticket: TicketType, quantity: number) => {
      setSelectedTicket((prevSelectedTickets) => {
        if (!prevSelectedTickets) {
          return [{ ticket, quantity }];
        }
        const existingTicketIndex = prevSelectedTickets.findIndex(
          (selectedTicket) => selectedTicket.ticket.id === ticket.id,
        );

        if (existingTicketIndex !== -1) {
          const updatedTickets = [...prevSelectedTickets];

          if (quantity === 0) {
            updatedTickets.splice(existingTicketIndex, 1);
          } else {
            updatedTickets[existingTicketIndex] = { ticket, quantity };
          }
          return updatedTickets.length > 0 ? updatedTickets : null;
        }
        return [...prevSelectedTickets, { ticket, quantity }];
      });
    },
    [],
  );

  const handleGetWallet = useCallback(async () => {
    const rs = (await WalletService.getUserWallets()).data;
    if (rs && rs.length > 0) {
      setWallet(rs[0]);
    }
  }, []);

  const handleOpenDialog = useCallback(() => {
    if (!user) {
      toast.info("Please sign in or sign up to get ticket");
      router.push("/sign-in");
    } else {
      handleGetWallet();
      setIsOpen(true);
    }
  }, [handleGetWallet, router, user]);

  const handleGetTicket = useCallback(async () => {
    const rs = (await TicketService.getTicketsByEventId(event.id)).data;
    setTicket(rs);
  }, [event]);

  useEffect(() => {
    handleGetTicket();
  }, [handleGetTicket]);

  const handleCloseDialog = useCallback(() => {
    setIsOpen(false);
    setSelectedTicket(null);
  }, []);

  const handleBuyTikcet = () => {
    if (!selectedTickets || !wallet) return;
    if (
      selectedTickets.reduce(
        (acc, { ticket, quantity }) => acc + ticket.price * quantity,
        0,
      ) > wallet.balance
    )
      return;

    startTransition(() => {
      const payload: BuyTicketRequest[] = selectedTickets.map(
        ({ ticket, quantity }) => ({
          eventTicketId: ticket.id,
          eventId: event.id,
          attendeeNote: "",
          quantity,
        }),
      );

      Attendee.buyTicket(payload)
        .then((rs) => {
          toast.success("Buy ticket successfully");
        })
        .finally(() => {
          setIsOpen(false);
          setSelectedTicket(null);
        });
    });
  };

  if (!tickets || tickets.length === 0) {
    return null;
  }

  return (
    <div>
      <p className="mb-1 text-sm text-primary/50">
        {tickets.length} ticket{tickets.length > 1 ? "s" : ""} available
      </p>
      <Dialog open={isOpen} onOpenChange={handleCloseDialog}>
        <Button className="w-full" onClick={handleOpenDialog}>
          Get Ticket
        </Button>
        <DialogContent className="max-w-[900px] border-none bg-background/50 backdrop-blur-3xl">
          <div className="flex flex-col gap-4">
            <div className="gp-4 flex border-b-[1px] border-primary/50">
              <div className="flex-1 pb-4">
                <p className="mb-2 text-sm text-primary/50">Your info</p>
                <h2 className="text-lg font-medium">{user?.fullName}</h2>
                <p className="mb-2 text-sm italic text-primary/50">
                  {user?.email}
                </p>

                <Badge className="text-base">
                  Balance:{" "}
                  <span className="ml-2">
                    {wallet ? VnDong.format(wallet.balance) : "Loading..."}
                  </span>
                </Badge>
              </div>
              <div className="flex h-full w-52 flex-col justify-end space-y-2 pb-2">
                <p>
                  Total:
                  <span
                    className={cn(
                      "ml-2 text-lg font-semibold",
                      selectedTickets &&
                        wallet &&
                        selectedTickets.reduce(
                          (acc, { ticket, quantity }) =>
                            acc + ticket.price * quantity,
                          0,
                        ) > wallet.balance
                        ? "text-red-300"
                        : "text-green-300",
                    )}
                  >
                    {selectedTickets
                      ? VnDong.format(
                          selectedTickets.reduce(
                            (acc, { ticket, quantity }) =>
                              acc + ticket.price * quantity,
                            0,
                          ),
                        )
                      : "0"}
                  </span>
                </p>
                <Button
                  disabled={
                    !selectedTickets ||
                    !wallet ||
                    selectedTickets.reduce(
                      (acc, { ticket, quantity }) =>
                        acc + ticket.price * quantity,
                      0,
                    ) > wallet.balance
                  }
                  onClick={handleBuyTikcet}
                >
                  {isLoading
                    ? "Loading..."
                    : selectedTickets
                      ? "Buy Ticket"
                      : "Select Ticket"}
                </Button>
              </div>
            </div>
            <div className="flex-1 rounded-lg bg-background-alpha p-4">
              <div className="grid grid-cols-3 gap-6">
                {tickets.map((t) => (
                  <TicketCard
                    key={t.id}
                    ticket={t}
                    event={event}
                    handleSelectTicket={handleSelectTicket}
                  />
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
});
