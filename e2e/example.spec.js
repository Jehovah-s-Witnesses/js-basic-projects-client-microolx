// Import { join } from 'path';
import { test, expect } from '@playwright/test';

// Const filepath = `file://${join(__dirname, '../src/index.html')}`;

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});
