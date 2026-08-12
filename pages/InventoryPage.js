import { BasePage } from './BasePage.js';

export class InventoryPage extends BasePage {
    constructor(page) {
        super(page);
        this.pageTitle = page.locator('[data-test="title"]');
        this.cartIcon = page.locator('[data-test="shopping-cart-link"]');
        this.inventoryItems = page.locator('[data-test="inventory-item"]');
        this.sortDropdown = page.locator('[data-test="product-sort-container"]');
        this.itemNameLabel = page.locator('[data-test="inventory-item-name"]');
    }
    async addItemToCart(itemName) {
        const item = this.inventoryItems.filter({ hasText: itemName });
        await item.locator('button[id^="add-to-cart"]').click();
    }
    async sortProductsByPriceHighToLow() {
        await this.sortDropdown.selectOption('hilo');
    }
    async getFirstItemName() {
        return await this.itemNameLabel.first().textContent();
    }
    async openCart() {
        await this.cartIcon.click();
    }
    async getPageTitle() {
        return await this.pageTitle.textContent();
    }
}
