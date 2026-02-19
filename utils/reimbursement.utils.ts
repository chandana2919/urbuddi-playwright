

import { getRandomNumber } from './test.utils';

export const getCurrentDateYYYYMMDD = (): string => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    return `${year}-${month}-${day}`;
};

export const getCurrentDateDDMMYYYY = (): string => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    return `${day}-${month}-${year}`;
};
export const getDateAfterDaysDDMMYYYY = (days: number): string => {
    const date = new Date();
    date.setDate(date.getDate() + days);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
};

export const convertToddmmyyyy = (date: string): string => {
    const [year, month, day] = date.split('-');
    return `${day}-${month}-${year}`;
};
const validLeads = [
    'chandana.vennam@optimworks.com'
];

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
        date: getCurrentDateYYYYMMDD(),           
        hours: getRandomNumber(1, 8),              
        lead: selectedLead                         
    };
};
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
export const staticReimbursementData = {
    // Standard working day - use dynamic date to avoid duplicates
    standard: {
        date: getCurrentDateYYYYMMDD(),
        hours: '4',
        lead: validLeads[0]
    }
};

