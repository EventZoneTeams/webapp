"use client";

import {
  UpdateEventProductDefaultValue,
  UpdateEventProductSchema,
  UpdateEventProductType,
} from "@/schemas/eventProductSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useMemo } from "react";
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
import useEventProduct from "@/hooks/useEventProduct";

export default function UpdateProductForm({
  productId,
}: {
  productId: number;
}) {
  const { getEventProductByIdMutation, updateEventProductMuation } =
    useEventProduct();
  const form = useForm<UpdateEventProductType>({
    resolver: zodResolver(UpdateEventProductSchema),
    defaultValues: UpdateEventProductDefaultValue,
  });

  const onSubmit = (data: UpdateEventProductType) => {
    console.log(data);
    updateEventProductMuation.mutate({
      productId,
      data,
    });
  };

  useEffect(() => {
    getEventProductByIdMutation.mutate(productId);
  }, []);

  const product = useMemo(() => {
    return getEventProductByIdMutation.data?.data;
  }, [getEventProductByIdMutation.data]);

  useEffect(() => {
    if (product) {
      form.setValue("Name", product.name);
      form.setValue("Price", product.price);
      form.setValue("QuantityInStock", product.quantityInStock);
      form.setValue("Description", product.description);
    }
  }, [product]);

  return getEventProductByIdMutation.isPending ? (
    <div className="h-96 animate-pulse"></div>
  ) : (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="Name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} autoFocus />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="Price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
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
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="QuantityInStock"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantity in stock</FormLabel>
              <FormControl>
                <Input
                  placeholder="shadcn"
                  {...field}
                  value={field.value}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");
                    field.onChange(Number(value));
                  }}
                />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
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
                <Textarea {...field} placeholder="description" rows={3} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full"
          disabled={updateEventProductMuation.isPending}
        >
          {updateEventProductMuation.isPending ? "Loading..." : "Update"}
        </Button>
      </form>
    </Form>
  );
}
