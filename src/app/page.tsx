"use client";

import { EventCarousel } from "@/components/HomeEvent/EventCarousel";
import EventTop from "@/components/HomeEvent/EventTop";
import Navbar from "@/components/Navbar";
import useEvent from "@/hooks/useEvent";
import { Event } from "@/types/event";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const event: Event = [];
 

  return (
    <main>
      <Navbar />
      <div className="container">
        <div className="flex flex-wrap justify-between mt-10">
          <EventTop />
          <EventTop />
        </div>
        <EventCarousel event={event} />
      </div>
    </main>
  );
}
