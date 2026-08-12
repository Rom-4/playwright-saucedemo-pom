import { BasePage } from './BasePage.js';

export class CheckoutStepTwoPage extends BasePage {
    constructor(page) {
        super(page);
        this.summaryInfo = page.locator('[data-test="payment-info-label"]');
        this.totalPriceLabel = page.locator('[data-test="total-label"]');
        this.finishButton = page.locator('[data-test="finish"]');
    }
    async finishCheckout() {
        await this.finishButton.click();
    }
}
