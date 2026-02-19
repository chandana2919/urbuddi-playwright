import { test, expect } from '../fixtures/pageFixtures';
import { readExcelData } from '../utils/excel.utils';
import { allure } from 'allure-playwright';

// Store the created employee ID to delete in after hook
let employeeIdToDelete: string | null = null;
// Excel data - loaded once and shared across tests
let excelTestData: any[];
test.describe('Excel Data Driven Employee Creation', () => {
    // Load Excel data once before all tests
    test.beforeAll(async () => {
        excelTestData = await readExcelData('employeeData.xlsx', 'Employees');
        console.log(`Loaded ${excelTestData.length} employees from Excel`);
    });

    // After each test, delete the employee if it was created successfully
    test.afterEach(async ({ employeePage }) => {
        if (employeeIdToDelete) {
            console.log(`Running after hook - deleting employee: ${employeeIdToDelete}`);
            try {
                await employeePage.deleteEmployee(employeeIdToDelete);
                console.log(`Successfully deleted employee: ${employeeIdToDelete}`);
            } catch (error) {
                console.log(`Failed to delete employee: ${employeeIdToDelete}`, error);
            } finally {
                employeeIdToDelete = null;
            }
        }
    });

    // Use test.step to iterate through Excel data
    test('Create employees from Excel data @regression @excel', async ({ loginPage, employeePage, dashboardPage }, testInfo) => {
        test.slow();
        for (const userData of excelTestData) {
            await allure.parameter("EmpID", userData.empId);
            await allure.parameter("Email", userData.email);
            
            employeeIdToDelete = null;
            
            // 1. Navigation
            await loginPage.navigateHomePage(process.env.BASE_URL as string);
            await dashboardPage.navigateForm();
            await allure.parameter("Browser", testInfo.project.name);
            
            // 2. Create employee using Excel data
            await employeePage.createEmployee(userData);
            await employeePage.page.waitForTimeout(2000);
            
            // 3. Check if employee already exists
            const errorLocator = employeePage.page.locator('[class*="error"], .toast-error, :text("already exists")');
            const hasError = await errorLocator.count() > 0;
            
            if (hasError) {
                await employeePage.page.keyboard.press('Escape');
                console.log(`Employee already exists: ${userData.empId}`);
            } else {
                console.log(`Successfully processed Excel user: ${userData.empId}`);
                employeeIdToDelete = userData.empId;
            }
            // Clean up after each employee
            if (employeeIdToDelete) {
                await employeePage.deleteEmployee(employeeIdToDelete);
                employeeIdToDelete = null;
            }
        }
    });
});
