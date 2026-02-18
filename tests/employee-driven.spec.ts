import { test, expect } from '../fixtures/pageFixtures';
import * as testData from '../data/employeeData.json';
import { allure } from 'allure-playwright';

// Store the created employee ID to delete in after hook
let employeeIdToDelete: string | null = null;

test.describe('Static Data Driven Employee Creation', () => {
    // After each test, delete the employee if it was created successfully
    test.afterEach(async ({ employeePage }) => {
        if (employeeIdToDelete) {
            console.log(`🧹 Running after hook - deleting employee: ${employeeIdToDelete}`);
            try {
                await employeePage.deleteEmployee(employeeIdToDelete);
                console.log(`✓ Successfully deleted employee: ${employeeIdToDelete}`);
            } catch (error) {
                console.log(`⚠ Failed to delete employee: ${employeeIdToDelete}`, error);
            } finally {
                employeeIdToDelete = null; // Reset for next test
            }
        }
    });

    testData.staticUsers.forEach((userData) => {
        test.skip(`Create Static Employee: ${userData.firstName}@regression @static`, async ({ loginPage, employeePage, dashboardPage }, testInfo) => {
            test.slow();
            await allure.parameter("TestType", "Static Data-Driven");
            await allure.parameter("EmpID", userData.empId);
            
            // Reset the employee ID for this test
            employeeIdToDelete = null;
            
            // 1. Navigation using fixtures (No 'new' keywords needed!)
            await loginPage.navigateHomePage(process.env.BASE_URL as string);
            await dashboardPage.navigateForm();
            await allure.parameter("Browser", testInfo.project.name);
            await allure.parameter("Generated_EmpID", userData.empId);
            await allure.parameter("Generated_Email", userData.email);
            
            // 2. Action using the Static Data from JSON
            // Passing the 'userData' object directly to your method
            await employeePage.createEmployee(userData);
            await employeePage.page.waitForTimeout(2000);
            
            // 3. Check if employee already exists - look for error/toast
            const errorLocator = employeePage.page.locator('[class*="error"], .toast-error, text=already exists');
            const hasError = await errorLocator.count() > 0;
            
            if (hasError) {
                await employeePage.page.keyboard.press('Escape');
                console.log(`⚠ Employee already exists: ${userData.empId}`);
                // Don't delete since employee wasn't created
            } else {
                console.log(`✓ Successfully processed static user: ${userData.empId}`);
                // Store the employee ID to delete in after hook
                employeeIdToDelete = userData.empId;
            }
        });
    });
});
