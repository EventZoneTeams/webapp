"use client";

import {
  CreateEventPackageSendData,
  PackageProductSendData,
} from "@/api/event-package";
import ImageUpload from "@/components/ImageUpload";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import useEventPackage from "@/hooks/useEventPackage";
import useEventProduct from "@/hooks/useEventProduct";
import { cn } from "@/lib/utils";
import {
  AddEventPackageSchema,
  AddEventPackageSchemaDefaultValues,
  AddEventPackageType,
} from "@/schemas/eventPackageSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ChevronDownIcon,
  ChevronUpCircleIcon,
  ChevronUpIcon,
} from "lucide-react";
import Image from "next/image";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function AddPackageForm({ params }: { params: { id: string } }) {
  const [image, setImage] = React.useState<File | null>(null);
  const { getEventProductMutation } = useEventProduct();
  const { createEventPackageMutation } = useEventPackage();
  const [selectedProducts, setSelectedProducts] = React.useState<
    PackageProductSendData[]
  >([]);

  const handleIncreaeProduct = (productId: number, quantityInStock: number) => {
    const product = selectedProducts.find((p) => p.productid === productId);
    if (product) {
      product.quantity += 1;
      if (product.quantity > quantityInStock)
        product.quantity = quantityInStock;
      if (product.quantity) setSelectedProducts([...selectedProducts]);
    } else {
      setSelectedProducts([
        ...selectedProducts,
        { productid: productId, quantity: 1 },
      ]);
    }
  };

  const handleDecreaseProduct = (productId: number) => {
    const product = selectedProducts.find((p) => p.productid === productId);
    if (product) {
      if (product.quantity > 1) {
        product.quantity -= 1;
        setSelectedProducts([...selectedProducts]);
      } else {
        setSelectedProducts(
          selectedProducts.filter((p) => p.productid !== productId)
        );
      }
    }
  };

  const form = useForm<AddEventPackageType>({
    resolver: zodResolver(AddEventPackageSchema),
    defaultValues: AddEventPackageSchemaDefaultValues,
  });

  const onSubmit = (data: AddEventPackageType) => {
    if (image) {
      const sendData: CreateEventPackageSendData = {
        eventId: Number(params.id),
        Description: data.description,
        Title: data.title,
        Products: selectedProducts,
        Thumbnail: image,
      };
      console.log(sendData);
      createEventPackageMutation.mutate(sendData);
    }
  };

  useEffect(() => {
    getEventProductMutation.mutate({
      EventId: Number(params.id),
      isDeleted: false,
      PageIndex: 1,
      PageSize: 20,
    });
  }, []);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4 h-96">
        <ImageUpload
          image={image}
          setImage={setImage}
          deleteImage={() => setImage(null)}
          ratio={16 / 9}
        />
        <ScrollArea className="h-96 ">
          <div className="space-y-4">
            {getEventProductMutation.data?.map((product) => (
              <div
                key={product.id}
                className={cn(
                  "flex gap-4 p-2 pr-4 rounded-lg bg-muted cursor-pointer ",
                  selectedProducts.find((p) => p.productid === product.id) &&
                    "bg-green-300 hover:bg-green-400 text-green-800",
                  product.quantityInStock <= 0 && "hidden"
                )}
              >
                <div
                  className={cn(
                    "w-10 line-clamp-1 flex items-center justify-center",
                    selectedProducts.find((p) => p.productid === product.id) &&
                      " bg-green-200 text-green-800 rounded-md"
                  )}
                >
                  {
                    selectedProducts.find((p) => p.productid === product.id)
                      ?.quantity
                  }
                </div>
                <Image
                  src={product.productImages[0].imageUrl}
                  alt={product.description}
                  width={160}
                  height={90}
                  className="h-full aspect-video  object-cover rounded-lg"
                />
                <div className="flex-1">
                  <div className="text-lg font-semibold">
                    {product.description}
                  </div>
                  <div className="flex gap-2 items-center">
                    <div className="font-normal text-sm">Price:</div>
                    {Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(product.price)}
                  </div>
                  <div className="flex gap-2 items-center">
                    <div className="font-normal text-sm">Total products:</div>
                    {product.quantityInStock}
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Button
                    variant={"ghost"}
                    className="text-gray-500"
                    onClick={() => {
                      handleIncreaeProduct(product.id, product.quantityInStock);
                    }}
                  >
                    <ChevronUpIcon size={20} />
                  </Button>
                  <Button
                    variant={"ghost"}
                    className="text-gray-500"
                    onClick={() => {
                      handleDecreaseProduct(product.id);
                    }}
                  >
                    <ChevronDownIcon size={20} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="title" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea {...field} placeholder="description" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full"
            disabled={createEventPackageMutation.isPending}
          >
            {createEventPackageMutation.isPending ? "Creating..." : "Create"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
