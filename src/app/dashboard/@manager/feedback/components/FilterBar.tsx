import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";
import React from "react";

export default function FilterBar() {
  return (
    <div className="flex gap-2 items-center">
      <Input placeholder="Search..." />
      <Button variant={"outline"} className="flex items-center gap-2">
        <Filter size={18} />
        Filter
      </Button>
    </div>
  );
}
