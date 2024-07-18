"use client";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import CartItem from "./components/CartItem";
import PriceDetails from "./components/PriceDetails";
import { ShoppingCart } from "lucide-react";
import useEventOrder from "@/hooks/useEventOrder";
import { CreateEventOrderSendData } from "@/api/event-order";

export default function CartPage() {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [subTotal, setSubTotal] = useState<number>(0);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false); // Loading state
  const cartIsEmpty = !cartItems || cartItems.length === 0;

  const { createEventOrderMutation } = useEventOrder();

  useEffect(() => {
    const cart = localStorage.getItem("cart");
    if (cart) {
      const parsedCart = JSON.parse(cart);
      const sortedCart = parsedCart.sort((a: any, b: any) => b.id - a.id);
      setCartItems(sortedCart);
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
    setIsLoading(true); // Start loading

    const orderDetails = cartItems.map((item) => ({
      "package-id": item.id,
      quantity: item.quantity,
    }));

    const sendData: CreateEventOrderSendData = {
      "event-id": 14,
      "event-order-details": orderDetails,
    };

    try {
      console.log(sendData);
      await createEventOrderMutation.mutateAsync(sendData); // Assuming mutate is async

      // Clear cart after successful order placement
      setCartItems([]);
      localStorage.removeItem("cart");
    } catch (error) {
      console.error("Error placing order:", error);
      // Handle error if needed
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <main>
      <Navbar />
      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <ShoppingCart className="mr-2" />
              Cart
            </h2>
            {cartIsEmpty ? (
              <div className="flex items-center mb-6 border-b pb-4">
                <p className="text-lg font-semibold">Cart is empty.</p>
              </div>
            ) : (
              <div className="p-6 rounded-lg shadow-md">
                {cartItems?.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onQuantityChange={handleQuantityChange}
                    onRemoveItem={handleRemoveItem}
                  />
                ))}
              </div>
            )}
          </div>
          <div className="lg:col-span-1">
            <PriceDetails
              subTotal={subTotal}
              totalAmount={totalAmount}
              onPlaceOrder={handlePlaceOrder}
              isLoading={isLoading}
              cartIsEmpty = {cartIsEmpty}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
