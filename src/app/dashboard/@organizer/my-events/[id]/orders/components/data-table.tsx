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
import { Collapsible, CollapsibleTrigger } from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { CollapsibleContent } from "@radix-ui/react-collapsible";
import { EventOrder } from "@/types/event-order";
import PackageCard from "@/app/dashboard/@organizer/my-events/[id]/orders/components/PackageCard";

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
    <div className=" border">
      <Table>
        <TableHeader className="bg-background">
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
              const orderRow = row.original as EventOrder;
              return (
                <Collapsible key={row.id} asChild>
                  <>
                    <CollapsibleTrigger asChild className="cursor-pointer">
                      <TableRow
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
                          <div className="space-y-2">
                            {orderRow.eventOrderDetails.map((orderDetail) => (
                              <div className="flex items-center gap-4">
                                <div>
                                  <div className="font-semibold text-xl">
                                    {orderDetail.quantity} x{" "}
                                  </div>
                                </div>
                                <div className="flex-1">
                                  <PackageCard id={orderDetail.packageId} />
                                </div>
                              </div>
                            ))}
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
