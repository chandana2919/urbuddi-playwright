import { test as setup, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateHomePage(process.env.BASE_URL as string);
    await loginPage.login(
        process.env.USER_EMAIL!, 
        process.env.USER_PASSWORD!
    );
    await loginPage.verifyLoginSuccess();
    await page.context().storageState({ path: authFile });
});