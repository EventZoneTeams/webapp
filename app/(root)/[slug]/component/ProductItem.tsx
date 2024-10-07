"use client";

import { Button } from "@/components/ui/button";
import { EventProduct } from "@/types/event-product";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { VnDong } from "@/lib/format";
import { toast } from "sonner";
import { CartItem } from "./EventProduct";

// Component for displaying a single product item
export default function ProductItem({
  id,
  name,
  price,
  quantityInStock,
  description,
  productImages,
  onAddToCart,
  currentQuantityInCart,
}: EventProduct & {
  onAddToCart: (item: CartItem) => void;
  currentQuantityInCart: number;
}) {
  const handleAddToCart = () => {
    if (currentQuantityInCart >= quantityInStock) {
      toast.warning(
        "You've reached the maximum available stock for this item.",
      );
      return;
    }
    onAddToCart({
      id,
      name,
      price,
      description,
      productImages,
      quantity: 1,
      quantityInStock,
    });
    toast.success(`${name} has been added to the cart`);
  };

  return (
    <div className="flex items-center justify-between rounded-lg bg-background/50 p-3 backdrop-blur-xl">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Card className="group flex overflow-hidden border-none bg-transparent">
              <div className="relative mr-4 h-[88px] w-[88px] flex-shrink-0 object-cover">
                {productImages.map((image) => (
                  <Image
                    key={image.id}
                    src={image.imageUrl}
                    alt={name}
                    fill
                    className="object-cover"
                  />
                ))}
              </div>
              <div className="flex flex-grow flex-col justify-between">
                <div>
                  <h3 className="truncate text-sm font-semibold">{name}</h3>
                  <p className="line-clamp-1 text-xs text-gray-500 transition-all duration-300 ease-in-out">
                    {description}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold">
                      {VnDong.format(price)}
                    </p>
                    <p className="text-xs text-gray-500">
                      In stock: {quantityInStock}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      size="sm"
                      className="h-6 text-xs"
                      disabled={currentQuantityInCart >= quantityInStock} // Disable if max quantity reached
                      onClick={handleAddToCart}
                    >
                      Add
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </TooltipTrigger>
          <TooltipContent side="right" align="start" className="w-[300px] p-4">
            <h3 className="mb-2 font-semibold">{name}</h3>
            <p className="text-sm">{description}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
