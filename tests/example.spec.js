// @ts-check
const { test, expect } = require("@playwright/test");

test("mock test", async ({ page }) => {
  await page.goto("https://playwright.dev/");
  await expect(page).toHaveTitle(/Playwright/);
});
