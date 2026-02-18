export const getRandomLetters = (len: number) => {
    const letters = "abcdefghijklmnopqrstuvwxyz";
    let result = "";
    for (let i = 0; i < len; i++) {
        result += letters.charAt(Math.floor(Math.random() * letters.length));
    }
    return result;
};

export const getRandomNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min).toString();
};
const validReportingLeads = [
    'exploring@gmail.com',
    'chandana.vennam@optimworks.com',
    'abcdabc@gmail.com',
    'nothing111@gmail.com'
];

let employeeCounter = 1;

export const generateEmployeeData = (prefix: string) => {
    // Use counter + random for unique IDs
    const uniqueId = Date.now().toString().slice(-4);
    const randomSuffix = getRandomNumber(1000, 9999);
    const counter = employeeCounter++;
    
    // Use different lead based on browser prefix
    const leadIndex: { [key: string]: number } = {
        'ch': 0,
        'ff': 1,
        'wk': 2,
        'wi': 3
    };
    const index = leadIndex[prefix] || 0;
    const selectedLead = validReportingLeads[index % validReportingLeads.length];
    
    return {
        firstName: `${prefix}${getRandomLetters(4)}`,
        lastName: `${prefix}${getRandomLetters(5)}`,
        empId: `EMP${prefix}${counter}${randomSuffix}`,
        email: `${prefix}${getRandomLetters(4)}${counter}${randomSuffix}@urbuddi.com`,
        password: "PassWord123", // Fixed valid password
        mobile: "9" + getRandomNumber(100000000, 999999999),
        dept: "Development",
        designation: "Developer",
        salary: "50000",
        location: "Bangalore",
        // You can even randomize dropdown choices if you want
        role: "Employee",
        gender: "Male",
        bloodGroup: "A+",
        reporting: "chandana.vennam@optimworks.com", // Only available reporting lead
        degree: "Degree",
        dob: "1995-01-01",
        joinDate: "2026-01-22"
    };
};
