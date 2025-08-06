import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import PlaceholderImage from "@/components/global/placeholder-image";
import ASSETS from "@/constants/assets";

describe("PlaceholderImage", () => {
  it("should render with correct src and alt attributes", () => {
    render(
      <PlaceholderImage
        src={ASSETS.IMAGES.ILLUSTRATION.EMPTY}
        alt="Test image"
        width={100}
        height={100}
      />
    );

    const image = screen.getByAltText("Test image");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute(
      "src",
      expect.stringContaining("/images/empty-illustration.svg")
    );
  });

  it("should fallback to placeholder on image error", () => {
    render(
      <PlaceholderImage
        src="/broken-image.jpg"
        alt="Test image"
        width={100}
        height={100}
        placeholderImageUrl={ASSETS.IMAGES.PLACEHOLDER.FYNDR}
      />
    );

    const image = screen.getByAltText("Test image");

    // Simulate image load error
    fireEvent.error(image);

    expect(image).toHaveAttribute(
      "src",
      expect.stringContaining(ASSETS.IMAGES.PLACEHOLDER.FYNDR)
    );
  });
});
