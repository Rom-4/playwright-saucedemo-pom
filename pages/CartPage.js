import { BasePage } from './BasePage.js';

export class CartPage extends BasePage {
    constructor(page) {
        super(page);
        this.cartItems = page.locator('[data-test="inventory-item"]');
        this.checkoutButton = page.locator('[data-test="checkout"]');
        this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
    }
    async goToCheckout() {
        await this.checkoutButton.click();
    }
}
