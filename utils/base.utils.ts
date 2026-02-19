import { Locator, Page, expect } from '@playwright/test';

export class BaseClass {
    /**
     * Fill input field with text
     * @param locator - Element locator
     * @param text - Text to fill
     * @param fieldName - Optional field name for logging
     */
    async fillInput(locator: Locator, text: string, fieldName?: string) {
        await locator.waitFor({ state: 'visible', timeout: 10000 });
        await locator.fill(text);
        console.log(`Filled ${fieldName || 'field'} with: ${text}`);
    }

    /**
     * Select option from dropdown - tries index, value, and label
     * @param locator - Dropdown locator
     * @param option - Option value, label, OR index (as string) to select
     * @param fieldName - Optional field name for logging
     */
    async selectFromDropdown(locator: Locator, option: string | number, fieldName?: string) {
        await locator.waitFor({ state: 'visible', timeout: 10000 });

        // If option is a number or can be parsed as a number, try selecting by index
        const index = typeof option === 'number' ? option : parseInt(option);
        if (!isNaN(index) && index.toString() === option.toString()) {
            try {
                await locator.selectOption({ index });
                console.log(`Selected ${fieldName || 'dropdown'} by index: ${index}`);
                return;
            } catch {
                // Index selection failed, continue with value/label
            }
        }
        
        const optionStr = option.toString();

        // Try selecting by value first
        try {
            await locator.selectOption({ value: optionStr });
            console.log(`Selected ${fieldName || 'dropdown'} by value: ${optionStr}`);
            return;
        } catch {
            // Value not found, try label
        }
        
        // Try selecting by label text
        try {
            await locator.selectOption({ label: optionStr });
            console.log(`Selected ${fieldName || 'dropdown'} by label: ${optionStr}`);
            return;
        } catch {
            // Label not found, try by text content
        }
        
        // Last resort: click and select from dropdown
        try {
            await locator.click();
            const optionLocator = locator.locator(`option:has-text("${optionStr}")`).first();
            await optionLocator.click();
            console.log(`Selected ${fieldName || 'dropdown'} by text: ${optionStr}`);
        } catch (error) {
            console.log(`Failed to select ${fieldName || 'dropdown'} with option: ${option}`);
        }
    }

    /**
     * Click on element
     * @param locator - Element locator
     * @param elementName - Optional element name for logging
     */
    async clickElement(locator: Locator, elementName?: string) {
        await locator.waitFor({ state: 'visible', timeout: 10000 });
        await locator.click();
        console.log(`Clicked ${elementName || 'element'}`);
    }

    /**
     * Double click on element
     */
    async doubleClickElement(locator: Locator, elementName?: string) {
        await locator.waitFor({ state: 'visible', timeout: 10000 });
        await locator.dblclick();
        console.log(`Double clicked ${elementName || 'element'}`);
    }

    /**
     * Check if element is visible
     */
    async isElementVisible(locator: Locator): Promise<boolean> {
        try {
            await locator.waitFor({ state: 'visible', timeout: 5000 });
            return true;
        } catch {
            return false;
        }
    }

    /**
     * Wait for element to disappear
     */
    async waitForElementToDisappear(locator: Locator, timeout: number = 10000) {
        await locator.waitFor({ state: 'hidden', timeout });
        console.log('Element disappeared');
    }

    /**
     * Get text content from element
     */
    async getTextContent(locator: Locator): Promise<string> {
        await locator.waitFor({ state: 'visible', timeout: 10000 });
        const text = await locator.textContent();
        return text?.trim() || '';
    }

    /**
     * Get input value
     */
    async getInputValue(locator: Locator): Promise<string> {
        await locator.waitFor({ state: 'visible', timeout: 10000 });
        return await locator.inputValue();
    }

    /**
     * Clear input field
     */
    async clearInput(locator: Locator, fieldName?: string) {
        await locator.waitFor({ state: 'visible', timeout: 10000 });
        await locator.clear();
        console.log(`Cleared ${fieldName || 'field'}`);
    }

    /**
     * Upload file
     */
    async uploadFile(locator: Locator, filePath: string) {
        await locator.waitFor({ state: 'visible', timeout: 10000 });
        await locator.setInputFiles(filePath);
        console.log(`Uploaded file: ${filePath}`);
    }

    /**
     * Check checkbox
     */
    async checkCheckbox(locator: Locator, fieldName?: string) {
        await locator.waitFor({ state: 'visible', timeout: 10000 });
        if (!(await locator.isChecked())) {
            await locator.check();
            console.log(`Checked ${fieldName || 'checkbox'}`);
        }
    }

    /**
     * Uncheck checkbox
     */
    async uncheckCheckbox(locator: Locator, fieldName?: string) {
        await locator.waitFor({ state: 'visible', timeout: 10000 });
        if (await locator.isChecked()) {
            await locator.uncheck();
            console.log(`Unchecked ${fieldName || 'checkbox'}`);
        }
    }

    /**
     * Hover over element
     */
    async hoverElement(locator: Locator, elementName?: string) {
        await locator.waitFor({ state: 'visible', timeout: 10000 });
        await locator.hover();
        console.log(`Hovered over ${elementName || 'element'}`);
    }

    /**
     * Press key
     */
    async pressKey(locator: Locator, key: string) {
        await locator.waitFor({ state: 'visible', timeout: 10000 });
        await locator.press(key);
        console.log(`Pressed key: ${key}`);
    }

    /**
     * Wait for and click - useful for dynamic elements
     */
    async waitAndClick(locator: Locator, elementName?: string, timeout: number = 10000) {
        await locator.waitFor({ state: 'visible', timeout });
        await locator.click();
        console.log(`Waited and clicked ${elementName || 'element'}`);
    }

    /**
     * Scroll to element
     */
    async scrollToElement(locator: Locator) {
        await locator.scrollIntoViewIfNeeded();
        console.log('Scrolled to element');
    }

    /**
     * Get count of elements
     */
    async getElementCount(locator: Locator): Promise<number> {
        return await locator.count();
    }

    /**
     * Select option from dropdown by label
     */
    async selectDropdownByLabel(locator: Locator, label: string, fieldName?: string) {
        await locator.waitFor({ state: 'visible', timeout: 10000 });
        await locator.selectOption({ label });
        console.log(`Selected ${fieldName || 'dropdown'} by label: ${label}`);
    }

    /**
     * Select option from dropdown by index
     */
    async selectDropdownByIndex(locator: Locator, index: number, fieldName?: string) {
        await locator.waitFor({ state: 'visible', timeout: 10000 });
        await locator.selectOption({ index });
        console.log(`Selected ${fieldName || 'dropdown'} by index: ${index}`);
    }

    /**
     * Wait for page to load completely
     */
    async waitForPageLoad(page: Page) {
        await page.waitForLoadState('load');
        await page.waitForLoadState('domcontentloaded');
        console.log(' Page loaded');
    }

    /**
     * Take screenshot
     */
    async takeScreenshot(page: Page, name: string) {
        await page.screenshot({ path: `screenshots/${name}.png`, fullPage: true });
        console.log(` Screenshot saved: ${name}.png`);
    }

    /**
     * Verify element has text
     */
    async verifyElementText(locator: Locator, expectedText: string) {
        await expect(locator).toHaveText(expectedText);
        console.log(`Verified text: ${expectedText}`);
    }

    /**
     * Verify element contains text
     */
    async verifyElementContainsText(locator: Locator, text: string) {
        await expect(locator).toContainText(text);
        console.log(`Verified element contains: ${text}`);
    }

    /**
     * Verify element is visible
     */
    async verifyElementVisible(locator: Locator, elementName?: string) {
        await expect(locator).toBeVisible();
        console.log(`Verified ${elementName || 'element'} is visible`);
    }

    /**
     * Verify element is enabled
     */
    async verifyElementEnabled(locator: Locator, elementName?: string) {
        await expect(locator).toBeEnabled();
        console.log(`Verified ${elementName || 'element'} is enabled`);
    }

    /**
     * Wait for toast/notification message
     */
    async waitForToastMessage(page: Page, message?: string, timeout: number = 5000) {
        const toast = page.locator('.toast, .notification, [role="alert"]').first();
        await toast.waitFor({ state: 'visible', timeout });
        
        if (message) {
            await expect(toast).toContainText(message);
            console.log(`Toast message verified: ${message}`);
        } else {
            console.log('Toast message appeared');
        }
        
        return toast;
    }

    /**
     * Verify success message
     */
    async verifySuccessMessage(page: Page, message?: string) {
        const successToast = page.locator('.success, .toast-success, [class*="success"]').first();
        await successToast.waitFor({ state: 'visible', timeout: 10000 });
        
        if (message) {
            await expect(successToast).toContainText(message);
        }
        
        console.log('Success message verified');
    }

    /**
     * Verify error message
     */
    async verifyErrorMessage(page: Page, message?: string) {
        const errorToast = page.locator('.error, .toast-error, [class*="error"]').first();
        await errorToast.waitFor({ state: 'visible', timeout: 10000 });
        
        if (message) {
            await expect(errorToast).toContainText(message);
        }
        
        console.log('Error message verified');
    }
}