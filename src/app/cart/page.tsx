"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { MinusIcon, PlusIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import Navbar from "@/components/Navbar";

export default function CartPage() {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [subTotal, setSubTotal] = useState<number>(0);
  const [totalAmount, setTotalAmount] = useState<number>(0);

  useEffect(() => {
    const cart = localStorage.getItem("cart");
    if (cart) {
      setCartItems(JSON.parse(cart));
    }
  }, []);

  useEffect(() => {
    const subtotal = cartItems.reduce((sum, item) => {
      return sum + item.quantity * item.totalPrice;
    }, 0);
    setSubTotal(subtotal);

    setTotalAmount(subtotal);
  }, [cartItems]);

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    const updatedCartItems = cartItems.map((item) =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCartItems);
    localStorage.setItem("cart", JSON.stringify(updatedCartItems));
  };

  const handleRemoveItem = (itemId: string) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCartItems);
    localStorage.setItem("cart", JSON.stringify(updatedCartItems));
  };

  const handlePlaceOrder = async () => {
    const orderDetails = cartItems.map((item) => ({
      "package-id": item.id,
      quantity: item.quantity,
    }));
    const eventId = 14;
    const orderData = {
      "event-id": eventId,
      "event-order-details": orderDetails,
    };

    try {
      const response = await fetch(
        "https://ez-api.azurewebsites.net/api/v1/event-orders",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Order placed successfully:", data);
      } else {
        console.error("Failed to place order:", response.statusText);
      }
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  return (
    <main>
      <Navbar />
      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-semibold mb-4">Cart</h2>
            <div className="p-6 rounded-lg shadow-md">
              {cartItems?.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center mb-6 border-b pb-4"
                >
                  {/* <Checkbox
                    checked={item.isChecked}
                    onChange={() => handleCheckSingle(item.id)}
                  /> */}
                  <img
                    src={item.thumbnailUrl}
                    alt={item.description}
                    className="ml-4 mr-4 object-cover h-[120px] w-[200px] rounded-2xl"
                  />

                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">
                      {item.description}
                    </h3>
                    <p className="text-gray-500">{item.description}</p>
                    <div className="flex items-center mt-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() =>
                          handleQuantityChange(
                            item.id,
                            Math.max(1, item.quantity - 1)
                          )
                        }
                        disabled={item.quantity === 1}
                      >
                        <MinusIcon className="h-4 w-4" />
                      </Button>
                      <span className="mx-2">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity + 1)
                        }
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
                  <button
                    className="ml-4 text-sm"
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Coupons</h3>
            <div className="flex w-full items-center space-x-2">
              <Input type="text" placeholder="Coupons" />
              <Button type="submit">Apply</Button>
            </div>

            <h3 className="text-lg font-semibold mt-6 mb-4">Price Details</h3>
            <div className="text-sm">
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>
                  {Intl.NumberFormat("vi-vn", {
                    style: "currency",
                    currency: "VND",
                  }).format(subTotal)}
                </span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Coupon discount</span>
                <span>None</span>
              </div>
              <div className="flex justify-between font-semibold text-lg mt-4">
                <span>Total Amount</span>
                <span>
                  {Intl.NumberFormat("vi-vn", {
                    style: "currency",
                    currency: "VND",
                  }).format(totalAmount)}
                </span>
              </div>
            </div>
            <Button
              onClick={handlePlaceOrder}
              className="w-full py-3 rounded mt-4"
            >
              Place order
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
