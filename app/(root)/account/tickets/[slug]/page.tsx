"use client";

import BookedTicket from "@/app/(root)/account/tickets/[slug]/component/BookedTicket";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Book } from "lucide-react";
import Link from "next/link";

export default function page({ params }: { params: { slug: string } }) {
  return (
    <div>
      <Link href={"/account/tickets"}>
        <Button variant={"link"} className="flex items-center gap-2">
          <ArrowLeft />
          Back
        </Button>
      </Link>
      <BookedTicket ticketId={params.slug} />
    </div>
  );
}
