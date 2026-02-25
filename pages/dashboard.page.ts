import { Page, expect, Locator } from '@playwright/test'
import { BaseClass} from '../utils/base.utils';
export class DashboardPage extends BaseClass {
    readonly page: Page;
    readonly employeesSidebar: Locator;
    readonly addEmployeeBtn: Locator;

    constructor(page: Page) {
        super();
        this.page = page;
        this.employeesSidebar = page.getByText('Employees', { exact: true });
        this.addEmployeeBtn = page.locator('button:has-text("Add Employee")');
    }
    async navigateForm() {
        await this.clickElement (this.employeesSidebar,'employee Side bar');
        //implenting the soft and hard assertions
        await expect(this.page).toHaveURL(/.*dev\.urbuddi\.com\/allemployees/);
        const EmployeedHeader = this.page.locator("//p[@class='sc-feUZmu qNlEl']");
        await expect.soft(EmployeedHeader).toBeVisible();
        //clicking employee add button
        await this.clickElement(this.addEmployeeBtn,'employee add');
    }
}
