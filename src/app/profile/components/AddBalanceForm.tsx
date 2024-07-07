import React from "react";
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
import useWallet from "@/hooks/useWallet";

export default function AddBalanceForm({
  walletType,
}: {
  walletType: WalletType;
}) {
  const { addDepositTransactionMutation } = useWallet();
  const form = useForm<AddDepositSchemaType>({
    resolver: zodResolver(AddDepositSchema),
    defaultValues: AddDepositSchemaDefaultValues,
  });

  const onSubmit = (data: AddDepositSchemaType) => {
    console.log(walletType);
    console.log(data);
    if (walletType === "PERSONAL") {
      addDepositTransactionMutation.mutate({
        amount: Number(data.amount),
      });
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 ">
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Deposit amount</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter amount to deposit"
                  {...field}
                  value={Intl.NumberFormat("vn-Vi", {
                    style: "currency",
                    currency: "VND",
                  }).format(Number(field.value))}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");
                    field.onChange(Number(value));
                  }}
                  autoFocus
                />
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
          disabled={
            !form.formState.isValid || addDepositTransactionMutation.isPending
          }
        >
          {addDepositTransactionMutation.isPending ? "Adding..." : "Add"}
        </Button>
      </form>
    </Form>
  );
}
