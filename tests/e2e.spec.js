import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { InventoryPage } from '../pages/InventoryPage.js';
import { CartPage } from '../pages/CartPage.js';
import { CheckoutStepOnePage } from '../pages/CheckoutStepOnePage.js';
import { CheckoutStepTwoPage } from '../pages/CheckoutStepTwoPage.js';
import { CheckoutCompletePage } from '../pages/CheckoutCompletePage.js';

test('Успешный логин и проверка страницы товаров', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutStepOnePage = new CheckoutStepOnePage(page);
    const checkoutStepTwoPage = new CheckoutStepTwoPage(page);
    const checkoutCompletePage = new CheckoutCompletePage(page);

    // 1. Открываем страницу логина
    await loginPage.open();

    // 2. Залогинимся, используя валидные данные
    await loginPage.login('standard_user', 'secret_sauce');

    // 3. Проверяем, что после логина открылась страница с товарами
    const titleText = await inventoryPage.getPageTitle();
    expect(titleText).toBe('Products');

    // 4. Отсортировать товар от самого дорогого к дешевому
    // Получаем имя самого дорогого товара
    // // Добавляем самый дорогой товар в корзину
    await inventoryPage.sortProductsByPriceHighToLow();
    const expensiveItemName = await inventoryPage.getFirstItemName();
    await inventoryPage.addItemToCart(expensiveItemName);

    // 5. Переходим в корзину
    await inventoryPage.openCart();

    // 6. Проверяем, что в корзине находится именно тот товар, который вы добавили
    // Ищем элемент с именем дорогого товара внутри списка корзины
    const itemInCart = cartPage.cartItems.filter({ hasText: expensiveItemName });
    await expect(itemInCart).toBeVisible();

    // 7. Оформляем заказ
    await cartPage.goToCheckout();

    // 8. Заполняем информацию о пользователе
    await checkoutStepOnePage.fillUserInfo('Test', 'User', '12345');

    // 9. Завершаем покупку
    await checkoutStepTwoPage.finishCheckout();

    // 10. Проверяем успешное оформление заказа
    const successMessage = await checkoutCompletePage.getCompletionMessage();
    expect(successMessage).toBe('Thank you for your order!');
});
