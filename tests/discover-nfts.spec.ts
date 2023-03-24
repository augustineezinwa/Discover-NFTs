import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://develop--look-up-nfts.netlify.app/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Discover-NFTs/);
});


