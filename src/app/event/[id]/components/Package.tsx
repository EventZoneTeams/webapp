import PackageCard from "@/components/Package/PackageCard";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { EventPackage } from "@/types/event-packages.";
import { MinusIcon, PlusIcon } from "lucide-react";
import { useState } from "react";

export default function Package({
  eventPackages,
}: {
  eventPackages: EventPackage[];
}) {
  const [quantity, setQuantity] = useState<number>(1);

  const handleAddToCart = (eventPackage: EventPackage) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    const existingPackageIndex = cart.findIndex(
      (item: { id: number }) => item.id === eventPackage.id
    );

    if (existingPackageIndex !== -1) {
      cart[existingPackageIndex].quantity += quantity;
    } else {
      cart.push({ ...eventPackage, quantity });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    setQuantity(1); // Reset quantity after adding to cart
  };
  return (
    <div className="p-6 w-[500px]">
      <p className=" text-2xl mb-6 font-semibold">Packages</p>
      <div className="">
        {eventPackages?.map((eventPackage) => (
          <Dialog key={eventPackage.id}>
            <DialogTrigger asChild>
              <button onClick={() => setQuantity(1)}>
                <PackageCard eventPackage={eventPackage} />
              </button>
            </DialogTrigger>

            <DialogContent className="lg:min-w-[950px] md:min-w-[950px] sm:min-w-[950px] max-h-[95vh]">
              <section className="p-5 max-h-[90vh] overflow-auto">
                <section className="mb-12 flex justify-between">
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h2 className="text-xl font-bold mb-4">
                        {eventPackage.description}
                      </h2>
                      <p>{eventPackage.description}</p>
                    </div>
                    <div>
                      <p className="text-xl font-bold text-tertiary mt-6 mb-4">
                        {Intl.NumberFormat("vi-vn", {
                          style: "currency",
                          currency: "VND",
                        }).format(eventPackage.totalPrice)}
                      </p>

                      <div className="flex items-center">
                        <div className="flex items-center gap-2 mr-4">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setQuantity(quantity - 1)}
                            disabled={quantity === 1}
                          >
                            <MinusIcon className="h-4 w-4" />
                          </Button>
                          <div className="w-4 flex items-center justify-center">
                            {quantity}
                          </div>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setQuantity(quantity + 1)}
                          >
                            <PlusIcon className="h-4 w-4" />
                          </Button>
                        </div>

                        <Button
                          onClick={() => handleAddToCart(eventPackage)}
                          className="bg-tertiary text-slate-50 hover:bg-sky-600 hover:text-slate-200"
                        >
                          Add to cart
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 flex justify-end items-center">
                    <img
                      className="object-cover h-[240px] w-[400px] rounded-2xl"
                      src={eventPackage.thumbnailUrl}
                    />
                  </div>
                </section>

                <section className="mt-6">
                  <h3 className="text-lg font-semibold -mb-2">
                    Package Details
                  </h3>
                  {eventPackage.productsInPackage.map((product) => (
                    <div
                      key={product.productId}
                      className="flex items-center mt-6 max-w-[600px]"
                    >
                      <div className="w-[200px]">
                        <img
                          src={product.eventProduct.productImages[0].imageUrl} // de nem cook
                          alt={product.eventProduct.name}
                          className="object-cover h-[120px] w-[200px] rounded-xl"
                        />
                      </div>
                      <div className="ml-4 flex flex-col justify-between w-[400px] h-[120px]">
                        <div>
                          <h4 className="text-md font-semibold">
                            {product.eventProduct.name}
                          </h4>
                          <p className="text-sm line-clamp-3">
                            {product.eventProduct.description}
                          </p>
                        </div>
                        <p className="text-tertiary">
                          Quantity: {product.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                </section>
              </section>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  );
}
