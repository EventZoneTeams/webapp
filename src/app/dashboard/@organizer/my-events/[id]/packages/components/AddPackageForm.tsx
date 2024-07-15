"use client";

import {
  AddEventPackageType,
  AddEventPackageSchema,
  AddEventPackageSchemaDefaultValues,
} from "@/schemas/eventPackageSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
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
import useEventPackage from "@/hooks/useEventPackage";

export default function AddPackageForm() {
  const [image, setImage] = React.useState<File | null>(null);
  const { getEventProductMutation } = useEventProduct();
  const { queryObj } = useEventPackage();

  const form = useForm<AddEventPackageType>({
    resolver: zodResolver(AddEventPackageSchema),
    defaultValues: AddEventPackageSchemaDefaultValues,
  });

  const onSubmit = (data: AddEventPackageType) => {
    console.log(data);
  };

  useEffect(() => {
    getEventProductMutation.mutate({ EventId: queryObj.EventId });
  }, []);
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-2 h-96">
        {/* <ImageUpload
          image={image}
          setImage={setImage}
          deleteImage={() => setImage(null)}
          ratio={16 / 9}
        /> */}
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
