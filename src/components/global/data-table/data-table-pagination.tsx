"use client";

import type { Table } from "@tanstack/react-table";
import React from "react";

import DownArrow from "@/components/icons/down-arrow";
import { Button } from "@/components/ui/button";
import {
  Pagination as ShadcnPagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface DataTablePaginationProps<TData> extends React.ComponentProps<"div"> {
  table: Table<TData>;
  pageSizeOptions?: number[];
  showRowSelector?: boolean;
}

export function DataTablePagination<TData>({
  table,
  pageSizeOptions = [10, 20, 50, 100],
  showRowSelector = true,
  className,
  ...props
}: DataTablePaginationProps<TData>) {
  const page = table.getState().pagination.pageIndex + 1;
  const pageSize = table.getState().pagination.pageSize;
  const totalPages = table.getPageCount();
  const isLast = !table.getCanNextPage();

  const getPageButtons = () => {
    if (totalPages <= 1) return [];

    const pageButtons = [];
    const itemsPerSide = 2;

    // For small number of pages, show all pages
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pageButtons.push(i);
      }
      return pageButtons;
    }

    // Add first page
    pageButtons.push(1);

    // Calculate left and right boundaries
    const leftBoundary = Math.max(2, page - itemsPerSide);
    const rightBoundary = Math.min(totalPages - 1, page + itemsPerSide);

    // Add ellipsis after first page if needed
    if (leftBoundary > 2) {
      pageButtons.push("prev-ellipsis");
    }

    // Add pages around current page
    for (let i = leftBoundary; i <= rightBoundary; i++) {
      pageButtons.push(i);
    }

    // Add ellipsis before last page if needed
    if (rightBoundary < totalPages - 1) {
      pageButtons.push("next-ellipsis");
    }

    // Add last page
    if (totalPages > 1) {
      pageButtons.push(totalPages);
    }

    return pageButtons;
  };

  const btnClassName = `size-10 rounded-lg border border-primary bg-white p-4 text-primary shadow-none hover:bg-white text-base font-medium`;
  const pageButtons = getPageButtons();

  return (
    <ShadcnPagination
      className={`relative w-full py-3 ${className}`}
      {...props}
    >
      <PaginationContent className="flex-center relative w-full gap-[10px]">
        <PaginationItem>
          <Button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className={cn(
              btnClassName,
              "rotate-90",
              !table.getCanPreviousPage() ? "opacity-50 cursor-not-allowed" : ""
            )}
          >
            <DownArrow />
          </Button>
        </PaginationItem>

        {/* Direct page buttons */}
        {pageButtons.map((btn, index) => (
          <PaginationItem key={`page-btn-${index}`}>
            {btn === "prev-ellipsis" || btn === "next-ellipsis" ? (
              <div
                className="flex size-10 cursor-pointer items-center justify-center"
                onClick={() => {
                  // Jump 5 pages on ellipsis click
                  if (btn === "prev-ellipsis") {
                    table.setPageIndex(Math.max(0, page - 6));
                  } else {
                    table.setPageIndex(Math.min(totalPages - 1, page + 4));
                  }
                }}
              >
                ...
              </div>
            ) : (
              <Button
                onClick={() => table.setPageIndex((btn as number) - 1)}
                className={cn(
                  btnClassName,
                  page === btn
                    ? "bg-primary text-white hover:bg-primary hover:text-white"
                    : ""
                )}
              >
                {btn}
              </Button>
            )}
          </PaginationItem>
        ))}

        <PaginationItem>
          <Button
            onClick={() => table.nextPage()}
            disabled={isLast}
            className={cn(
              btnClassName,
              "-rotate-90",
              isLast ? "opacity-50 cursor-not-allowed" : ""
            )}
          >
            <DownArrow />
          </Button>
        </PaginationItem>

        {showRowSelector ? (
          <PaginationItem>
            <Select
              value={`${pageSize}`}
              onValueChange={(value) => {
                table.setPageSize(Number(value));
              }}
            >
              <SelectTrigger className="h-10 w-[114px] rounded-lg border-primary text-base font-medium text-primary shadow-none focus:ring-0">
                <SelectValue>{pageSize}/Page</SelectValue>
              </SelectTrigger>
              <SelectContent className="text-base font-medium text-primary hover:text-primary">
                {pageSizeOptions.map((size) => (
                  <SelectItem
                    key={size}
                    value={size.toString()}
                    className="data-[highlighted]:bg-primary-10 data-[highlighted]:text-primary"
                  >
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </PaginationItem>
        ) : (
          <></>
        )}
      </PaginationContent>
    </ShadcnPagination>
  );
}
