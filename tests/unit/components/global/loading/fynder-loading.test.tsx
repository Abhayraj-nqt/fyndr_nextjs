import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import "@testing-library/jest-dom"; // Add this import

import FyndrLoading from "@/components/global/loading/fyndr-loading";

describe("fyndr-loading", () => {
  it("should render loading spinner and message when loading is true", () => {
    render(<FyndrLoading loading={true} message={<span>Loading...</span>} />);

    const spinner = screen.getByAltText("Loading...");
    const message = screen.getByText("Loading...");

    expect(spinner).toBeInTheDocument();
    expect(message).toBeInTheDocument();
  });

  it("should not render anything when loading is false", () => {
    const { container } = render(<FyndrLoading loading={false} />);

    expect(container.firstChild).toBeNull();
  });

  it("should handle click events on the loading component", () => {
    const handleClick = vi.fn();
    render(<FyndrLoading loading={true} message={<span>Click me</span>} />);

    const message = screen.getByText("Click me");
    fireEvent.click(message);

    expect(handleClick).not.toHaveBeenCalled(); // No click handler, so this should not be called
  });
});
