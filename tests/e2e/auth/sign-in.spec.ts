import { test, expect } from "@playwright/test";

test.describe("Sign In", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/sign-in");
  });

  test("should display the sign-in form", async ({ page }) => {
    await expect(page.locator("form")).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  //   test("should allow user to sign in with valid credentials", async ({
  //     page,
  //   }) => {});
});
