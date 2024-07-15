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
import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { EventPackage } from "@/types/event-packages.";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

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
    <div className="border">
      <Table>
        <TableHeader className={cn("bg-background")}>
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
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => {
              const packageRow = row.original as EventPackage;
              return (
                <Collapsible key={row.id} className="overflow-hidden" asChild>
                  <>
                    <CollapsibleTrigger asChild className="cursor-pointer">
                      <TableRow
                        key={row.id}
                        data-state={row.getIsSelected() && "selected"}
                        className={cn("select-none")}
                      >
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
                          <div className="gap-4 grid grid-cols-2">
                            <div className=" col-span-1 ">
                              <div className="grid grid-cols-2 gap-4 p-2 pr-4 rounded-lg bg-background">
                                <Image
                                  src={packageRow.thumbnailUrl}
                                  alt={packageRow.description}
                                  width={320}
                                  height={180}
                                  className="rounded-lg aspect-video object-cover"
                                />
                                <div className="flex flex-col gap-2 space-y-2">
                                  <div className="flex gap-2 items-center">
                                    <div className="text-lg font-semibold">
                                      {packageRow.description}
                                    </div>
                                    <div>
                                      <Badge
                                        className={cn(
                                          packageRow.isDeleted
                                            ? "bg-red-200 text-red-800 hover:bg-red-300"
                                            : "bg-green-200 text-green-800 hover:bg-green-300"
                                        )}
                                      >
                                        {packageRow.isDeleted
                                          ? "Deactived"
                                          : "Actived"}
                                      </Badge>
                                    </div>
                                  </div>
                                  <div className="flex gap-2">
                                    <div className="font-semibold">Price:</div>
                                    <div>
                                      {Intl.NumberFormat("vi-VN", {
                                        style: "currency",
                                        currency: "VND",
                                      }).format(packageRow.totalPrice)}
                                    </div>
                                  </div>
                                  <div className="flex gap-2">
                                    <div className="font-semibold">
                                      Total products:
                                    </div>
                                    {packageRow.productsInPackage.length}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className=" space-y-2 col-span-1">
                              {packageRow.productsInPackage.map((product) => (
                                <div
                                  key={product.eventProduct.id}
                                  className="flex gap-2"
                                >
                                  <div className="p-2 bg-background rounded-lg w-full flex gap-4">
                                    <div>
                                      <Image
                                        src={
                                          product.eventProduct.productImages[0]
                                            .imageUrl
                                        }
                                        alt={product.eventProduct.description}
                                        width={120}
                                        height={80}
                                        className="rounded-lg aspect-video object-cover"
                                      />
                                    </div>
                                    <div className="flex flex-col justify-between">
                                      <div className="font-semibold text-base">
                                        {product.eventProduct.description}
                                        {" - x"}
                                        {product.quantity}
                                      </div>
                                      <div>
                                        {Intl.NumberFormat("vi-VN", {
                                          style: "currency",
                                          currency: "VND",
                                        }).format(product.eventProduct.price)}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
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
