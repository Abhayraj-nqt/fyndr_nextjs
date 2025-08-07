/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";

import GoBackButton from "@/components/global/buttons/go-back-button";

// Mock Next.js navigation
const mockBack = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    back: mockBack,
  }),
}));

// Mock Lucide React icon
vi.mock("lucide-react", () => ({
  ArrowLeft: ({ size, ...props }: any) => (
    <svg data-testid="arrow-left-icon" width={size} height={size} {...props}>
      <path d="arrow-left" />
    </svg>
  ),
}));

describe("GoBackButton Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default styling", () => {
    render(<GoBackButton />);

    const button = screen.getByText("Go Back").parentElement;
    const icon = screen.getByTestId("arrow-left-icon");
    const text = screen.getByText("Go Back");

    expect(button).toBeInTheDocument();
    expect(icon).toBeInTheDocument();
    expect(text).toBeInTheDocument();
  });

  it("applies base CSS classes correctly", () => {
    render(<GoBackButton />);

    const button = screen.getByText("Go Back").parentElement;

    expect(button).toHaveClass("flex-center");
    expect(button).toHaveClass("body-2");
    expect(button).toHaveClass("min-w-fit");
    expect(button).toHaveClass("max-w-fit");
    expect(button).toHaveClass("cursor-pointer");
    expect(button).toHaveClass("gap-1");
    expect(button).toHaveClass("text-black-60");
  });

  it("applies custom className when provided", () => {
    render(<GoBackButton className="mb-2" />);

    const button = screen.getByText("Go Back").parentElement;

    expect(button).toHaveClass("mb-2");
    expect(button).toHaveClass("flex-center"); // Should still have base classes
  });

  it("renders ArrowLeft icon with correct size", () => {
    render(<GoBackButton />);

    const icon = screen.getByTestId("arrow-left-icon");

    expect(icon).toHaveAttribute("width", "20");
    expect(icon).toHaveAttribute("height", "20");
  });

  it("calls router.back() when clicked", () => {
    render(<GoBackButton />);

    const button = screen.getByText("Go Back").parentElement;
    fireEvent.click(button!);

    expect(mockBack).toHaveBeenCalledTimes(1);
  });

  it("calls router.back() on multiple clicks", () => {
    render(<GoBackButton />);

    const button = screen.getByText("Go Back").parentElement;

    fireEvent.click(button!);
    fireEvent.click(button!);
    fireEvent.click(button!);

    expect(mockBack).toHaveBeenCalledTimes(3);
  });

  it("renders correct text content", () => {
    render(<GoBackButton />);

    expect(screen.getByText("Go Back")).toBeInTheDocument();
  });

  it("has correct DOM structure", () => {
    render(<GoBackButton />);

    const button = screen.getByText("Go Back").parentElement;
    const icon = screen.getByTestId("arrow-left-icon");
    const span = screen.getByText("Go Back");

    expect(button).toContainElement(icon);
    expect(button).toContainElement(span);
    expect(span.tagName).toBe("SPAN");
  });

  it("combines multiple custom classes correctly", () => {
    render(<GoBackButton className="mb-2 ml-2 py-4" />);

    const button = screen.getByText("Go Back").parentElement;
    expect(button).toHaveClass("mb-2");
    expect(button).toHaveClass("ml-2");
    expect(button).toHaveClass("py-4");
    expect(button).toHaveClass("flex-center"); // Base classes should still be there
  });
});
