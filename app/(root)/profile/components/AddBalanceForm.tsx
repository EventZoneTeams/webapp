import React, { useState } from "react";
import {
  AddDepositSchema,
  AddDepositSchemaDefaultValues,
  AddDepositSchemaType,
} from "@/schemas/addDepositSchema";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { WalletType } from "@/types/wallet";
import { addDeposit } from "@/lib/api/wallet";

export default function AddBalanceForm({
  walletType,
}: {
  walletType: WalletType;
}) {
  // State to handle loading and form submission status
  const [isPending, setIsPending] = useState(false);
  const form = useForm<AddDepositSchemaType>({
    resolver: zodResolver(AddDepositSchema),
    defaultValues: AddDepositSchemaDefaultValues,
  });

  // Submission handler
  const onSubmit = async (data: AddDepositSchemaType) => {
    console.log(walletType);
    console.log(data);
    if (walletType === "PERSONAL") {
      setIsPending(true); // Set pending state before making the API call
      try {
        const response = await addDeposit({
          amount: Number(data.amount),
        });
        if (response.isSuccess) {
          // Handle success, e.g., show a success message or redirect
          console.log("Deposit added successfully", response);
        } else {
          // Handle error from API
          console.error("Failed to add deposit:", response.message);
        }
      } catch (error) {
        console.error("An error occurred while adding deposit:", error);
      } finally {
        setIsPending(false); // Reset the pending state
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Deposit amount</FormLabel>
              <FormControl>
                <div className="relative">
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm">
                    (VND)
                  </span>
                  <Input
                    autoFocus
                    placeholder="Enter the amount"
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
                This is the amount you want to deposit
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="agree"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  Agree to the terms and conditions of the deposit
                </FormLabel>
                <FormDescription>
                  By checking this box, you agree to the{" "}
                  <Link
                    href={"/"}
                    className="text-blue-500 underline underline-offset-2"
                  >
                    terms and conditions
                  </Link>{" "}
                  of the deposit
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full"
          disabled={!form.formState.isValid || isPending}
        >
          {isPending ? "Adding..." : "Add"}
        </Button>
      </form>
    </Form>
  );
}
