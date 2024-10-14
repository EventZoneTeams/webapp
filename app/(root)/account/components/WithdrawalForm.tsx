"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
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
import { toast } from "sonner";
import { Wallet } from "@/lib/api/wallet";

const withdrawalSchema = z.object({
  amount: z.number().min(20000, "Amount must be at least 20,000 VND"),
  bankName: z.string().min(1, "Bank name is required"),
  bankAccountNumber: z.string().min(1, "Bank account number is required"),
  bankAccountName: z.string().min(1, "Bank account name is required"),
});

type WithdrawalFormValues = z.infer<typeof withdrawalSchema>;

export default function WithdrawalForm({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  const [isPending, setIsPending] = useState(false);

  const form = useForm<WithdrawalFormValues>({
    resolver: zodResolver(withdrawalSchema),
    defaultValues: {
      amount: 20000,
      bankName: "",
      bankAccountNumber: "",
      bankAccountName: "",
    },
  });

  async function onSubmit(data: WithdrawalFormValues) {
    setIsPending(true);
    try {
      const bankNote = `Bank Name: ${data.bankName}, Account Number: ${data.bankAccountNumber}, Account Name: ${data.bankAccountName}`;
      const response = await Wallet.createWithdrawalRequest({
        amount: data.amount,
        bankNote: bankNote,
      });
      if (response.isSuccess) {
        toast.success("Withdrawal request submitted successfully");
        onSuccess();
        form.reset();
      } else {
        toast.error(response.message || "Failed to submit withdrawal request");
      }
    } catch (error) {
      toast.error("An error occurred while submitting the withdrawal request");
    } finally {
      setIsPending(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Withdrawal Amount</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    field.onChange(value);
                  }}
                  min={20000}
                  step={1000}
                />
              </FormControl>
              <FormDescription>
                Enter the amount you wish to withdraw (minimum 20,000 VND)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bankName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bank Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>Enter the name of your bank</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bankAccountNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bank Account Number</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>Enter your bank account number</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bankAccountName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bank Account Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                Enter the name on your bank account
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending} className="w-full">
          {isPending ? "Submitting..." : "Submit Withdrawal Request"}
        </Button>
      </form>
    </Form>
  );
}
