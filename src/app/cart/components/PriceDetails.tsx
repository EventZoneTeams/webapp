import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

interface PriceDetailsProps {
  subTotal: number;
  totalAmount: number;
  onPlaceOrder: () => void;
  isLoading?: boolean;
  cartIsEmpty: boolean;
}

function PriceDetails({
  subTotal,
  totalAmount,
  onPlaceOrder,
  isLoading = false, 
  cartIsEmpty,
}: PriceDetailsProps) {
  const [couponCode, setCouponCode] = useState("");

  const handleApplyCoupon = () => {
    // Implement coupon application logic here
    console.log("Applying coupon:", couponCode);
    // Reset input after applying coupon
    setCouponCode("");
  };

  return (
    <div className="p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Coupons</h3>
      <div className="flex w-full items-center space-x-2">
        <Input
          type="text"
          placeholder="Coupons"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
        />
        <Button type="button" onClick={handleApplyCoupon}>
          Apply
        </Button>
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
        onClick={onPlaceOrder}
        className="w-full py-3 rounded mt-4"
        disabled={isLoading || cartIsEmpty}
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {isLoading ? "Placing Order..." : "Place Order"}
      </Button>
    </div>
  );
}

export default PriceDetails;
