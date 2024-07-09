import { useEffect, useState } from "react";
import { format, differenceInSeconds } from "date-fns";
import { Calendar, MapPin } from "lucide-react";
import { Event } from "@/types/event";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function Ticket({ event }: { event: Event }) {
  const calculateTimeLeft = (): TimeLeft => {
    const now = new Date();
    const difference = differenceInSeconds(new Date(event.EventStartDate), now);

    let timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (60 * 60 * 24)),
        hours: Math.floor((difference % (60 * 60 * 24)) / (60 * 60)),
        minutes: Math.floor((difference % (60 * 60)) / 60),
        seconds: Math.floor(difference % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [event.EventStartDate]);

  return (
    <div className="relative mt-12">
      <div className="absolute text-black left-24 top-8">
        <p className="font-semibold text-2xl">{event.Name}</p>
        <div className="flex items-center text-lg mt-2">
          {timeLeft.days !== undefined ? (
            <div className="mt-5">
              <p className="text-black font-bold text-xl">Start In...</p>
              <div className="flex items-center justify-around w-full mt-4">
                <div className="flex flex-col items-center">
                  <span className="text-4xl font-bold text-black">
                    {timeLeft.days}
                  </span>
                  <span className="text-sm font-medium text-gray-600">
                    Days
                  </span>
                </div>
                <div className="ml-10 flex flex-col items-center">
                  <span className="text-4xl font-bold text-black">
                    {String(timeLeft.hours).padStart(2, "0")}
                  </span>
                  <span className="text-sm font-medium text-gray-600">
                    Hours
                  </span>
                </div>
                <div className="ml-10 flex flex-col items-center">
                  <span className="text-4xl font-bold text-black">
                    {String(timeLeft.minutes).padStart(2, "0")}
                  </span>
                  <span className="text-sm font-medium text-gray-600">
                    Mins
                  </span>
                </div>
                <div className="ml-10 flex flex-col items-center">
                  <span className="text-4xl font-bold text-black">
                    {String(timeLeft.seconds).padStart(2, "0")}
                  </span>
                  <span className="text-sm font-medium text-gray-600">Sec</span>
                </div>
              </div>
            </div>
          ) : (
            <span className="text-black font-bold text-xl">Event Started!</span>
          )}
        </div>
        <div className="flex items-center text-lg mt-8">
          <Calendar size={25} className="mr-2" />
          {format(new Date(event.EventStartDate), "HH:mm, dd MMMM yyyy")}
        </div>
        <div className="flex items-center text-lg mt-6">
          <MapPin size={25} className="mr-2" />
          {event.Location}
        </div>
      </div>
      <div className="">
        <div className="flex justify-center">
          <img
            className="object-cover w-[530px] h-[350px] rounded-l-2xl"
            src="/images/ticket.png"
          />
          <img
            className="ml-1 object-cover w-[800px] h-[350px] rounded-r-2xl"
            src={event?.ThumbnailUrl ?? ""}
          />
          <div className="absolute w-[80px] h-[80px] bg-secondary-background rounded-full -bottom-12 left-[492px]"></div>
          <div className="absolute w-[80px] h-[80px] bg-secondary-background rounded-full -top-12 left-[492px]"></div>
        </div>
      </div>
    </div>
  );
}
