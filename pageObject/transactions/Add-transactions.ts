import { Locator, Page } from "@playwright/test";

export class AddTransactions {

    private readonly transactionDateInput: Locator;
    private readonly transactionAmountInput: Locator;
    private readonly transactionDescriptionInput: Locator;
    private readonly addTransactionButton: Locator;
    private readonly saveButton: Locator;
    private readonly page: Page;

    private actualDateRow!: Locator;
    private actualAmountRow!: Locator;
    private actualDescriptionRow!: Locator;

    constructor(page: Page) {
        this.page = page;
        this.transactionDateInput = page.locator('id=date');
        this.transactionAmountInput = page.locator('id=amount');
        this.transactionDescriptionInput = page.locator('id=description');
        this.addTransactionButton = page.locator("//button[contains(text(),'Añadir transacción')]");
        this.saveButton = page.locator("//button[contains(text(),'Guardar')]");
    }

    private async addTransactionButtonClick() {
        await this.addTransactionButton.click();
    }
    private async transactionDateInputFill(date: string) {
        await this.transactionDateInput.fill(date);
    }
    private async transactionAmountInputFill(amount: string) {
        await this.transactionAmountInput.fill(amount);
    }

    private async transactionDescriptionInputFill(description: string) {
        await this.transactionDescriptionInput.fill(description);
    }

    private async saveButtonClick() {
        await this.saveButton.click();
    }

    async addTransaction(date: string, amount: string, description: string) {
        await this.addTransactionButtonClick();
        await this.transactionDateInputFill(date);
        await this.transactionAmountInputFill(amount);
        await this.transactionDescriptionInputFill(description);
        await this.saveButtonClick();
    }

    async getActualDate(row: number) {
        this.actualDateRow = this.page.locator(`//tbody[@id='transactions-list']//tr[${row}]//td[1]`);
        return await this.actualDateRow.textContent();
    }
    async getActualAmount(row: number) {
        this.actualAmountRow = this.page.locator(`//tbody[@id='transactions-list']//tr[${row}]//td[2]`);
        return await this.actualAmountRow.textContent();
    }
    async getActualDescription(row: number) {
        this.actualDescriptionRow = this.page.locator(`//tbody[@id='transactions-list']//tr[${row}]//td[3]`);
        return await this.actualDescriptionRow.textContent();
    }
}