import {Locator,Page} from "@playwright/test";

export class LoginPage {
    private readonly usernameInput: Locator;
    private readonly passwordInput: Locator;
    private readonly loginButton: Locator;

    constructor(page: Page) {
        this.usernameInput = page.locator('input#username');
        this.passwordInput = page.locator('//input[contains(@id, \'password\')]');
        this.loginButton = page.locator('//button[@type=\'submit\']');
    }
    private async usernameInputFill(username: string) {
        await this.usernameInput.fill(username);
    }

    private async passwordInputFill(password: string) {
        await this.passwordInput.fill(password);
    }
    
    private async loginButtonClick() {
        await this.loginButton.click();
    }

    async login(username: string, password: string) {
        await this.usernameInputFill(username);
        await this.passwordInputFill(password);
        await this.loginButtonClick();
    }

}