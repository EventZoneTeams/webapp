"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { EventProduct as EventProductAPI } from "@/lib/api/event-product";
import { EventProduct } from "@/types/event-product";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

// Component for displaying a single product item
function ProductItem({
  id,
  name,
  price,
  quantityInStock,
  description,
  productImages,
}: EventProduct) {
  return (
    <div className="flex items-center justify-between rounded-lg bg-background/50 p-3 backdrop-blur-xl">
      {/* <div>
        <h3 className="font-medium">{name}</h3>
        <p className="text-sm text-gray-400">{price === 0 ? 'Free' : `${price} VND`}</p>
        <p className="text-sm text-gray-400">{`In Stock: ${quantityInStock}`}</p>
      </div>
      <div className="flex items-center">
        <div className="flex space-x-2">
          {productImages.map((image) => (
            <img key={image.id} src={image.imageUrl} alt={image.name} className="w-12 h-12 rounded-lg object-cover" />
          ))}
        </div>
      </div> */}

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Card className="group flex overflow-hidden border-none bg-transparent">
              <div className="relative mr-2 h-[88px] w-[88px] flex-shrink-0 object-cover">
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
                    <p className="text-sm font-semibold">${price.toFixed(2)}</p>
                    <p className="text-xs text-gray-500">
                      In stock: {quantityInStock}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                   <div className="flex items-center space-x-1">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-6 w-6"
                        onClick={(e) => {
                          e.preventDefault();
                          // updateQuantity(product.id, quantities[product.id] - 1);
                        }}
                      >
                        <span className="sr-only">Decrease quantity</span>-
                      </Button>
                      <Input
                        type="number"
                        min="1"
                        max={quantityInStock}
                        // value={quantities[id]}
                        // onChange={(e) =>
                        //   updateQuantity(id, parseInt(e.target.value) || 1)
                        // }
  
                        className="h-6 w-10 p-0 text-center"
                        onClick={(e) => e.stopPropagation()}
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-6 w-6"
                        // onClick={(e) => {
                        //   e.preventDefault();
                        //   updateQuantity(id, quantities[id] + 1);
                        // }}
                      >
                        <span className="sr-only">Increase quantity</span>+
                      </Button>
                   </div>
                    <Button
                      // onClick={(e) => {
                      //   e.preventDefault();
                      //   handleAddToCart(product);
                      // }}
                      size="sm"
                      className="h-6 text-xs"
                      disabled={quantityInStock === 0}
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

// Main component for managing event products
export default function EventProducts({ eventId }: { eventId: string }) {
  const [products, setProducts] = useState<EventProduct[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await EventProductAPI.getProductsByEventId(eventId);
        if (response.isSuccess && response.data) {
          setProducts(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, [eventId]);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Products</h2>
      </div>
      <div className="space-y-3">
        {products.map((product) => (
          <ProductItem key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
}
