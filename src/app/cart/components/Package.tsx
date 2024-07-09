import { Button } from "@/components/ui/button";
import { MinusIcon, PlusIcon } from "lucide-react";

export default function Package() {
  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="icon"
        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
        disabled={item.quantity === 1}
      >
        <MinusIcon className="h-4 w-4" />
      </Button>
      <div>{item.quantity}</div>
      <Button
        variant="outline"
        size="icon"
        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
      >
        <PlusIcon className="h-4 w-4" />
      </Button>
    </div>
  );
}
