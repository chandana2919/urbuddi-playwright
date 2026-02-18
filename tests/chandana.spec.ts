import {test} from '@playwright/test';
test.skip('test url',async ({page})=>{
    await page.goto("https://www.testmuai.com/selenium-playground/simple-form-demo/");
    await console.log('yes its opened')
})