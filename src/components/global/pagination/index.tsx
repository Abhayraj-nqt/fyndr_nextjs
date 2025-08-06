"use client";

import { useSearchParams, useRouter } from "next/navigation";
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
import { formUrlQuery } from "@/lib/utils/url";

type Props = {
  className?: string;
  containerClassName?: string;
  buttonClassName?: string;
  showRowSelector?: boolean;
  scroll?: boolean;
  page: number;
  pageSize: number;
  count: number;
  isLast: boolean;
};

const Pagination = ({
  scroll = false,
  className = "",
  page = 1,
  pageSize = 10,
  containerClassName,
  count = 0,
  buttonClassName,
  showRowSelector = true,
  isLast,
}: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const pageSizeOptions = [10, 20, 50, 100];

  const totalPages = count ? Math.ceil(count / pageSize) : 0;

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;

    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "page",
      value: `${newPage}`,
    });

    router.replace(newUrl, { scroll });
  };

  const handleNext = () => {
    if (isLast) return;
    handlePageChange(page + 1);
  };

  const handlePrevious = () => {
    if (page === 1) return;
    handlePageChange(page - 1);
  };

  const handleSizeChange = (newSize = "10") => {
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "size",
      value: newSize,
    });

    router.replace(newUrl, { scroll });
  };

  const getPageButtons = () => {
    if (!count || totalPages <= 1) return [];

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
    <ShadcnPagination className={`relative w-full ${className}`}>
      <PaginationContent
        className={`flex-center relative w-full ${containerClassName} gap-[10px]`}
      >
        <PaginationItem>
          <Button
            onClick={handlePrevious}
            disabled={page === 1}
            className={cn(
              btnClassName,
              "rotate-90",
              buttonClassName,
              page === 1 ? "opacity-50 cursor-not-allowed" : ""
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
                  // Jump 5 pages on ellipsis click (matching Ant Design's behavior)
                  if (btn === "prev-ellipsis") {
                    handlePageChange(Math.max(1, page - 5));
                  } else {
                    handlePageChange(Math.min(totalPages, page + 5));
                  }
                }}
              >
                ...
              </div>
            ) : (
              <Button
                onClick={() => handlePageChange(btn as number)}
                className={cn(
                  btnClassName,
                  buttonClassName,
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
            onClick={handleNext}
            disabled={isLast}
            className={cn(
              btnClassName,
              "-rotate-90",
              buttonClassName,
              isLast ? "opacity-50 cursor-not-allowed" : ""
            )}
          >
            <DownArrow />
          </Button>
        </PaginationItem>

        {showRowSelector ? (
          <PaginationItem className="">
            <Select
              onValueChange={handleSizeChange}
              defaultValue={pageSize.toString()}
            >
              <SelectTrigger className="h-10 w-[114px] rounded-lg border-primary text-base font-medium text-primary shadow-none focus:ring-0">
                <SelectValue placeholder="Size">{pageSize}/Page</SelectValue>
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
};

export default Pagination;
