import { test, expect, Page } from '@playwright/test';

test('registration', async ({ page }, testInfo) => {
  await page.goto('http://127.0.0.1:5500/registration/register.html');

  const name = 'leslie';
  const lastName = 'morales';
  const age = '30';
  const country = 'Colombia';
  const sex = 'F';
  const email = 'morales@example.com';
  const picturePath = 'Images/dragon.jpg';

  await page.locator('input#name').fill(name);
  await page.locator('input#last-name').fill(lastName);
  await page.locator("//label[contains(.,'Edad')]/following-sibling::input").fill(age);
  await page.locator("select#country").selectOption(country);
  await page.locator(`input[value='${sex}']`).click();
  await page.locator('id=email').fill(email);
  await page.locator('id=monday').click();
  await page.locator('id=picture').setInputFiles(picturePath);
  // muestra la captura de pantalla en el informe de prueba generado por Playwright Test, y se guarda localmente en la carpeta 'test-results' con el nombre 'registration-1.png'
  await testInfo.attach('registration-1', {
    body: await page.screenshot(),
    contentType: 'image/png',
  })
  // Toma de pantalla de la página de registro antes de hacer clic en el botón de guardar y se guarda localmente en la carpeta 'screenshots' con el nombre 'registration-1.png'
  //await page.screenshot({ path: 'screenshots/registration-1.png', fullPage: true });

  const [summaryPage] = await Promise.all([ // las dos promesas se ejecutan al mismo tiempo, y se espera a que ambas se cumplan antes de continuar con el código
    page.waitForEvent('popup'),
    page.locator('id=save-btn').click()
  ])
  await summaryPage.waitForLoadState();
  await expect(summaryPage).toHaveTitle('Summary');

  // Verificar que los datos ingresados en el formulario se muestren correctamente en la página de resumen
  const currentName = await summaryPage.locator("//strong[contains(text(),'Nombre:')]/ancestor::p").textContent();
  const currentLastName = await summaryPage.locator("//strong[contains(text(),'Apellido:')]/ancestor::p").textContent();
  const currentAge = await summaryPage.locator("//strong[contains(text(),'Edad:')]/ancestor::p").textContent();
  const currentCountry = await summaryPage.locator("//strong[contains(text(),'País:')]/ancestor::p").textContent();
  const currentSex = await summaryPage.locator("//strong[contains(text(),'Sexo:')]/ancestor::p").textContent();
  const currentEmail = await summaryPage.locator("//strong[contains(text(),'Correo electrónico:')]/ancestor::p").textContent();

  expect(currentName).toContain(name);
  expect(currentLastName).toContain(lastName);
  expect(currentAge).toContain(age);
  expect(currentCountry).toContain(country);
  expect(currentSex).toContain(sex);
  expect(currentEmail).toContain(email);
  
  // muestra la captura de pantalla en el informe de prueba generado por Playwright Test, y se guarda localmente en la carpeta 'test-results' con el nombre 'registration-2.png'
  await testInfo.attach('registration-2', {
    body: await summaryPage.screenshot(),
    contentType: 'image/png',
  })
//se toma de pantalla de la página de resumen después de hacer clic en el botón de guardar y se guarda localmente en la carpeta 'screenshots' con el nombre 'registration-2.png'
  //await summaryPage.screenshot({ path: 'screenshots/registration-2.png', fullPage: true });

  //await page.pause();

})

test('registration failure', async ({ page }, testInfo) => {
  //Prueba de reintento: se espera que falle la prueba y se vuelva a intentar automáticamente según la configuración de reintentos en playwright.config.ts
  await page.goto('http://127.0.0.1:5500/registration/register.html');

  const name = 'leslie';
  
  await page.locator('input#name').fill(name)

  expect(true).toEqual(false);
})