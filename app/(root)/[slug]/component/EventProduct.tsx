"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { EventProduct as EventProductAPI } from "@/lib/api/event-product";
import { EventProduct, ProductImage } from "@/types/event-product";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { ShoppingCart, X } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { VnDong } from "@/lib/format";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import ProductItem from "./ProductItem";
import { EventOrder as EventOrderAPI } from "@/lib/api/event-order";
import { ApiResponse } from "@/types/api";

// Main component for event products
export interface CartItem {
  id: string;
  name: string;
  price: number;
  description?: string;
  productImages: ProductImage[];
  quantity: number;
  quantityInStock: number;
}

export default function EventProducts({ eventId }: { eventId: string }) {
  const [products, setProducts] = useState<EventProduct[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) => {
          if (item.id === id) {
            const newQuantity = Math.max(
              0,
              Math.min(item.quantityInStock, item.quantity + delta),
            );
            if (newQuantity === item.quantityInStock && delta > 0) {
              toast.warning(
                "You've reached the maximum available stock for this item.",
              );
            }
            return { ...item, quantity: newQuantity };
          }
          return item;
        })
        .filter((item) => item.quantity > 0),
    );
  };

  const handleAddToCart = (newItem: CartItem) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === newItem.id);
      if (existingItem) {
        const totalQuantity = existingItem.quantity + newItem.quantity;
        const updatedQuantity = Math.min(
          existingItem.quantityInStock,
          totalQuantity,
        );
        if (updatedQuantity === existingItem.quantityInStock) {
          toast.warning(
            "You've reached the maximum available stock for this item.",
          );
        }
        return prevItems.map((item) =>
          item.id === newItem.id
            ? { ...item, quantity: updatedQuantity }
            : item,
        );
      }
      return [...prevItems, newItem];
    });
  };

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    const payload = {
      eventId,
      eventOrderDetails: cartItems.map((item) => ({
        eventProductId: item.id,
        quantity: item.quantity,
      })),
    };

    try {
      const response: ApiResponse<null> = await EventOrderAPI.create(payload);
      if (response.isSuccess) {
        toast.success("Order placed successfully!");
        setCartItems([]);
      } else {
        toast.error(response.message || "Failed to place order.");
      }
    } catch (error: any) {
      toast.error("An error occurred while placing the order.");
      console.error(error);
    }
  };

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

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Products</h2>
        <Drawer direction="right">
          <DrawerTrigger asChild>
            <Button
              className="hover:bg-primary/10 focus-visible:bg-primary/10"
              variant={"ghost"}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Cart ({totalItems})
            </Button>
          </DrawerTrigger>

          <DrawerContent className="left-auto right-0 h-full w-1/3">
            <DrawerHeader>
              <DrawerTitle>Event Cart</DrawerTitle>
              <DrawerDescription>
                Review your items before checkout.
              </DrawerDescription>
            </DrawerHeader>
            <ScrollArea className="h-[60vh] px-4">
              {/* Check if the cart is empty */}
              {cartItems.length === 0 ? (
                <div className="flex h-full items-center justify-center text-gray-500">
                  <p>Your cart is empty.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <TooltipProvider key={item.id}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="flex items-start space-x-4 pb-4">
                            <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden">
                              {item.productImages.length > 0 && (
                                <Image
                                  src={item.productImages[0].imageUrl}
                                  alt={item.productImages[0].name}
                                  fill
                                  className="object-cover object-center"
                                />
                              )}
                            </div>
                            <div className="flex flex-1 flex-col">
                              <div className="flex justify-between text-base font-medium">
                                <h3>{item.name}</h3>
                                <p className="ml-4">
                                  {VnDong.format(item.price * item.quantity)}
                                </p>
                              </div>
                              <p className="line-clamp-1 text-sm text-gray-500">
                                {item.description}
                              </p>
                              <div className="mt-2 flex items-center justify-between text-sm">
                                <div className="flex items-center space-x-2">
                                  <Button
                                    className="h-6 w-6 hover:bg-primary/10 focus-visible:bg-primary/10"
                                    size="icon"
                                    variant="ghost"
                                    onClick={() =>
                                      handleUpdateQuantity(item.id, -1)
                                    }
                                  >
                                    <span className="sr-only">
                                      Decrease quantity
                                    </span>
                                    -
                                  </Button>
                                  <Input
                                    type="number"
                                    min="1"
                                    max={item.quantityInStock}
                                    value={item.quantity}
                                    className="h-6 w-7 border-none bg-transparent p-0 text-center [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                                    onChange={(e) => {
                                      const inputQuantity = Math.min(
                                        item.quantityInStock,
                                        Math.max(
                                          1,
                                          parseInt(e.target.value) || 1,
                                        ),
                                      );
                                      handleUpdateQuantity(
                                        item.id,
                                        inputQuantity - item.quantity,
                                      );
                                    }}
                                  />
                                  <Button
                                    className="h-6 w-6 hover:bg-primary/10 focus-visible:bg-primary/10"
                                    size="icon"
                                    variant="ghost"
                                    disabled={
                                      item.quantity >= item.quantityInStock
                                    } // Disable if max quantity is reached
                                    onClick={() =>
                                      handleUpdateQuantity(item.id, 1)
                                    }
                                  >
                                    <span className="sr-only">
                                      Increase quantity
                                    </span>
                                    +
                                  </Button>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() =>
                                    handleUpdateQuantity(
                                      item.id,
                                      -item.quantity,
                                    )
                                  }
                                >
                                  <X className="mr-1 h-4 w-4" />
                                  Remove
                                </Button>
                              </div>
                            </div>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent
                          side="right"
                          align="start"
                          className="w-[300px] p-4"
                        >
                          <h3 className="mb-2 font-semibold">{item.name}</h3>
                          <p className="text-sm">{item.description}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ))}
                </div>
              )}
            </ScrollArea>
            <DrawerFooter>
              {cartItems.length > 0 && (
                <div className="mb-4 flex items-center justify-between">
                  <span className="font-bold">Total:</span>
                  <span className="font-bold">{VnDong.format(totalPrice)}</span>
                </div>
              )}
              <Button
                className="w-full"
                disabled={cartItems.length === 0}
                onClick={handleCheckout}
              >
                Checkout
              </Button>
              <DrawerClose asChild>
                <Button variant="outline" className="w-full">
                  Close
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
      <div className="space-y-3">
        {products.map((product) => {
          const currentQuantityInCart =
            cartItems.find((item) => item.id === product.id)?.quantity || 0;
          return (
            <ProductItem
              key={product.id}
              {...product}
              currentQuantityInCart={currentQuantityInCart} // Pass current cart quantity
              onAddToCart={handleAddToCart}
            />
          );
        })}
      </div>
    </div>
  );
}
