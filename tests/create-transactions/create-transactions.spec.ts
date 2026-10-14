import { test, expect, Page } from '@playwright/test';

test('create transaction', async ({ page }) => {

   await page.goto('http://127.0.0.1:5500/login/login.html');
    await page.locator('input#username').fill('user');
    await page.locator('//input[contains(@id, \'password\')]').fill('pass');
    await page.locator('//button[@type=\'submit\']').click();

    await expect(page).toHaveURL('http://127.0.0.1:5500/login/transactions.html');

    for (let i = 0; i < 10; i++) {
    await page.locator('//button[contains(text(),\'Añadir transacción\')]').click();
   
    await page.locator('id=date').fill('2026-06-01');
    await page.locator('id=amount').fill('10000');
    await page.locator('id=description').fill('Pago de servicios');

    await page.locator("//button[contains(text(),'Guardar')]").click();
    }
})