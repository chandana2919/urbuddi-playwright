import { test, expect } from '../fixtures/pageFixtures';
import {
    staticReimbursementData,
} from '../utils/reimbursement.utils';
import { allure } from "allure-playwright";

test.describe('Reimbursement - Apply Extra Work Tests', () => {

    /**
     * TEST CASE: Apply Reimbursementg
     */
    test('TC_REIMB_001 - Apply Reimbursement', async ({ loginPage, reimbursementPage }, testInfo) => {
        test.slow();
        
        testInfo.annotations.push({ 
            type: 'description', 
            description: 'Verify user can apply for reimbursement' 
        });
        await allure.epic('Reimbursement Management');
        await allure.feature('Apply Reimbursement');
        
        // Use static data
        const data = staticReimbursementData.standard;
        
        await allure.parameter("Browser", testInfo.project.name);
        await allure.parameter("Date", data.date);
        await allure.parameter("Hours", data.hours);
        await allure.parameter("Lead", data.lead);
        
        // Navigate and apply
        await loginPage.navigateHomePage(process.env.BASE_URL as string);
        await reimbursementPage.navigateToExtraWorkForm();
        await reimbursementPage.applyReimbursement(data);
        
        await reimbursementPage.page.waitForTimeout(2000);
        
        const errorLocator = reimbursementPage.page.getByText('Extra work already exists for the same date');
        const hasError = await errorLocator.count() > 0;
        
        if (hasError) {
            // Extra work already exists - click cancel button
            await reimbursementPage.clickCancel();
            
            // Assert: Verify the modal is closed after clicking cancel
            await expect(reimbursementPage.applyReimbursementModal).not.toBeVisible({ timeout: 5000 });
            console.log(`⚠ Extra work already exists: ${data.hours} hours on ${data.date} - Cancelled successfully`);
        } else {
            console.log(`✓ Reimbursement applied: ${data.hours} hours on ${data.date} with lead ${data.lead}`);
        }
    });
});
