/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

import Button from "@/components/global/buttons";

// Mock the shadcn Button component
vi.mock("@/components/ui/button", () => ({
  Button: ({ children, className, ...props }: any) => (
    <button className={className} {...props}>
      {children}
    </button>
  ),
}));

describe("Button Component", () => {
  it("renders with default props", () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole("button", { name: /click me/i });
    expect(button).toBeInTheDocument();
  });

  it("applies base classes correctly", () => {
    render(<Button>Base Button</Button>);
    const button = screen.getByRole("button");

    expect(button).toHaveClass("self-center");
    expect(button).toHaveClass("!rounded-10");
    expect(button).toHaveClass("px-4");
    expect(button).toHaveClass("py-3");
    expect(button).toHaveClass("text-base");
    expect(button).toHaveClass("font-normal");
    expect(button).toHaveClass("shadow-none");
    expect(button).toHaveClass("disabled:!cursor-not-allowed");
  });

  describe("variant prop", () => {
    it("applies primary variant classes", () => {
      render(<Button variant="primary">Primary</Button>);
      const button = screen.getByRole("button");

      expect(button).toHaveClass("bg-primary");
      expect(button).toHaveClass("text-white");
      expect(button).toHaveClass("hover:bg-primary");
      expect(button).toHaveClass("hover:text-white");
    });

    it("applies primary-outlined variant classes", () => {
      render(<Button variant="primary-outlined">Primary Outlined</Button>);
      const button = screen.getByRole("button");

      expect(button).toHaveClass("border");
      expect(button).toHaveClass("border-primary");
      expect(button).toHaveClass("text-primary");
      expect(button).toHaveClass("bg-white");
      expect(button).toHaveClass("hover:text-primary");
      expect(button).toHaveClass("hover:border-primary");
      expect(button).toHaveClass("hover:bg-white");
    });

    it("applies primary-dark variant classes", () => {
      render(<Button variant="primary-dark">Primary Dark</Button>);
      const button = screen.getByRole("button");

      expect(button).toHaveClass("bg-secondary");
      expect(button).toHaveClass("text-white");
      expect(button).toHaveClass("hover:bg-secondary");
      expect(button).toHaveClass("hover:text-white");
    });

    it("applies primary-dark-outlined variant classes", () => {
      render(
        <Button variant="primary-dark-outlined">Primary Dark Outlined</Button>
      );
      const button = screen.getByRole("button");

      expect(button).toHaveClass("border");
      expect(button).toHaveClass("border-secondary");
      expect(button).toHaveClass("text-secondary");
      expect(button).toHaveClass("bg-white");
      expect(button).toHaveClass("hover:border-secondary");
      expect(button).toHaveClass("hover:text-secondary");
      expect(button).toHaveClass("hover:bg-white");
    });

    it("applies no custom variant classes when variant is undefined", () => {
      render(<Button>No Variant</Button>);
      const button = screen.getByRole("button");

      // Should not have any variant-specific classes
      expect(button).not.toHaveClass("bg-primary");
      expect(button).not.toHaveClass("bg-secondary");
      expect(button).not.toHaveClass("border-primary");
      expect(button).not.toHaveClass("border-secondary");
    });
  });

  describe("stdHeight prop", () => {
    it("applies min-h-11 class when stdHeight is true", () => {
      render(<Button stdHeight>Standard Height</Button>);
      const button = screen.getByRole("button");

      expect(button).toHaveClass("min-h-11");
    });

    it("does not apply min-h-11 class when stdHeight is false", () => {
      render(<Button stdHeight={false}>No Standard Height</Button>);
      const button = screen.getByRole("button");

      expect(button).not.toHaveClass("min-h-11");
    });

    it("does not apply min-h-11 class when stdHeight is undefined (default)", () => {
      render(<Button>Default Height</Button>);
      const button = screen.getByRole("button");

      expect(button).not.toHaveClass("min-h-11");
    });
  });

  describe("stdWidth prop", () => {
    it("applies min-w-36 class when stdWidth is true", () => {
      render(<Button stdWidth>Standard Width</Button>);
      const button = screen.getByRole("button");

      expect(button).toHaveClass("min-w-36");
    });

    it("does not apply min-w-36 class when stdWidth is false", () => {
      render(<Button stdWidth={false}>No Standard Width</Button>);
      const button = screen.getByRole("button");

      expect(button).not.toHaveClass("min-w-36");
    });

    it("does not apply min-w-36 class when stdWidth is undefined (default)", () => {
      render(<Button>Default Width</Button>);
      const button = screen.getByRole("button");

      expect(button).not.toHaveClass("min-w-36");
    });
  });

  describe("className prop", () => {
    it("applies custom className", () => {
      render(<Button className="mb-2">Custom Class</Button>);
      const button = screen.getByRole("button");

      expect(button).toHaveClass("mb-2");
    });

    it("combines custom className with base classes", () => {
      render(
        <Button className="mb-2" variant="primary">
          Combined Classes
        </Button>
      );
      const button = screen.getByRole("button");

      expect(button).toHaveClass("mb-2");
      expect(button).toHaveClass("bg-primary");
      expect(button).toHaveClass("self-center");
    });

    it("handles undefined className gracefully", () => {
      render(<Button className={undefined}>Undefined Class</Button>);
      const button = screen.getByRole("button");

      // Should still have base classes
      expect(button).toHaveClass("self-center");
    });
  });

  describe("props forwarding", () => {
    it("forwards additional props to ShadcnButton", () => {
      render(
        <Button disabled data-testid="custom-button">
          Disabled Button
        </Button>
      );
      const button = screen.getByTestId("custom-button");

      expect(button).toBeDisabled();
    });

    it("forwards onClick handler", () => {
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>Clickable</Button>);
      const button = screen.getByRole("button");

      button.click();
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("forwards type prop", () => {
      render(<Button type="submit">Submit Button</Button>);
      const button = screen.getByRole("button");

      expect(button).toHaveAttribute("type", "submit");
    });
  });

  describe("combined props", () => {
    it("applies all props together correctly", () => {
      render(
        <Button variant="primary" stdHeight stdWidth className="mb-2" disabled>
          Combined Props
        </Button>
      );
      const button = screen.getByRole("button");

      // Variant classes
      expect(button).toHaveClass("bg-primary");
      expect(button).toHaveClass("text-white");

      // Standard dimensions
      expect(button).toHaveClass("min-h-11");
      expect(button).toHaveClass("min-w-36");

      // Custom class
      expect(button).toHaveClass("mb-2");

      // Base classes
      expect(button).toHaveClass("self-center");
      expect(button).toHaveClass("!rounded-10");

      // Props forwarding
      expect(button).toBeDisabled();
    });
  });
});
