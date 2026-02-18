import {test,expect} from '@playwright/test'
import { LoginPage } from '../pages/login.page'
test.skip('login test urbuddi',async({page})=>{
    const loginPage = new LoginPage(page);
    await loginPage.navigateHomePage(process.env.BASE_URL as string);
    await loginPage.login(process.env.USER_EMAIL!,process.env.USER_PASSWORD!);
    await loginPage.verifyLoginSuccess();
});