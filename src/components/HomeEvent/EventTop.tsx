import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { Event } from "@/types/event";

export default function EventTop({
  event,
}: {
  event: Event;
}) {
  return (
    <Card className=" hover:cursor-pointer bg-transparent border-none">
      <img
        src="https://platinumlist.net/guide/wp-content/uploads/2023/03/8359_img_worlds_of_adventure-big1613913137.jpg-1024x683.webp"
        alt="img"
        className="rounded-lg w-full h-[300px] object-cover"
      />
      <CardContent className=" w-full flex pt-4 px-0">
        <div>
          <div className="text-lg">
            SÂN KHẤU BAN MAI: KỊCH THIẾU NHI RAGO 2.0 - HÀNH TRÌNH ĐẦU TIÊN
          </div>
          <div className="flex items-center justify-between gap-2 mt-2 text-blue-400">
            <div className="flex items-center text-lg">
              <Calendar size={15} className="mr-2" />
              17:00, 28 July 2024
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
