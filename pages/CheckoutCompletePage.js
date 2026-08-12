import { BasePage } from './BasePage.js';

export class CheckoutCompletePage extends BasePage {
    constructor(page) {
        super(page);
        this.completeHeader = page.locator('[data-test="complete-header"]');
        this.backHomeButton = page.locator('[data-test="back-to-products"]');
    }
    async getCompletionMessage() {
        return await this.completeHeader.textContent();
    }
}
