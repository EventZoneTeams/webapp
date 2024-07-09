/**
 * v0 by Vercel.
 * @see https://v0.dev/t/GBfodzchQVF
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function page() {
  const [cart, setCart] = useState([
    {
      id: 1,
      name: "Cozy Blanket",
      price: 29.99,
      quantity: 1,
    },
    {
      id: 2,
      name: "Autumn Mug",
      price: 12.99,
      quantity: 2,
    },
    {
      id: 3,
      name: "Fall Fragrance Candle",
      price: 16.99,
      quantity: 1,
    },
  ]);
  const [step, setStep] = useState(1);
  const [shippingAddress, setShippingAddress] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("card");
  const handleQuantityChange = (id, quantity) => {
    setCart(
      cart.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };
  const handleRemoveItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };
  const handleShippingAddressChange = (field, value) => {
    setShippingAddress({ ...shippingAddress, [field]: value });
  };
  const handlePaymentMethodChange = (value) => {
    setPaymentMethod(value);
  };
  const handleSubmit = () => {
    console.log("Order submitted:", {
      cart,
      shippingAddress,
      paymentMethod,
    });
  };
  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const shippingFee = 5;
  const total = subtotal + shippingFee;
  return (
    <div className="grid md:grid-cols-[1fr_400px] gap-8 p-4 md:p-8">
      <div className="grid gap-8">
        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>Shopping Cart</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="grid grid-cols-[auto_1fr_auto] items-center gap-4"
                  >
                    <img
                      src="/placeholder.svg"
                      alt={item.name}
                      width={80}
                      height={80}
                      className="rounded-md object-cover"
                    />
                    <div className="grid gap-1">
                      <h4 className="font-medium">{item.name}</h4>
                      <p className="text-muted-foreground">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity - 1)
                        }
                        disabled={item.quantity === 1}
                      >
                        <MinusIcon className="h-4 w-4" />
                      </Button>
                      <div>{item.quantity}</div>
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
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      <TrashIcon className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Subtotal</h3>
                <p>${subtotal.toFixed(2)}</p>
              </div>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Shipping</h3>
                <p>${shippingFee.toFixed(2)}</p>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Total</h3>
                <p>${total.toFixed(2)}</p>
              </div>
              <Button onClick={() => setStep(2)} className="w-full">
                Proceed to Checkout
              </Button>
            </CardFooter>
          </Card>
        )}
        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>Shipping Address</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={shippingAddress.name}
                      onChange={(e) =>
                        handleShippingAddressChange("name", e.target.value)
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      value={shippingAddress.address}
                      onChange={(e) =>
                        handleShippingAddressChange("address", e.target.value)
                      }
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={shippingAddress.city}
                      onChange={(e) =>
                        handleShippingAddressChange("city", e.target.value)
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      value={shippingAddress.state}
                      onChange={(e) =>
                        handleShippingAddressChange("state", e.target.value)
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="zip">Zip</Label>
                    <Input
                      id="zip"
                      value={shippingAddress.zip}
                      onChange={(e) =>
                        handleShippingAddressChange("zip", e.target.value)
                      }
                    />
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter>
              <div className="flex justify-between gap-4">
                <Button variant="outline" onClick={() => setStep(1)}>
                  Back to Cart
                </Button>
                <Button onClick={() => setStep(3)}>Continue to Payment</Button>
              </div>
            </CardFooter>
          </Card>
        )}
        {step === 3 && (
          <Card>
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={paymentMethod}
                onValueChange={handlePaymentMethodChange}
                className="grid gap-4"
              >
                <Label
                  htmlFor="card"
                  className="flex items-center justify-between rounded-md border border-muted bg-background p-4 hover:bg-accent hover:text-accent-foreground data-[state=checked]:border-primary"
                >
                  <div className="flex items-center gap-4">
                    <RadioGroupItem id="card" value="card" />
                    <div>
                      <h4 className="font-medium">Credit/Debit Card</h4>
                      <p className="text-muted-foreground">
                        Pay securely with your credit or debit card.
                      </p>
                    </div>
                  </div>
                  <CreditCardIcon className="h-6 w-6" />
                </Label>
                <Label
                  htmlFor="paypal"
                  className="flex items-center justify-between rounded-md border border-muted bg-background p-4 hover:bg-accent hover:text-accent-foreground data-[state=checked]:border-primary"
                >
                  <div className="flex items-center gap-4">
                    <RadioGroupItem id="paypal" value="paypal" />
                    <div>
                      <h4 className="font-medium">PayPal</h4>
                      <p className="text-muted-foreground">
                        Pay securely with your PayPal account.
                      </p>
                    </div>
                  </div>
                  <WalletCardsIcon className="h-6 w-6" />
                </Label>
              </RadioGroup>
            </CardContent>
            <CardFooter>
              <div className="flex justify-between gap-4">
                <Button variant="outline" onClick={() => setStep(2)}>
                  Back to Shipping
                </Button>
                <Button onClick={handleSubmit}>Place Order</Button>
              </div>
            </CardFooter>
          </Card>
        )}
      </div>
      <div className="grid gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-[auto_1fr_auto] items-center gap-4"
                >
                  <img
                    src="/placeholder.svg"
                    alt={item.name}
                    width={64}
                    height={64}
                    className="rounded-md object-cover"
                  />
                  <div className="grid gap-1">
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="text-muted-foreground">
                      ${item.price.toFixed(2)} x {item.quantity}
                    </p>
                  </div>
                  <p className="font-medium">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Subtotal</h3>
              <p>${subtotal.toFixed(2)}</p>
            </div>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Shipping</h3>
              <p>${shippingFee.toFixed(2)}</p>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Total</h3>
              <p>${total.toFixed(2)}</p>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

function CreditCardIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="14" x="2" y="5" rx="2" />
      <line x1="2" x2="22" y1="10" y2="10" />
    </svg>
  );
}

function MinusIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
    </svg>
  );
}

function PlusIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

function TrashIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}

function WalletCardsIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M3 9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2" />
      <path d="M3 11h3c.8 0 1.6.3 2.1.9l1.1.9c1.6 1.6 4.1 1.6 5.7 0l1.1-.9c.5-.5 1.3-.9 2.1-.9H21" />
    </svg>
  );
}
