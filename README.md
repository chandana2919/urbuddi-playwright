# Urbuddi Playwright Automation Framework

A professional end-to-end testing automation framework built with Playwright for the Urbuddi web application.

![Playwright](https://img.shields.io/badge/Playwright-1.57.0-green)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![Allure Reporting](https://img.shields.io/badge/Allure-2.36.0-orange)

## 🎯 Project Overview

This framework implements **Page Object Model (POM)** design pattern with robust utilities, multi-browser support, and professional reporting.

## 🏗️ Architecture

```
urbuddi-playwright/
├── pages/                    # Page Object Models
│   ├── login.page.ts        # Login page interactions
│   ├── dashboard.page.ts    # Dashboard page interactions
│   ├── employee.page.ts    # Employee management page
│   └── reimbursement.page.ts # Reimbursement page
├── tests/                    # Test Specifications
│   ├── login.spec.ts       # Login tests
│   ├── employee.spec.ts    # Employee CRUD tests
│   ├── employee-driven.spec.ts
│   ├── reimbursement.spec.ts
│   ├── chandana.spec.ts
│   ├── auth.setup.ts       # Authentication setup
│   └── test.spec.ts
├── fixtures/                 # Test Fixtures
│   └── pageFixtures.ts
├── utils/                    # Utility Functions
│   ├── base.utils.ts       # Base class with reusable methods
│   ├── test.utils.ts       # Test data generation utilities
│   └── reimbursement.utils.ts # Reimbursement test data utilities
├── data/                     # Test Data
│   └── employeeData.json
├── playwright/              # Playwright internal files
├── test-results/           # Test execution results
├── allure-results/        # Allure report data
├── jsonReports/           # JSON test reports
├── playwright.config.ts   # Playwright configuration
└── package.json           # Dependencies and scripts
```

## 🔑 Key Features

### 1. Page Object Model (POM) Pattern
Each page is encapsulated in its own class with:
- Element locators defined as class properties
- Page-specific methods for interactions
- Inherits from BaseClass for common operations

```typescript
// Example: pages/login.page.ts
export class LoginPage extends BaseClass {
   readonly userNameInput: Locator;
   readonly passwordInput: Locator;
   readonly loginButton: Locator;

   async login(user: string, pass: string) {
      await this.fillInput(this.userNameInput, user);
      await this.fillInput(this.passwordInput, pass);
      await this.clickElement(this.loginButton);
   }
}
```

### 2. Base Utilities Class
Reusable automation methods available across all pages:
- `fillInput()` - Fill input fields
- `clickElement()` - Click elements with logging
- `selectFromDropdown()` - Dropdown selection
- `uploadFile()` - File upload handling
- `verifyElementVisible()` - Assertion helpers
- `waitForToastMessage()` - Notification handling
- `takeScreenshot()` - Screenshot capture
- And many more...

### 3. Test Data Generation
Dynamic test data creation utilities:
```typescript
import { generateEmployeeData } from './utils/test.utils';

const employee = generateEmployeeData('Test');
// Generates: { firstName: 'Testabcd', empId: 'EMPTest1234...', email: '...', etc. }
```

### 4. Multi-Browser Support
Configured for cross-browser testing:
- Chrome (Chromium)
- Firefox
- Safari (WebKit)

### 5. Professional Reporting
- **Allure Reports** - Rich, interactive test reports
- **HTML Reporter** - Built-in Playwright HTML reports
- **Console Output** - Detailed execution logging
- **Video & Screenshots** - On failure capture

## ⚙️ Configuration

### Environment Variables
Create `.env.dev` or `.env.staging` files:
```env
BASE_URL=https://dev.urbuddi.com
USER_EMAIL=your_email@example.com
USER_PASSWORD=your_password
ENV=dev
HEADLESS=false
SLOWMO=500
```

### Playwright Config Highlights
- **Parallel execution** - Fast test runs
- **Smart retries** - CI: 2 retries, local: 1 retry
- **Trace viewer** - On first retry
- **Video/Screenshot** - On failure
- **Multi-browser** - Chromium, Firefox, WebKit

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run test:dev` | Run tests in development environment |
| `npm run allure:dev` | Generate and serve Allure reports |
| `npx playwright test` | Run all tests |
| `npx playwright show-report` | View HTML report |

## 🧪 Test Structure

```typescript
// tests/login.spec.ts
import { test } from '@playwright/test'
import { LoginPage } from '../pages/login.page'

test('login test urbuddi', async({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateHomePage(process.env.BASE_URL);
    await loginPage.login(process.env.USER_EMAIL, process.env.USER_PASSWORD);
    await loginPage.verifyLoginSuccess();
});
```

## 🔐 Authentication Flow

The framework uses Playwright's authentication storage:
1. `auth.setup.ts` runs first to perform one-time login
2. Authentication state is saved to `playwright/.auth/user.json`
3. All tests reuse this state (no repeated logins)

## 📊 Reporting

### Allure Report Features:
- Test execution timeline
- Failed tests with screenshots
- Test categories and labels
- Historical trend analysis

### View Report:
```bash
npm run allure:dev
```

## 🎓 Presentation Highlights

This framework demonstrates:

1. **Clean Architecture** - Separation of concerns (pages/tests/utils)
2. **DRY Principle** - Reusable base utilities
3. **Maintainability** - Easy to update locators in page objects
4. **Scalability** - Easy to add new test cases
5. **Professional Reporting** - Allure integration
6. **Best Practices** - Proper TypeScript typing, error handling

## 📝 License

ISC License

## 👤 Author

Urbuddi QA Team
