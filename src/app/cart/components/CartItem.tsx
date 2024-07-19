import { Button } from "@/components/ui/button";
import { MinusIcon, PlusIcon } from "lucide-react";
import { IPackage } from "../page";
import useEventPackage from "@/hooks/useEventPackage";
import { useEffect, useMemo } from "react";

interface CartItemProps {
  item: IPackage;
  onQuantityChange: (itemId: number, newQuantity: number) => void;
  onRemoveItem: (itemId: number) => void;
  onPriceUpdate: (packageId: number, price: number) => void; // New prop
}

function CartItem({
  item,
  onQuantityChange,
  onRemoveItem,
  onPriceUpdate,
}: CartItemProps) {
  const { getEventPackageByIdMutation } = useEventPackage();

  useEffect(() => {
    getEventPackageByIdMutation.mutate(Number(item.id));
  }, [item.id]);

  const eventPackage = useMemo(
    () => getEventPackageByIdMutation.data,
    [getEventPackageByIdMutation.data]
  );

  useEffect(() => {
    if (eventPackage?.data?.totalPrice) {
      onPriceUpdate(item.id, eventPackage.data.totalPrice);
    }
  }, [eventPackage, item.id, onPriceUpdate]);

  return (
    eventPackage && (
      <div className="flex items-center mb-6 border-b pb-4">
        <img
          src={eventPackage?.data?.thumbnailUrl}
          alt={eventPackage?.data?.title}
          className="ml-4 mr-4 object-cover h-[120px] w-[200px] rounded-2xl"
        />
        <div className="flex-1">
          <h3 className="text-lg font-semibold">{eventPackage?.data?.title}</h3>
          <p className="text-gray-500">{eventPackage?.data?.description}</p>
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
          }).format(item.quantity * eventPackage?.data?.totalPrice)}
        </div>
        <button className="ml-4 text-sm" onClick={() => onRemoveItem(item.id)}>
          ×
        </button>
      </div>
    )
  );
}

export default CartItem;
