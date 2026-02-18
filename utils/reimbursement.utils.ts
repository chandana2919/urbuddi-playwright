/**
 * ============================================================================
 * REIMBURSEMENT UTILITIES
 * ============================================================================
 * 
 * Purpose: Generate test data for the Reimbursement "Apply Extra Work" form
 * 
 * Form Fields (3 fields only):
 * 1. Date (dd-mm-yyyy format)
 * 2. Hours (number of extra hours worked)
 * 3. Lead (reporting manager email - dropdown)
 * 
 * ============================================================================
 */

import { getRandomNumber } from './test.utils';

// ============================================================================
// DATE HELPER FUNCTIONS
// ============================================================================

/**
 * PURPOSE: Get today's date in YYYY-MM-DD format (for HTML date input)
 * USAGE: When you need current date for type="date" input fields
 * EXAMPLE: '2026-02-16'
 */
export const getCurrentDateYYYYMMDD = (): string => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    return `${year}-${month}-${day}`;
};

/**
 * PURPOSE: Get today's date in dd-mm-yyyy format
 * USAGE: When you need current date for reimbursement form
 * EXAMPLE: '16-02-2026'
 */
export const getCurrentDateDDMMYYYY = (): string => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    return `${day}-${month}-${year}`;
};

/**
 * PURPOSE: Get date N days from today in dd-mm-yyyy format
 * USAGE: When testing future/past dates
 * EXAMPLE: getDateAfterDaysDDMMYYYY(7) returns date 7 days from now
 * @param days - Positive for future, negative for past
 */
export const getDateAfterDaysDDMMYYYY = (days: number): string => {
    const date = new Date();
    date.setDate(date.getDate() + days);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
};

/**
 * PURPOSE: Convert date from yyyy-mm-dd to dd-mm-yyyy format
 * USAGE: When you have date in different format and need to convert
 * EXAMPLE: convertToddmmyyyy('2026-02-16') returns '16-02-2026'
 * @param date - Date in yyyy-mm-dd format
 */
export const convertToddmmyyyy = (date: string): string => {
    const [year, month, day] = date.split('-');
    return `${day}-${month}-${year}`;
};

// ============================================================================
// VALID LEADS (Available in dropdown - add more as needed)
// ============================================================================

const validLeads = [
    'chandana.vennam@optimworks.com'
];

// ============================================================================
// TEST DATA GENERATORS (DYNAMIC DATA)
// ============================================================================

/**
 * PURPOSE: Generate random reimbursement data for testing
 * USAGE: When you want unique test data for each test run
 * RETURNS: Object with { date, hours, lead }
 * 
 * @param prefix - Browser prefix (e.g., 'ch' for chromium) - used to select different lead
 * @param leadEmail - Optional: specific lead email
 * 
 * EXAMPLE:
 * const data = generateReimbursementData('ch');
 * // Returns: { date: '2026-02-17', hours: '4', lead: 'mahesh1243@gmail.com' }
 */
export const generateReimbursementData = (prefix: string, leadEmail?: string) => {
    // Use different lead based on browser prefix to avoid duplicates
    const leadIndex: { [key: string]: number } = {
        'ch': 0,  // chromium -> first lead
        'ff': 1,  // firefox -> second lead
        'wk': 2,  // webkit -> third lead
        'wi': 3   // webkit alternative -> fourth lead
    };
    
    const index = leadIndex[prefix] || 0;
    const selectedLead = leadEmail || validLeads[index % validLeads.length];
    
    return {
        date: getCurrentDateYYYYMMDD(),            // YYYY-MM-DD format for HTML date input
        hours: getRandomNumber(1, 8),              // Random 1-8 hours
        lead: selectedLead                         // Different lead per browser
    };
};

/**
 * PURPOSE: Generate weekend reimbursement data (higher hours)
 * USAGE: When testing weekend extra work with more hours
 * RETURNS: Object with { date, hours (6-12), lead }
 * 
 * @param prefix - Browser prefix - NOT USED but kept for consistency
 * @param leadEmail - Optional: specific lead email
 * 
 * EXAMPLE:
 * const weekendData = generateWeekendReimbursement('ff');
 * // Returns: { date: '2026-02-16', hours: '8', lead: 'mahesh1243@gmail.com' }
 */
export const generateWeekendReimbursement = (prefix: string, leadEmail?: string) => {
    // Use different lead based on browser prefix to avoid duplicates
    const leadIndex: { [key: string]: number } = {
        'ch': 0,
        'ff': 1,
        'wk': 2,
        'wi': 3
    };
    
    const index = leadIndex[prefix] || 0;
    return {
        date: getCurrentDateYYYYMMDD(),
        hours: getRandomNumber(6, 12),            // Weekend = more hours (6-12)
        lead: leadEmail || validLeads[index % validLeads.length]
    };
};

/**
 * PURPOSE: Generate reimbursement data with a specific custom date
 * USAGE: When you want to test with a particular date
 * RETURNS: Object with { date (custom), hours, lead }
 * 
 * @param prefix - Browser prefix - NOT USED but kept for consistency
 * @param date - Custom date in yyyy-mm-dd format (will be converted to dd-mm-yyyy)
 * @param leadEmail - Optional: specific lead email
 * 
 * EXAMPLE:
 * const data = generateReimbursementWithDate('ch', '2026-02-20');
 * // Returns: { date: '20-02-2026', hours: '5', lead: 'mahesh1243@gmail.com' }
 */
export const generateReimbursementWithDate = (prefix: string, date: string, leadEmail?: string) => {
    // Use different lead based on browser prefix to avoid duplicates
    const leadIndex: { [key: string]: number } = {
        'ch': 0,
        'ff': 1,
        'wk': 2,
        'wi': 3
    };
    
    const index = leadIndex[prefix] || 0;
    return {
        date: convertToddmmyyyy(date),            // Convert to dd-mm-yyyy
        hours: getRandomNumber(2, 10),            // Random 2-10 hours
        lead: leadEmail || validLeads[index % validLeads.length]
    };
};

// ============================================================================
// STATIC TEST DATA (PREDEFINED DATA)
// ============================================================================

/**
 * PURPOSE: Predefined test data for consistent/repeatable testing
 * USAGE: When you want same data every time (no randomness)
 * 
 * AVAILABLE DATA SETS:
 * - standard: Normal work day, 4 hours
 * - weekend: Saturday work, 8 hours
 * - minimal: Minimum hours (2)
 * - maxHours: Maximum hours (12)
 * 
 * EXAMPLE USAGE:
 * const data = staticReimbursementData.standard;
 * // Always returns: { date: '16-02-2026', hours: '4', lead: 'mahesh1243@gmail.com' }
 */
export const staticReimbursementData = {
    // Standard working day - use dynamic date to avoid duplicates
    standard: {
        date: getCurrentDateYYYYMMDD(),
        hours: '4',
        lead: validLeads[0]
    }
};

