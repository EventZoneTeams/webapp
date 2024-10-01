"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, MoreHorizontal } from "lucide-react";
import { EventProduct as EventProductAPI } from "@/lib/api/event-product";
import { EventProduct } from "@/types/event-product";
import { Image as ImageAPI } from "@/lib/api/image";

// Component for creating a new event product
function NewEventProductDialog({
  onAdd,
  eventId,
}: {
  onAdd: (product: EventProduct) => void;
  eventId: string;
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [quantityInStock, setQuantityInStock] = useState(0);
  const [images, setImages] = useState<File[]>([]);

  const handleCreateProduct = async () => {
    try {
      const uploadedImageUrls = await Promise.all(
        images.map((image) => ImageAPI.uploadImage(image)),
      );
      const payload = {
        eventId: eventId,
        name,
        description,
        price,
        quantityInStock,
        imageUrls: uploadedImageUrls,
      };

      const response = await EventProductAPI.create(payload);

      if (response.isSuccess) {
        const newProduct: EventProduct = {
          id: "generated_id",
          eventId: eventId,
          name,
          description,
          price,
          quantityInStock,
          productImages: uploadedImageUrls.map((url) => ({
            id: "",
            imageUrl: url,
            name: "",
          })),
          createdAt: new Date().toISOString(),
          isDeleted: false,
        };
        onAdd(newProduct);
      }
    } catch (error) {
      console.error("Failed to create product:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="text-gray-400 hover:text-white"
        >
          <Plus className="mr-2 h-4 w-4" />
          New Event Product
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-background/50 backdrop-blur-xl sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New Event Product</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="Enter product name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Enter product description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="price">Price</Label>
            <Input
              type="number"
              id="price"
              placeholder="0.00"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="quantityInStock">Quantity In Stock</Label>
            <Input
              type="number"
              id="quantityInStock"
              placeholder="0"
              value={quantityInStock}
              onChange={(e) => setQuantityInStock(Number(e.target.value))}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="images">Product Images</Label>
            <Input
              type="file"
              id="images"
              multiple
              onChange={(e) => setImages(Array.from(e.target.files || []))}
            />
          </div>
        </div>
        <Button className="w-full" onClick={handleCreateProduct}>
          Create Product
        </Button>
      </DialogContent>
    </Dialog>
  );
}

// Component for displaying a single product item
function ProductItem({
  name,
  price,
  quantityInStock,
  productImages,
}: EventProduct) {
  return (
    <div className="flex items-center justify-between rounded-lg bg-background/50 p-3 backdrop-blur-xl">
      <div>
        <h3 className="font-medium">{name}</h3>
        <p className="text-sm text-gray-400">
          {price === 0 ? "Free" : `${price} VND`}
        </p>
        <p className="text-sm text-gray-400">{`In Stock: ${quantityInStock}`}</p>
      </div>
      <div className="flex items-center">
        <div className="flex space-x-2">
          {productImages.map((image) => (
            <img
              key={image.id}
              src={image.imageUrl}
              alt={image.name}
              className="h-20 w-20 rounded-lg object-cover"
            />
          ))}
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="ml-4 p-0 text-gray-400 hover:text-white"
        >
          <MoreHorizontal className="h-5 w-5" />
        </Button>
      </div>
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

  const handleAddProduct = (newProduct: EventProduct) => {
    setProducts([...products, newProduct]);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Products</h2>
        <NewEventProductDialog onAdd={handleAddProduct} eventId={eventId} />
      </div>
      <div className="space-y-3">
        {products.map((product) => (
          <ProductItem key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
}
