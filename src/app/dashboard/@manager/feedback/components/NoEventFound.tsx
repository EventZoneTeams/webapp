import React from "react";
import { Card } from "@/components/ui/card";
import { Ban } from "lucide-react";

export default function NoEventFound() {
  return (
    <Card className="flex gap-2 h-44 w-full relative items-center justify-center">
      <Ban size={32} />
      No event found
    </Card>
  );
}
