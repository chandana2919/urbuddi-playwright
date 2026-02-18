import { test } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { EmployeePage } from '../pages/employee.page';
import { generateEmployeeData } from '../utils/test.utils';
import { DashboardPage } from '../pages/dashboard.page';
import { allure } from "allure-playwright"; // Import Allure

// Store the created employee ID to delete in after hook
let employeeIdToDelete: string | null = null;

test('Create Employee with Dynamic Data', async ({ page }, testInfo) => {
    test.slow();
    const prefix = testInfo.project.name.substring(0, 2);
    testInfo.annotations.push({ type: 'description', description: 'This is my detailed test description for employee creation' });
    const login = new LoginPage(page);
    const employee = new EmployeePage(page);
    const dashBoard = new DashboardPage(page);
    await login.navigateHomePage(process.env.BASE_URL as string);
    await dashBoard.navigateForm();
    const data = generateEmployeeData(prefix);

    // 3. LOG IT TO ALLURE (This is how you observe it)
    await allure.parameter("Browser", testInfo.project.name);
    await allure.parameter("Generated_EmpID", data.empId);
    await allure.parameter("Generated_Email", data.email);
    await employee.createEmployee(data);
    
    // Store the employee ID to delete in after hook
    employeeIdToDelete = data.empId;
});

// After hook to delete the employee after test completes
test.afterEach(async ({ page }) => {
    const employee = new EmployeePage(page);
    if (employeeIdToDelete) {
        console.log(`🧹 Running after hook - deleting employee: ${employeeIdToDelete}`);
        try {
            await employee.deleteEmployee(employeeIdToDelete);
            console.log(`✓ Successfully deleted employee: ${employeeIdToDelete}`);
        } catch (error) {
            console.log(`⚠ Failed to delete employee: ${employeeIdToDelete}`, error);
        } finally {
            employeeIdToDelete = null;
        }
    }
});
