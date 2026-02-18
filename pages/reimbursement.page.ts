import { Locator, Page } from '@playwright/test';
import { BaseClass } from '../utils/base.utils';

export class ReimbursementPage extends BaseClass {
    readonly page: Page;
    readonly reimbursementSidebar: Locator;
    readonly applyExtraWorkBtn: Locator;
    
    // Apply Reimbursement Form Fields (only 3 fields)
    readonly dateInput: Locator;
    readonly hoursInput: Locator;
    readonly leadDropdown: Locator;
    
    // Action Buttons
    readonly submitBtn: Locator;
    readonly cancelBtn: Locator;
    
    // Modal
    readonly applyReimbursementModal: Locator;
    readonly modalCloseBtn: Locator;

    constructor(page: Page) {
        super();
        this.page = page;
        
        // Navigation
        this.reimbursementSidebar = page.getByText('Reimbursement', { exact: true });
        this.applyExtraWorkBtn = page.getByRole('button', { name: 'Apply Extra Work' });
        
        // Modal
        this.applyReimbursementModal = page.locator('text=Apply Reimbursement').first();
        this.modalCloseBtn = page.locator('button:has-text("×"), button[aria-label="Close"]');
        
        // Form Fields - More flexible selectors
        // Get all inputs in the modal and select by index
        this.dateInput = page.locator('.modal input, .modal input[type="date"], .modal input[type="text"]').nth(0);
        this.hoursInput = page.locator('.modal input[type="number"], .modal input').nth(1);
        this.leadDropdown = page.locator('.modal select, .modal-content select').first();
        
        // Buttons
        this.submitBtn = page.getByRole('button', { name: 'Submit' });
        this.cancelBtn = page.getByRole('button', { name: 'Cancel' });
    }

    /**
     * Navigate to Reimbursement section from sidebar
     */
    async navigateToReimbursement() {
        await this.clickElement(this.reimbursementSidebar, 'Reimbursement Sidebar');
        await this.page.waitForTimeout(1000);
        console.log('✓ Navigated to Reimbursement section');
    }

    /**
     * Click Apply Extra Work button
     */
    async clickApplyExtraWork() {
        await this.clickElement(this.applyExtraWorkBtn, 'Apply Extra Work Button');
        await this.page.waitForTimeout(1000);
        console.log('✓ Clicked Apply Extra Work button');
    }

    /**
     * Navigate to reimbursement and open extra work form
     */
    async navigateToExtraWorkForm() {
        await this.navigateToReimbursement();
        await this.clickApplyExtraWork();
        await this.page.waitForTimeout(500);
    }

    // === Input Methods for 3 fields ===

    /**
     * Enter date in dd-mm-yyyy format
     */
    async enterDate(date: string) {
        await this.fillInput(this.dateInput, date, 'Date');
    }

    /**
     * Enter hours worked
     */
    async enterHours(hours: string) {
        await this.fillInput(this.hoursInput, hours, 'Hours');
    }

    /**
     * Select lead from dropdown
     */
    async selectLead(lead: string) {
        await this.selectFromDropdown(this.leadDropdown, lead, 'Lead');
    }

    // === Action Methods ===

    async clickSubmit() {
        await this.clickElement(this.submitBtn, 'Submit Button');
        await this.page.waitForTimeout(2000);
        console.log('✓ Clicked Submit button');
    }

    async clickCancel() {
        await this.clickElement(this.cancelBtn, 'Cancel Button');
        await this.page.waitForTimeout(1000);
    }

    async closeModal() {
        await this.clickElement(this.modalCloseBtn, 'Close Modal');
    }

    /**
     * Apply reimbursement with all 3 fields
     * @param data - Reimbursement data object
     */
    async applyReimbursement(data: {
        date: string;      // Format: dd-mm-yyyy
        hours: string;
        lead: string;
    }) {
        console.log('=== Starting Reimbursement Application ===');

        await this.enterDate(data.date);
        await this.enterHours(data.hours);
        await this.selectLead(data.lead);
        await this.clickSubmit();

        console.log('=== Reimbursement Application Completed ===');
    }

    /**
     * Quick apply reimbursement
     */
    async quickApply(date: string, hours: string, lead: string) {
        console.log('=== Quick Reimbursement Apply ===');
        
        await this.enterDate(date);
        await this.enterHours(hours);
        await this.selectLead(lead);
        await this.clickSubmit();
        
        console.log('✓ Quick apply completed');
    }

    /**
     * Verify reimbursement form is displayed
     */
    async verifyFormDisplayed() {
        await this.verifyElementVisible(this.applyReimbursementModal, 'Apply Reimbursement Modal');
        await this.verifyElementVisible(this.dateInput, 'Date Input');
        await this.verifyElementVisible(this.hoursInput, 'Hours Input');
        await this.verifyElementVisible(this.leadDropdown, 'Lead Dropdown');
        await this.verifyElementVisible(this.submitBtn, 'Submit Button');
        console.log('✓ Reimbursement form verified');
    }

    /**
     * Verify success message after submission
     */
    async verifySubmissionSuccess(message?: string) {
        await this.verifySuccessMessage(this.page, message);
    }

    
}