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
import { Wallet } from "@/lib/api/wallet";
import { useRouter } from "next/navigation";

export default function AddBalanceForm({
  walletType,
}: {
  walletType: WalletType;
}) {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const form = useForm<AddDepositSchemaType>({
    resolver: zodResolver(AddDepositSchema),
    defaultValues: AddDepositSchemaDefaultValues,
  });

  const onSubmit = async (data: AddDepositSchemaType) => {
    if (walletType === "PERSONAL") {
      setIsPending(true);
      try {
        const response = await Wallet.addDeposit({
          amount: Number(data.amount),
        });
        if (response.isSuccess) {
          console.log("Deposit added successfully", response);
          if (typeof response.data === "string" && response.data) {
            router.push(response.data);
          }
        } else {
          console.error("Failed to add deposit:", response.message);
        }
      } catch (error) {
        console.error("An error occurred while adding deposit:", error);
      } finally {
        setIsPending(false);
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Deposit Amount Input */}
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Deposit Amount</FormLabel>
              <FormControl>
                <div className="relative">
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm">
                    VND
                  </span>
                  <Input
                    autoFocus
                    placeholder="Enter the deposit amount"
                    {...field}
                    value={field.value}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "");
                      field.onChange(value ? Number(value) : "");
                    }}
                  />
                </div>
              </FormControl>
              <FormDescription>
                Enter the amount you want to deposit. Minimum deposit 10,000
                VND.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Agreement Checkbox */}
        <FormField
          control={form.control}
          name="agree"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  required
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
                  of the deposit.
                </FormDescription>
              </div>
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full"
          disabled={!form.formState.isValid || isPending}
        >
          {isPending ? "Processing..." : "Add"}
        </Button>
      </form>
    </Form>
  );
}
