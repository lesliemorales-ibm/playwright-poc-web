import { test, expect, Page } from '@playwright/test';
import { LoginPage } from '../../pageObject/login/loginPage';
import { AddTransactions } from '../../pageObject/transactions/Add-transactions';
import { NavegateTo } from '../../pageObject/navegate/NavegateTo';
import { fakerES } from '@faker-js/faker';

test('login', async ({ page }) => {
    const navegateTo = new NavegateTo(page);
    await navegateTo.goToLoginPage();

    const transactionDate = '2026-01-01';
    const transactionAmount = fakerES.finance.amount({ min: 500, max: 10000, dec: 0 }).toString();
    const transactionDescription = fakerES.food.description();

    const loginPage = new LoginPage(page);
    await loginPage.login('user', 'pass');

    await expect(page).toHaveURL('http://127.0.0.1:5500/login/transactions.html');

    const addTransactions = new AddTransactions(page);
    await addTransactions.addTransaction(transactionDate, transactionAmount, transactionDescription);

    expect(await addTransactions.getActualDate(1)).toBe(transactionDate);
    expect(await addTransactions.getActualAmount(1)).toBe(transactionAmount);
    expect(await addTransactions.getActualDescription(1)).toBe(transactionDescription);

});

test('login failure', async ({ page }) => {
    await page.goto('http://127.0.0.1:5500/login/login.html');

    const loginPage = new LoginPage(page);
    await loginPage.login('useres', 'pass');

    await expect(page.locator("//div[contains(text(),'Nombre de usuario o contraseña inválidos')]")).toBeVisible();

});