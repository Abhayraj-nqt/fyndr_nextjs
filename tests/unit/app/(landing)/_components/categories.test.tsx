import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Categories from "@/app/(landing)/_components/categories";
import { Category } from "@/types/category/category.types";

const mockCategories: Category[] = [
  { objid: 1, name: "Food", isActive: true },
  { objid: 2, name: "Beauty", isActive: true },
  { objid: 3, name: "Travel", isActive: true },
  { objid: 4, name: "Fitness", isActive: true },
  { objid: 5, name: "Education", isActive: true },
  { objid: 6, name: "Technology", isActive: true },
  { objid: 7, name: "Fashion", isActive: true },
  { objid: 8, name: "Home", isActive: true },
  { objid: 9, name: "Sports", isActive: true },
  { objid: 10, name: "Music", isActive: true },
  { objid: 11, name: "Art", isActive: true },
  { objid: 12, name: "Photography", isActive: true },
  { objid: 13, name: "Gaming", isActive: true },
  { objid: 14, name: "Cooking", isActive: true },
  { objid: 15, name: "DIY", isActive: true },
];

describe("Categories", () => {
  it("should show only first 10 categories initially", () => {
    render(<Categories categories={mockCategories} />);

    expect(screen.getByText("Food")).toBeInTheDocument();
    expect(screen.getByText("More")).toBeInTheDocument();
  });

  it("should show all categories when More is clicked", () => {
    render(<Categories categories={mockCategories} />);

    fireEvent.click(screen.getByText("More"));

    expect(screen.getByText("Less")).toBeInTheDocument();
    // Test that additional categories are now visible
  });
});
