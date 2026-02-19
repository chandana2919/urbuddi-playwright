import { Locator, Page, expect } from '@playwright/test';
import { BaseClass } from '../utils/base.utils';
export class EmployeePage extends BaseClass {
    readonly page: Page;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly employeeIdInput: Locator;
    readonly emailInput: Locator;
    readonly roleDropdown: Locator;
    readonly passwordInput: Locator;
    readonly dobInput: Locator;
    readonly joiningDate: Locator;
    readonly qualificationsDropdown: Locator;
    readonly departmentInput: Locator;
    readonly genderDropdown: Locator;
    readonly mobileNumberInput: Locator;
    readonly bloodGroupDropdown: Locator;
    readonly designationInput: Locator;
    readonly salaryInput: Locator;
    readonly locationInput: Locator;
    readonly reportingToDropdown: Locator;
    readonly certificatesBtn: Locator;
    readonly submitBtn: Locator;

    constructor(page: Page) {
        super();
        this.page = page;
        this.firstNameInput = page.locator('input[name="firstName"]');
        this.lastNameInput = page.locator('input[name="lastName"]');
        this.employeeIdInput = page.locator('#employeeID');
        this.emailInput = page.locator('input[name="email"]');
        this.roleDropdown = page.locator('#role');
        this.passwordInput = page.locator('input[name="password"]');
        this.dobInput = page.locator('input[name="dob"]');
        this.joiningDate = page.locator('input[name="joiningDate"]');
        this.qualificationsDropdown = page.locator('#qualifications');
        this.departmentInput = page.locator('input[name="department"]');
        this.genderDropdown = page.locator('#gender');
        this.mobileNumberInput = page.locator('input[name = "mobileNumber"]');
        this.bloodGroupDropdown = page.locator('#bloodGroup');
        this.designationInput = page.locator('input[name ="designation"]');
        this.salaryInput = page.locator('#salary');
        this.locationInput = page.locator('input[name ="location"]');
        this.reportingToDropdown = page.locator('#reportingTo');
        this.certificatesBtn = page.getByRole('button', { name: 'Certificates' });
        this.submitBtn = page.getByRole('button', { name: 'Add', exact: true });
    }
    //atomic methods for single elements
    async enterFirstName(firstName: string) {
        await this.fillInput(this.firstNameInput,firstName);
    }
    async enterLastName(lastName: string) {
       await this.fillInput(this.lastNameInput,lastName);
    }
    async enterEmployeeId(employeeId: string) {
       await this.fillInput(this.employeeIdInput,employeeId);
    }
    async enterEmail(emailInput: string) {
        await this.fillInput(this.emailInput,emailInput);
    }
    async enterPassword(password: string) {
       await this.fillInput(this.passwordInput,password)
    }
    async enterMobile(mobileNumber: string) {
        await this.fillInput(this.mobileNumberInput,mobileNumber);
    }
    async enterDepartment(department: string) {
        await this.fillInput(this.departmentInput,department);
    }
    async enterDesignation(designation: string) {
        await this.fillInput(this.designationInput,designation);
    }
    async enterSalary(salary: string) {
        await this.fillInput(this.salaryInput,salary);
    }
    async enterLocation(location: string) {
        await this.fillInput(this.locationInput,location);
    }
    // --- Dropdown Methods ---
    async selectRole(value: string) {
        await this.selectFromDropdown(this.roleDropdown,value);
    }
    async selectGender(value: string) {
        await this.selectFromDropdown(this.genderDropdown,value)
    }
    async selectBloodGroup(value: string) {
        await this.selectFromDropdown(this.bloodGroupDropdown,value);
    }
    async selectReportingTo(value: string) {
        await this.selectFromDropdown(this.reportingToDropdown,value);
    }
    async selectQualification(value: string) {
        await this.selectFromDropdown(this.qualificationsDropdown,value);
    }
    // --- Date and Action Methods ---
    async enterDateOfBirth(dob: string) {
        await this.fillInput(this.dobInput,dob)
    }
    async enterJoiningDate(joinDate: string) {
        await this.fillInput(this.joiningDate,joinDate);
    }
    async clickSubmit() {
        await this.clickElement(this.submitBtn);
    }
    async createEmployee(data: any) {
        //actually employee creation start from here 
        await this.enterFirstName(data.firstName);
        await this.enterLastName(data.lastName);
        await this.enterEmployeeId(data.empId);
        await this.enterEmail(data.email);
        await this.selectRole(data.role);
        await this.enterPassword(data.password);
        await this.enterDateOfBirth(data.dob);
        await this.enterJoiningDate(data.joinDate);
        await this.selectQualification(data.degree);
        await this.enterDepartment(data.dept);
        await this.selectGender(data.gender);
        await this.enterMobile(data.mobile);
        await this.selectBloodGroup(data.bloodGroup);
        await this.enterDesignation(data.designation);
        await this.enterSalary(data.salary);
        await this.enterLocation(data.location);
        await this.selectReportingTo(data.reporting);
        await this.clickSubmit();
    }

    /**
     * Delete an employee by Employee ID
     * Navigates to employees list, finds the employee, and deletes them
     * @param employeeId - The employee ID to search for and delete
     */
    async deleteEmployee(employeeId: string) {
        console.log(`=== Starting Employee Deletion for ID: ${employeeId} ===`);
        
        // Navigate to employees list page
        const employeesListUrl = '/allemployees';
        await this.page.goto(employeesListUrl);
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForTimeout(2000);
        
        console.log(' Navigated to employees list');
        
        // Try to find the employee row by employee ID
        // Looking for the employee ID in the table
        const employeeRow = this.page.locator(`tr:has-text("${employeeId}")`).first();
        
        // Check if employee exists
        const rowCount = await employeeRow.count();
        if (rowCount === 0) {
            console.log(`⚠ Employee with ID ${employeeId} not found in the list`);
            return;
        }
        
        console.log(`✓ Found employee row for ID: ${employeeId}`);
        
        // Look for delete button/action in the row
        // Common patterns: delete button, trash icon, action menu, three dots
        const deleteBtn = employeeRow.locator('button:has-text("Delete"), button[title*="Delete"], button:has(svg[class*="trash"]), [class*="delete"]').first();
        
        // Alternative: click on action menu first then delete
        const actionMenuBtn = employeeRow.locator('button:has-text("Actions"), [class*="action"], [class*="menu"]').first();
        
        const menuCount = await actionMenuBtn.count();
        if (menuCount > 0) {
            await actionMenuBtn.click();
            await this.page.waitForTimeout(500);
            
            // Now look for delete option in the dropdown/menu
            const deleteOption = this.page.locator('text=Delete, text=Remove').first();
            const deleteOptionCount = await deleteOption.count();
            if (deleteOptionCount > 0) {
                await deleteOption.click();
                await this.page.waitForTimeout(1000);
            } else {
                // Try direct delete button
                await deleteBtn.click();
            }
        } else {
            // Try direct delete button
            const deleteBtnCount = await deleteBtn.count();
            if (deleteBtnCount > 0) {
                await deleteBtn.click();
            } else {
                // Last resort: try to find any button in the row that might be delete
                const anyBtn = employeeRow.locator('button').first();
                const btnCount = await anyBtn.count();
                if (btnCount > 0) {
                    await anyBtn.click();
                    await this.page.waitForTimeout(500);
                    
                    // Look for delete in the opened modal/menu
                    const deleteInModal = this.page.locator('text=Delete, text=Remove').first();
                    if (await deleteInModal.count() > 0) {
                        await deleteInModal.click();
                    }
                }
            }
        }
        
        // Wait for confirmation modal if present
        const confirmDeleteBtn = this.page.locator('button:has-text("Delete"), button:has-text("Confirm"), button:has-text("Yes")').first();
        const confirmCount = await confirmDeleteBtn.count();
        if (confirmCount > 0) {
            await confirmDeleteBtn.click();
            await this.page.waitForTimeout(2000);
        }
        
        console.log(`✓ Deleted employee with ID: ${employeeId}`);
    }

    /**
     * Quick delete employee - navigates to employees list and deletes
     * @param employeeId - The employee ID to delete
     */
    async quickDeleteEmployee(employeeId: string) {
        console.log(`=== Quick Delete for Employee ID: ${employeeId} ===`);
        
        // Navigate directly to employees list
        await this.page.goto('/allemployees');
        await this.page.waitForTimeout(2000);
        
        // Find and delete the employee
        await this.deleteEmployee(employeeId);
    }


}
