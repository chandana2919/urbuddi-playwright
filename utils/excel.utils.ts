import ExcelJS from 'exceljs';
import * as path from 'path';

/**
 * Extracts a plain string value from an ExcelJS cell value.
 * Handles plain strings, numbers, rich text objects, hyperlink objects, and dates.
 */
function getCellValue(cellValue: any): string {
  if (cellValue === null || cellValue === undefined) return '';

  // Rich text: { richText: [{ text: '...' }, ...] }
  if (typeof cellValue === 'object' && Array.isArray(cellValue.richText)) {
    return cellValue.richText.map((rt: any) => rt.text || '').join('');
  }

  // Hyperlink / shared string object: { text: '...', hyperlink: '...' }
  if (typeof cellValue === 'object' && cellValue.text !== undefined) {
    return String(cellValue.text);
  }

  // Date object
  if (cellValue instanceof Date) {
    return cellValue.toISOString().split('T')[0]; // YYYY-MM-DD
  }

  // Plain value (string, number, boolean)
  return String(cellValue);
}

/**
 * Reads test data from an Excel file
 * @param fileName - Name of the Excel file (e.g., 'employeeData.xlsx')
 * @param sheetName - Name of the sheet to read from (default: 'Employees')
 * @returns Array of test data objects
 */
export async function readExcelData(fileName: string, sheetName: string = 'Employees') {
  const dataDir = path.join(process.cwd(), 'data');
  const filePath = path.join(dataDir, fileName);

  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(filePath);

  const worksheet = workbook.getWorksheet(sheetName);
  if (!worksheet) {
    throw new Error(`Sheet '${sheetName}' not found in Excel file: ${filePath}`);
  }

  const testData: any[] = [];

  worksheet.eachRow((row, rowNumber) => {
    // Skip header row
    if (rowNumber === 1) return;

    const rowData = row.values as any[];
    if (rowData.length > 1) {
      testData.push({
        firstName:   getCellValue(rowData[1]),
        lastName:    getCellValue(rowData[2]),
        empId:       getCellValue(rowData[3]),
        email:       getCellValue(rowData[4]),
        role:        getCellValue(rowData[5]),
        password:    getCellValue(rowData[6]),
        dob:         getCellValue(rowData[7]),
        joinDate:    getCellValue(rowData[8]),
        degree:      getCellValue(rowData[9]),
        dept:        getCellValue(rowData[10]),
        gender:      getCellValue(rowData[11]),
        mobile:      getCellValue(rowData[12]),
        bloodGroup:  getCellValue(rowData[13]),
        designation: getCellValue(rowData[14]),
        salary:      getCellValue(rowData[15]),
        location:    getCellValue(rowData[16]),
        reporting:   getCellValue(rowData[17])
      });
    }
  });

  return testData;
}
