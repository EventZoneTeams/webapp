"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { EventProduct } from "@/types/event-product";
import Image from "next/image";
import { Fragment } from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { ChevronUp, Pencil, Trash2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import DeleteButton from "@/app/dashboard/@organizer/my-events/[id]/products/components/DeleteButton";
import { cn } from "@/lib/utils";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader className="bg-background rounded-lg">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody className="bg-background">
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => {
              const productRow = row.original as EventProduct;
              return (
                <Collapsible key={row.id} asChild>
                  <>
                    <CollapsibleTrigger asChild className="cursor-pointer">
                      <TableRow data-state={row.getIsSelected() && "selected"}>
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    </CollapsibleTrigger>
                    <CollapsibleContent asChild>
                      <TableRow className="ease-linear duration-200 transition-all">
                        <TableCell colSpan={columns.length}>
                          <div className="flex gap-4 ">
                            <div className="h-full">
                              <Image
                                src={productRow.productImages[0].imageUrl}
                                width={320}
                                height={180}
                                alt={productRow.name}
                                className="rounded-lg aspect-video object-cover h-full"
                              />
                            </div>
                            <div className="space-y-2 flex-1">
                              <div className="flex gap-4 items-center">
                                <h1 className="text-xl font-semibold flex-1">
                                  {productRow.name}
                                </h1>
                                <p className="text-gray-500">
                                  ({format(productRow.createdAt, "Pp")})
                                </p>
                              </div>

                              <p>
                                <span className="font-semibold mr-2">Id:</span>
                                {productRow.id}
                              </p>
                              <p>
                                <span className="font-semibold mr-2">
                                  Price:
                                </span>
                                {Intl.NumberFormat("vn-Vi", {
                                  style: "currency",
                                  currency: "VND",
                                }).format(productRow.price)}
                              </p>
                              <p>
                                <span className="font-semibold mr-2">
                                  Quantity in Stock:
                                </span>
                                {productRow.quantityInStock}
                              </p>
                              <p className="text-gray-500 ">
                                {productRow.description}
                              </p>
                            </div>
                          </div>
                          <Separator className="my-2" />
                          <div
                            className={cn(
                              "flex items-center gap-4",
                              productRow.isDeleted && "hidden"
                            )}
                          >
                            <div className="flex-1">
                              <CollapsibleTrigger asChild>
                                <Button variant={"ghost"}>
                                  <ChevronUp size={20} />
                                </Button>
                              </CollapsibleTrigger>
                            </div>
                            <div
                              className={cn(
                                "flex gap-2 items-center justify-end",
                                productRow.isDeleted && "hidden"
                              )}
                            >
                              <DeleteButton productId={productRow.id} />
                              <Button className="flex gap-2 text-blue-800 bg-blue-200 hover:bg-blue-300">
                                <Pencil size={20} />
                                Edit
                              </Button>
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    </CollapsibleContent>
                  </>
                </Collapsible>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
