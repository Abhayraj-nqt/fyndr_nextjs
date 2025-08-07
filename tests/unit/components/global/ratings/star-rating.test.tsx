import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";

import StarRating from "@/components/global/ratings/star-rating";

// Mock Lucide React Star component
vi.mock("lucide-react", () => ({
  Star: vi.fn(({ size, className, ...props }) => (
    <div className={className} data-size={size} {...props}>
      ⭐
    </div>
  )),
}));

describe("StarRating Component", () => {
  beforeEach(() => {
    cleanup();
  });

  describe("Basic Rendering", () => {
    it("renders with default props", () => {
      render(<StarRating />);

      // Should render 5 stars by default
      const stars = screen.getAllByTestId(/^star-\d+$/);
      expect(stars).toHaveLength(5);
    });

    it("renders correct number of stars based on outOf prop", () => {
      render(<StarRating outOf={3} />);

      const stars = screen.getAllByTestId(/^star-\d+$/);
      expect(stars).toHaveLength(3);
    });

    it("renders with custom className", () => {
      render(<StarRating className="custom-class" />);

      const container = screen.getByRole("group");
      expect(container).toHaveClass("custom-class");
    });

    it("shows rating value when showValue is true", () => {
      render(<StarRating rating={3.5} showValue />);

      const valueDisplay = screen.getByTestId("rating-value");
      expect(valueDisplay).toHaveTextContent("3.5 / 5");
    });
  });

  describe("Display Ratings", () => {
    it("displays full stars correctly", () => {
      render(<StarRating rating={3} />);

      const stars = screen.getAllByTestId(/^star-\d+$/);

      // First 3 stars should have filled class
      stars.slice(0, 3).forEach((star) => {
        expect(star).toHaveClass("text-yellow-400", "fill-yellow-400");
      });

      // Last 2 stars should have empty class
      stars.slice(3).forEach((star) => {
        expect(star).toHaveClass("text-gray-300", "fill-gray-300");
      });
    });

    it("displays half stars correctly", () => {
      render(<StarRating rating={2.5} allowHalf />);

      // Should have 2 full stars, 1 half star, 2 empty stars
      const stars = screen.getAllByTestId(/^star-\d+$/);
      expect(stars).toHaveLength(5);

      // Check if half star container exists
      const halfStarContainer = stars[2];
      expect(halfStarContainer).toBeInTheDocument();
    });

    it("clamps rating to maximum value", () => {
      render(<StarRating rating={10} outOf={5} showValue />);

      const valueDisplay = screen.getByTestId("rating-value");
      expect(valueDisplay).toHaveTextContent("5.0 / 5");
    });

    it("clamps rating to minimum value", () => {
      render(<StarRating rating={-2} showValue />);

      const valueDisplay = screen.getByTestId("rating-value");
      expect(valueDisplay).toHaveTextContent("0.0 / 5");
    });
  });

  describe("Interactive Behavior", () => {
    it("calls onRatingChange when clicked in interactive mode", async () => {
      const user = userEvent.setup();
      const onRatingChange = vi.fn();

      render(<StarRating interactive onRatingChange={onRatingChange} />);

      const thirdStar = screen.getByTestId("star-2");
      await user.click(thirdStar);

      expect(onRatingChange).toHaveBeenCalledWith(3);
    });

    it("does not call onRatingChange when not interactive", async () => {
      const user = userEvent.setup();
      const onRatingChange = vi.fn();

      render(
        <StarRating interactive={false} onRatingChange={onRatingChange} />
      );

      const thirdStar = screen.getByTestId("star-2");
      await user.click(thirdStar);

      expect(onRatingChange).not.toHaveBeenCalled();
    });

    it("does not call onRatingChange when disabled", async () => {
      const user = userEvent.setup();
      const onRatingChange = vi.fn();

      render(
        <StarRating interactive disabled onRatingChange={onRatingChange} />
      );

      const thirdStar = screen.getByTestId("star-2");
      await user.click(thirdStar);

      expect(onRatingChange).not.toHaveBeenCalled();
    });

    it("handles keyboard navigation with Enter key", async () => {
      const user = userEvent.setup();
      const onRatingChange = vi.fn();

      render(<StarRating interactive onRatingChange={onRatingChange} />);

      const thirdStar = screen.getByTestId("star-2");
      thirdStar.focus();
      await user.keyboard("{Enter}");

      expect(onRatingChange).toHaveBeenCalledWith(3);
    });

    it("handles keyboard navigation with Space key", async () => {
      const user = userEvent.setup();
      const onRatingChange = vi.fn();

      render(<StarRating interactive onRatingChange={onRatingChange} />);

      const thirdStar = screen.getByTestId("star-2");
      thirdStar.focus();
      await user.keyboard(" ");

      expect(onRatingChange).toHaveBeenCalledWith(3);
    });
  });

  describe("Half Star Functionality", () => {
    it("handles half star clicks when allowHalf is true", async () => {
      const user = userEvent.setup();
      const onRatingChange = vi.fn();

      render(
        <StarRating
          interactive
          allowHalf
          onRatingChange={onRatingChange}
          rating={2.5}
        />
      );

      // Find half star interactive area
      const halfStarButton = screen.getByTestId("star-2-half");
      await user.click(halfStarButton);

      expect(onRatingChange).toHaveBeenCalledWith(2.5);
    });

    it("handles full star clicks on half star component", async () => {
      const user = userEvent.setup();
      const onRatingChange = vi.fn();

      render(
        <StarRating
          interactive
          allowHalf
          onRatingChange={onRatingChange}
          rating={2.5}
        />
      );

      // Find full star interactive area
      const fullStarButton = screen.getByTestId("star-2-full");
      await user.click(fullStarButton);

      expect(onRatingChange).toHaveBeenCalledWith(3);
    });

    it("does not show half stars when allowHalf is false", () => {
      render(<StarRating rating={2.5} allowHalf={false} />);

      // Should not have half star interactive elements
      expect(() => screen.getByTestId("star-2-half")).toThrow();
    });
  });

  describe("Hover Effects", () => {
    it("updates display rating on hover in interactive mode", async () => {
      const user = userEvent.setup();

      render(
        <StarRating interactive rating={2} showValue onRatingChange={vi.fn()} />
      );

      const fourthStar = screen.getByTestId("star-3");
      await user.hover(fourthStar);

      const valueDisplay = screen.getByTestId("rating-value");
      expect(valueDisplay).toHaveTextContent("4.0 / 5");
    });

    it("resets to original rating on mouse leave", async () => {
      const user = userEvent.setup();

      render(
        <StarRating interactive rating={2} showValue onRatingChange={vi.fn()} />
      );

      const fourthStar = screen.getByTestId("star-3");
      await user.hover(fourthStar);
      await user.unhover(fourthStar);

      const valueDisplay = screen.getByTestId("rating-value");
      expect(valueDisplay).toHaveTextContent("2.0 / 5");
    });
  });

  describe("Accessibility", () => {
    it("has proper ARIA labels for interactive stars", () => {
      render(<StarRating interactive onRatingChange={vi.fn()} />);

      const thirdStar = screen.getByTestId("star-2");
      expect(thirdStar).toHaveAttribute("aria-label", "Rate 3 out of 5 stars");
    });

    it("has proper role for interactive stars", () => {
      render(<StarRating interactive onRatingChange={vi.fn()} />);

      const stars = screen.getAllByTestId(/^star-\d+$/);
      stars.forEach((star) => {
        // Interactive stars should be button elements
        expect(star.tagName).toBe("BUTTON");
      });
    });

    it("has proper tabIndex for interactive stars", () => {
      render(<StarRating interactive onRatingChange={vi.fn()} />);

      const stars = screen.getAllByTestId(/^star-\d+$/);
      stars.forEach((star) => {
        expect(star).toHaveAttribute("tabIndex", "0");
      });
    });

    it("does not have interactive attributes when not interactive", () => {
      render(<StarRating interactive={false} />);

      const stars = screen.getAllByTestId(/^star-\d+$/);
      stars.forEach((star) => {
        // Non-interactive stars should not be button elements
        expect(star.tagName).not.toBe("BUTTON");
        expect(star).not.toHaveAttribute("aria-label");
      });
    });
  });

  describe("Precision Handling", () => {
    it("respects precision prop for rating values", async () => {
      const user = userEvent.setup();
      const onRatingChange = vi.fn();

      render(
        <StarRating
          interactive
          precision={0.1}
          onRatingChange={onRatingChange}
        />
      );

      const thirdStar = screen.getByTestId("star-2");
      await user.click(thirdStar);

      // Should still call with 3, but precision affects internal calculations
      expect(onRatingChange).toHaveBeenCalledWith(3);
    });
  });

  describe("Size Prop", () => {
    it("passes size prop to Star components", () => {
      render(<StarRating size={32} />);

      const stars = screen.getAllByTestId(/^star-\d+$/);
      stars.forEach((star) => {
        expect(star).toHaveAttribute("data-size", "32");
      });
    });
  });

  describe("Disabled State", () => {
    it("applies opacity when disabled", () => {
      render(<StarRating interactive disabled />);

      const stars = screen.getAllByTestId(/^star-\d+$/);
      stars.forEach((star) => {
        expect(star).toHaveClass("opacity-50");
      });
    });

    it("does not have cursor-pointer when disabled", () => {
      render(<StarRating interactive disabled />);

      const stars = screen.getAllByTestId(/^star-\d+$/);
      stars.forEach((star) => {
        expect(star).not.toHaveClass("cursor-pointer");
      });
    });
  });
});
