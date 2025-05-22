/**
 * Generates a pagination range based on current page and total pages
 * This is extracted as a utility to separate the logic from the component
 */
export const generatePaginationRange = (
  currentPage: number,
  totalPages: number,
  siblingCount: number = 1
) => {
  // Create an array from 1 to totalPages
  const range = (start: number, end: number) => {
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  // Always include first and last page
  const firstPageIndex = 1;
  const lastPageIndex = totalPages;

  // Calculate the start and end of the sibling range
  const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
  const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

  // Determine whether to show dots
  const shouldShowLeftDots = leftSiblingIndex > 2;
  const shouldShowRightDots = rightSiblingIndex < totalPages - 1;

  // Basic case: If the number of pages is small enough, show all pages
  if (totalPages <= 5 + siblingCount * 2) {
    return range(1, totalPages);
  }

  // Complex case: need to decide when to show dots
  if (!shouldShowLeftDots && shouldShowRightDots) {
    // No left dots, but right dots
    const leftItemCount = 3 + siblingCount * 2;
    return [...range(1, leftItemCount), -1, totalPages];
  } else if (shouldShowLeftDots && !shouldShowRightDots) {
    // Left dots, but no right dots
    const rightItemCount = 3 + siblingCount * 2;
    return [
      firstPageIndex,
      -1,
      ...range(totalPages - rightItemCount + 1, totalPages),
    ];
  } else {
    // Both left and right dots
    return [
      firstPageIndex,
      -1,
      ...range(leftSiblingIndex, rightSiblingIndex),
      -2,
      lastPageIndex,
    ];
  }
};

/**
 * Creates a default href function for pagination links
 */
export const createDefaultHref = (
  page: number,
  pageSize: number,
  basePath: string = "",
  pageParam: string = "page",
  pageSizeParam: string = "pageSize",
  size?: number
) => {
  const searchParams = new URLSearchParams();
  searchParams.set(pageParam, page.toString());
  if (size) {
    searchParams.set(pageSizeParam, size.toString());
  } else {
    searchParams.set(pageSizeParam, pageSize.toString());
  }
  return `${basePath}?${searchParams.toString()}`;
};

/**
 * Calculates pagination summary information
 */
export const calculatePaginationSummary = (
  currentPage: number,
  pageSize: number,
  totalItems: number
) => {
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  return {
    startItem,
    endItem,
  };
};

/**
 * Scroll to top helper function
 */
export const scrollToTop = (smooth: boolean = true) => {
  if (typeof window !== "undefined") {
    window.scrollTo({
      top: 0,
      behavior: smooth ? "smooth" : "auto",
    });
  }
};
