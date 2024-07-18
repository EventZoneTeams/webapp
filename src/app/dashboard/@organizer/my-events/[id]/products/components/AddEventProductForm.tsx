"use client";

import { AddDepositSchema } from "@/schemas/addDepositSchema";
import {
  AddEventProductDefaultValue,
  AddEventProductSchema,
  AddEventProductType,
} from "@/schemas/eventProductSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import ImageUpload from "@/components/ImageUpload";
import useEventProduct from "@/hooks/useEventProduct";
import { CreateEventProductSendData } from "@/api/event-product";
import { toast } from "sonner";

export default function AddEventProductForm() {
  const { getEventProductMutation, queryObj, createEventProductMutation } =
    useEventProduct();
  const [image, setImage] = React.useState<File | null>(null);
  const form = useForm<AddEventProductType>({
    resolver: zodResolver(AddEventProductSchema),
    defaultValues: AddEventProductDefaultValue,
  });

  const onSubmit = (data: AddEventProductType) => {
    if (queryObj.EventId && image) {
      const sendData: CreateEventProductSendData = {
        EventId: queryObj.EventId,
        Name: data.Name,
        Price: data.Price,
        QuantityInStock: data.QuantityInStock,
        Description: data.Description,
        fileImages: image,
      };
      createEventProductMutation.mutate(sendData);
    } else {
      toast.error("EventId is not found");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-2 gap-4">
          <ImageUpload
            ratio={16 / 9}
            setImage={setImage}
            image={image}
            deleteImage={() => {
              setImage(null);
            }}
          />
          <div className="p-4 rounded-md border space-y-4">
            <FormField
              control={form.control}
              name="Name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="Price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price (VND)</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <span className="absolute top-1/2 right-4 -translate-y-1/2 text-sm">
                        (VND)
                      </span>
                      <Input
                        placeholder="Enter the price of the product"
                        {...field}
                        value={field.value.toLocaleString()}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, "");
                          field.onChange(Number(value));
                        }}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="QuantityInStock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity In Stock</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="shadcn"
                      {...field}
                      type="number"
                      min={0}
                      value={field.value}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, "");
                        field.onChange(Number(value));
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="Description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Description"
                      {...field}
                      rows={3}
                      className=""
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={createEventProductMutation.isPending}
        >
          {createEventProductMutation.isPending ? "Loading..." : "Add Product"}
        </Button>
      </form>
    </Form>
  );
}
