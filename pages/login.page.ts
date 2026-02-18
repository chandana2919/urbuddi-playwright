import { Locator, Page, expect } from '@playwright/test'
import { BaseClass } from '../utils/base.utils';

export class LoginPage extends BaseClass {
   page: Page;
   readonly userNameInput: Locator;
   readonly passwordInput: Locator;
   readonly loginButton: Locator;
   readonly dashBoard: Locator;

   constructor(page: Page) {
      super();
      this.page = page;
      //this.userNameInput = page.locator('input[type="email"]');
      this.userNameInput = page.locator('#userEmail');
      this.passwordInput = page.locator('input[type="password"]');
      this.loginButton = page.locator('button[type="submit"]');
      this.dashBoard = page.locator("//p[@class='page-header-container'][normalize-space()='Dashboard']");
   }

   async navigateHomePage(url: string) {
      await this.page.goto(url);
   }

   async login(user: string, pass: string) {
      await Promise.race([
         this.dashBoard.waitFor({ state: 'visible', timeout: 5000 }).catch(() => { }),
         this.userNameInput.waitFor({ state: 'visible', timeout: 5000 }).catch(() => { })
      ]);

      // 2. Now check if we are logged in
      const isAlreadyLoggedIn = await this.dashBoard.isVisible();

      if (isAlreadyLoggedIn) {
         console.log("Session detected: Already logged in. Skipping login steps.");
         return;
      }
      await this.enterUsername(user);
      await this.enterPassword(pass);
      await this.clickLogin();
   }
   async enterUsername(username: string) {
      await this.fillInput(this.userNameInput, username, 'username');
   }
   async enterPassword(password: string) {
      await this.fillInput(this.passwordInput, password, 'password');
   }
   async clickLogin() {
      await this.clickElement(this.loginButton, 'login')
   }

   async verifyLoginSuccess() {
      // Wait for the dashboard to be visible with a longer timeout
      await this.dashBoard.waitFor({ state: 'visible', timeout: 15000 });
      await expect(this.dashBoard).toBeVisible();
   }
}