import { type Table as TanstackTable, flexRender } from "@tanstack/react-table";
import type * as React from "react";

import { DataTablePagination } from "@/components/global/data-table/data-table-pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { getCommonPinningStyles } from "@/lib/utils/table/data-table";

interface DataTableProps<TData> extends React.ComponentProps<"div"> {
  table: TanstackTable<TData>;
  actionBar?: React.ReactNode;
  enableRowIndicator?: boolean;
  getRowIndicatorColor?: (row: TData) => string;
}

export function DataTable<TData>({
  table,
  actionBar,
  children,
  className,
  enableRowIndicator = false,
  getRowIndicatorColor,
  ...props
}: DataTableProps<TData>) {
  return (
    <div
      className={cn("flex w-full flex-col gap-2.5 overflow-auto", className)}
      {...props}
    >
      {children}
      <div className="overflow-hidden rounded-[10px]">
        <Table>
          <TableHeader className="bg-primary hover:bg-primary">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="bg-primary text-white hover:bg-primary"
              >
                {headerGroup.headers.map((header, headerIndex) => {
                  const isFirstHeader = headerIndex === 0;
                  const isLastHeader =
                    headerIndex === headerGroup.headers.length - 1;

                  return (
                    <TableHead
                      key={header.id}
                      colSpan={header.colSpan}
                      style={{
                        ...getCommonPinningStyles({ column: header.column }),
                      }}
                      className={cn(
                        "bg-primary hover:bg-primary text-white p-4 text-sm font-normal border border-secondary-20"
                      )}
                    >
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
          <TableBody className="rounded-b-[10px]">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell, cellIndex) => {
                    const isFirstCell = cellIndex === 0;
                    const shouldShowIndicator = enableRowIndicator && isFirstCell && getRowIndicatorColor;
                    const indicatorColor = shouldShowIndicator ? getRowIndicatorColor(row.original) : '';
                    
                    return (
                      <TableCell
                        key={cell.id}
                        style={{
                          ...getCommonPinningStyles({ column: cell.column }),
                        }}
                        className={cn(
                          "p-4 text-sm font-normal text-[#333] border border-[#d3d6e1]",
                          shouldShowIndicator && "relative"
                        )}
                      >
                        {shouldShowIndicator && indicatorColor && (
                          <div 
                            className={cn(
                              "absolute left-0 top-0 w-[7px] h-full rounded-tr-md rounded-br-md",
                              indicatorColor
                            )}
                          />
                        )}
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={table.getAllColumns().length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex flex-col gap-2.5">
        <DataTablePagination table={table} />
        {actionBar &&
          table.getFilteredSelectedRowModel().rows.length > 0 &&
          actionBar}
      </div>
    </div>
  );
}