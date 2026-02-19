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
      // More flexible locator for dashboard - try multiple options
      this.dashBoard = page.locator('p.page-header-container:has-text("Dashboard")');
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
      // Wait for URL to change after login (indicates successful login)
      await this.page.waitForURL(/.*dev\.urbuddi\.com.*/, { timeout: 15000 });
      console.log("Login successful - URL changed to: " + this.page.url());
   }
}