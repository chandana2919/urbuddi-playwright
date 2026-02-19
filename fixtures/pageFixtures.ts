import {test as base} from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { EmployeePage } from '../pages/employee.page';
import { DashboardPage } from '../pages/dashboard.page';
import { ReimbursementPage } from '../pages/reimbursement.page';

type MyFixtures = {
    loginPage: LoginPage;
    employeePage: EmployeePage;
    dashboardPage: DashboardPage;
    reimbursementPage: ReimbursementPage;
};
export const test = base.extend<MyFixtures>({
    loginPage: async ({ page }, use) => {
        const login = new LoginPage(page);
        await use(login);
    },
    employeePage: async ({ page }, use) => {
        const employee = new EmployeePage(page);
        await use(employee);
    },
    dashboardPage: async ({ page }, use) => {
        const dashboard = new DashboardPage(page);
        await use(dashboard);
    },
    reimbursementPage: async ({ page }, use) => {
        const reimbursement = new ReimbursementPage(page);
        await use(reimbursement);
    },
});
export { expect } from '@playwright/test';
