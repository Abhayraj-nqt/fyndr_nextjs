/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, fireEvent, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

import GoTopButton from "@/components/global/buttons/go-top-button";

// Mock Next.js Image component
vi.mock("next/image", () => ({
  default: ({ src, alt, height, width, className, onClick, ...props }: any) => (
    <img
      src={src}
      alt={alt}
      height={height}
      width={width}
      className={className}
      onClick={onClick}
      data-testid="go-top-button"
      {...props}
    />
  ),
}));

describe("GoTopButton Component", () => {
  const mockScrollTo = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    Object.defineProperty(window, "scrollTo", {
      value: mockScrollTo,
      writable: true,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("does not render button initially when scrollY is 0", () => {
    Object.defineProperty(window, "scrollY", { value: 0, writable: true });
    render(<GoTopButton />);

    expect(screen.queryByTestId("go-top-button")).not.toBeInTheDocument();
  });

  it("renders button when scrollY exceeds default visibleHeight (400px)", () => {
    Object.defineProperty(window, "scrollY", { value: 500, writable: true });

    render(<GoTopButton />);

    // Trigger scroll event
    act(() => {
      fireEvent.scroll(window);
    });

    expect(screen.getByTestId("go-top-button")).toBeInTheDocument();
  });

  it("renders button when scrollY exceeds custom visibleHeight", () => {
    Object.defineProperty(window, "scrollY", { value: 250, writable: true });

    render(<GoTopButton visibleHeight={200} />);

    act(() => {
      fireEvent.scroll(window);
    });

    expect(screen.getByTestId("go-top-button")).toBeInTheDocument();
  });

  it("hides button when scrollY is below visibleHeight", () => {
    Object.defineProperty(window, "scrollY", { value: 500, writable: true });

    render(<GoTopButton />);

    // First scroll to show button
    act(() => {
      fireEvent.scroll(window);
    });

    expect(screen.getByTestId("go-top-button")).toBeInTheDocument();

    // Then scroll back to hide button
    Object.defineProperty(window, "scrollY", { value: 300, writable: true });

    act(() => {
      fireEvent.scroll(window);
    });

    expect(screen.queryByTestId("go-top-button")).not.toBeInTheDocument();
  });

  it("calls scrollTo with correct parameters when button is clicked", () => {
    Object.defineProperty(window, "scrollY", { value: 500, writable: true });

    render(<GoTopButton />);

    act(() => {
      fireEvent.scroll(window);
    });

    const button = screen.getByTestId("go-top-button");
    fireEvent.click(button);

    expect(mockScrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: "smooth",
    });
  });

  it("renders with correct image attributes", () => {
    Object.defineProperty(window, "scrollY", { value: 500, writable: true });

    render(<GoTopButton />);

    act(() => {
      fireEvent.scroll(window);
    });

    const button = screen.getByTestId("go-top-button");

    expect(button).toHaveAttribute("src", "/icons/top-circle.svg");
    expect(button).toHaveAttribute("alt", "go top");
    expect(button).toHaveAttribute("height", "40");
    expect(button).toHaveAttribute("width", "40");
    expect(button).toHaveClass(
      "fixed",
      "bottom-4",
      "right-4",
      "z-30",
      "cursor-pointer"
    );
  });

  it("removes event listener on unmount", () => {
    const removeEventListenerSpy = vi.spyOn(window, "removeEventListener");

    const { unmount } = render(<GoTopButton />);
    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "scroll",
      expect.any(Function)
    );
  });

  it("handles visibleHeight prop correctly", () => {
    // Test with scrollY exactly at threshold (should not show)
    Object.defineProperty(window, "scrollY", { value: 200, writable: true });

    render(<GoTopButton visibleHeight={200} />);

    act(() => {
      fireEvent.scroll(window);
    });

    expect(screen.queryByTestId("go-top-button")).not.toBeInTheDocument();

    // Test with scrollY above threshold (should show)
    Object.defineProperty(window, "scrollY", { value: 201, writable: true });

    act(() => {
      fireEvent.scroll(window);
    });

    expect(screen.getByTestId("go-top-button")).toBeInTheDocument();
  });
});
