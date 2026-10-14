import { test, expect, Page } from '@playwright/test';
import { faker } from '@faker-js/faker';

test('buying products', async ({ page }, testInfo) => {
    await page.goto('http://127.0.0.1:5500/shopping%20cart/');

    const product1 = 'Producto 1';
    const product2 = 'Producto 2';
    const product3 = 'Producto 3';

    for (let i = 0; i < 3; i++) {
        await page.locator("//h5[contains(.,'" + product1 + "')]/ancestor::div[contains(@class,'card-body')]/button").click();
    }

    await page.locator("//h5[contains(.,'" + product2 + "')]/ancestor::div[contains(@class,'card-body')]/button").click();
    await page.locator("//h5[contains(.,'" + product3 + "')]/ancestor::div[contains(@class,'card-body')]/button").click();

    await page.locator("button#view-cart-btn").click();

    //Validar cantidad de productos en el carrito
    const quantityProducts1 = await page.locator("//tbody[@id='cart-items']//td[contains(.,'" + product1 + "')]/ancestor::tr//td[3]").textContent();
    const quantityProducts2 = await page.locator("//tbody[@id='cart-items']//td[contains(.,'" + product2 + "')]/ancestor::tr//td[3]").textContent();
    const quantityProducts3 = await page.locator("//tbody[@id='cart-items']//td[contains(.,'" + product3 + "')]/ancestor::tr//td[3]").textContent();

    expect(quantityProducts1).toEqual('3');
    expect(quantityProducts2).toEqual('1');
    expect(quantityProducts3).toEqual('1');

    //Validar total por producto en el carrito
    const totalProducts1 = await page.locator("//tbody[@id='cart-items']//td[contains(.,'" + product1 + "')]/ancestor::tr//td[4]").textContent();
    const totalProducts2 = await page.locator("//tbody[@id='cart-items']//td[contains(.,'" + product2 + "')]/ancestor::tr//td[4]").textContent();
    const totalProducts3 = await page.locator("//tbody[@id='cart-items']//td[contains(.,'" + product3 + "')]/ancestor::tr//td[4]").textContent();

    expect(totalProducts1).toEqual('$30.00');
    expect(totalProducts2).toEqual('$20.00');
    expect(totalProducts3).toEqual('$30.00');

    //Validar total del carrito
    const totalCart = await page.locator("//tbody[@id='cart-items']//td[contains(.,'Total')]/following-sibling::td//strong").textContent();

    expect(totalCart).toEqual('$80.00');
    //CHECKOUT
    await page.locator("button#checkout-btn").click();

    await page.locator("input#name").fill(faker.person.fullName());
    await page.locator("input#email").fill(faker.internet.email());
    await page.locator("input#address").fill(faker.location.streetAddress());

    await page.waitForTimeout(2000); // Esperar 1 segundo para que se cargue la sección de pago
    //  await page.locator("(//div[@class='card-header'])[2]").click() 
    await page.getByRole('link', { name: 'Información de pago' }).click();
    await page.locator("input#card-number").fill(faker.finance.creditCardNumber());
    await page.locator("input#card-expiry").fill('12/27');
    await page.locator("input#card-cvc").fill(faker.finance.creditCardCVV());

    await page.locator("//button[@id='place-order-btn' and contains(.,'Pagar')]").click();

    //Validar mensaje de confirmación de compra
    const confirmationMessage = await page.locator("//h4[contains(.,'¡Tu compra fue exitosa!')]").textContent();

    expect(confirmationMessage).toContain('¡Tu compra fue exitosa!');
    ;
});