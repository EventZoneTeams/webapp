import { Button } from "@/components/ui/button";
import { MinusIcon, PlusIcon } from "lucide-react";

interface CartItemProps {
  item: any;
  onQuantityChange: (itemId: string, newQuantity: number) => void;
  onRemoveItem: (itemId: string) => void;
}

function CartItem({ item, onQuantityChange, onRemoveItem }: CartItemProps) {
  return (
    <div className="flex items-center mb-6 border-b pb-4">
      <img
        src={item.thumbnailUrl}
        alt={item.title}
        className="ml-4 mr-4 object-cover h-[120px] w-[200px] rounded-2xl"
      />
      <div className="flex-1">
        <h3 className="text-lg font-semibold">{item.title}</h3>
        <p className="text-gray-500">{item.description}</p>
        <div className="flex items-center mt-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() =>
              onQuantityChange(item.id, Math.max(1, item.quantity - 1))
            }
            disabled={item.quantity === 1}
          >
            <MinusIcon className="h-4 w-4" />
          </Button>
          <span className="mx-2">{item.quantity}</span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => onQuantityChange(item.id, item.quantity + 1)}
          >
            <PlusIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="text-lg font-semibold">
        {Intl.NumberFormat("vi-vn", {
          style: "currency",
          currency: "VND",
        }).format(item.quantity * item.totalPrice)}
      </div>
      <button className="ml-4 text-sm" onClick={() => onRemoveItem(item.id)}>
        ×
      </button>
    </div>
  );
}

export default CartItem;
