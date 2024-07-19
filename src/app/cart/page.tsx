"use client";
import { useEffect, useState, useCallback } from "react";
import Navbar from "@/components/Navbar";
import CartItem from "./components/CartItem";
import PriceDetails from "./components/PriceDetails";
import { ShoppingCart } from "lucide-react";
import useEventOrder from "@/hooks/useEventOrder";
import { CreateEventOrderSendData } from "@/api/event-order";

export interface IPackage {
  id: number;
  quantity: number;
  price?: number; // Optional price field
}

interface ICartItem {
  eventId: string;
  packages: IPackage[];
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<ICartItem[]>([]);
  const [subTotal, setSubTotal] = useState<number>(0);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false); // Loading state
  const cartIsEmpty = !cartItems || cartItems.length === 0;

  const { createEventOrderMutation } = useEventOrder();

  useEffect(() => {
    const cart = localStorage.getItem("cart");
    if (cart) {
      const parsedCart = JSON.parse(cart);
      setCartItems(parsedCart);
    }
  }, []);

  useEffect(() => {
    const subtotal = cartItems.reduce((sum, item) => {
      return (
        sum +
        item.packages.reduce((pkgSum, pkg) => {
          return pkgSum + pkg.quantity * (pkg.price || 0); // Use actual package price
        }, 0)
      );
    }, 0);
    setSubTotal(subtotal);
    setTotalAmount(subtotal);
  }, [cartItems]);

  const handleQuantityChange = (
    eventId: string,
    packageId: number,
    newQuantity: number
  ) => {
    const updatedCartItems = cartItems.map((item) =>
      item.eventId === eventId
        ? {
            ...item,
            packages: item.packages.map((pkg) =>
              pkg.id === packageId ? { ...pkg, quantity: newQuantity } : pkg
            ),
          }
        : item
    );
    setCartItems(updatedCartItems);
    localStorage.setItem("cart", JSON.stringify(updatedCartItems));
  };

  const handleRemoveItem = (eventId: string, packageId: number) => {
    const updatedCartItems = cartItems
      .map((item) =>
        item.eventId === eventId
          ? {
              ...item,
              packages: item.packages.filter((pkg) => pkg.id !== packageId),
            }
          : item
      )
      .filter((item) => item.packages.length > 0);
    setCartItems(updatedCartItems);
    localStorage.setItem("cart", JSON.stringify(updatedCartItems));
  };

  const handlePriceUpdate = useCallback(
    (packageId: number, price: number) => {
      setCartItems((prevItems) =>
        prevItems.map((item) => ({
          ...item,
          packages: item.packages.map((pkg) =>
            pkg.id === packageId ? { ...pkg, price } : pkg
          ),
        }))
      );
    },
    [setCartItems]
  );

  const handlePlaceOrder = async () => {
    setIsLoading(true);

    // Flatten order details
    const orderDetails = cartItems.flatMap((item) =>
      item.packages.map((pkg) => ({
        "package-id": pkg.id,
        quantity: pkg.quantity,
      }))
    );

    const sendData: CreateEventOrderSendData = {
      "event-id": 2,
      "event-order-details": orderDetails,
    };

    try {
      console.log(sendData);
      await createEventOrderMutation.mutateAsync(sendData);

      // Clear cart after successful order placement
      setCartItems([]);
      localStorage.removeItem("cart");
    } catch (error) {
      console.error("Error placing order:", error);
    } finally {
      setIsLoading(false);
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
                {cartItems.map((item, index) => (
                  <div key={index}>
                    {item.packages.map((pkg) => (
                      <CartItem
                        key={pkg.id}
                        item={{
                          ...pkg,
                        }}
                        onQuantityChange={(packageId, newQuantity) =>
                          handleQuantityChange(
                            item.eventId,
                            packageId,
                            newQuantity
                          )
                        }
                        onRemoveItem={(packageId) =>
                          handleRemoveItem(item.eventId, packageId)
                        }
                        onPriceUpdate={handlePriceUpdate}
                      />
                    ))}
                  </div>
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
              cartIsEmpty={cartIsEmpty}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
