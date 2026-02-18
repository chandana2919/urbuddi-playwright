import { test } from '@playwright/test';
test('test 2', async ({ page }) => {
    await page.goto("https://nodejs.org/en");
    console.log("yes its opened");
})
