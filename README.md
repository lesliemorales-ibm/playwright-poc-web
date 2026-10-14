# Playwright POC Web

Proyecto de práctica para aprender automatización web con Playwright Test y TypeScript. Incluye pruebas sobre páginas HTML locales, ejemplos del patrón Page Object Model y un script independiente de automatización con Chrome.

## Qué contiene

- **Carrito de compras:** agrega productos, comprueba cantidades y totales, completa el checkout y valida la confirmación.
- **Login y transacciones:** cubre el inicio de sesión exitoso y fallido, y la creación y verificación de transacciones.
- **Registro:** completa un formulario, carga una imagen, valida la página de resumen y adjunta capturas al informe.
- **Page Objects:** encapsula las interacciones con las páginas de login y transacciones.
- **Automatización de LinkedIn:** `add-linkedin-contacts.js` abre Chrome mediante depuración remota, busca contactos sugeridos de Bogotá cuyas ocupaciones contengan `qa`, `automation` o `pruebas`, e intenta enviarles una invitación.

Las páginas usadas por las pruebas están en `recursos/`. La prueba de carrito y las páginas de login y registro esperan que estos archivos se sirvan desde la raíz del proyecto en `http://127.0.0.1:5500`.

## Requisitos

- Node.js y npm.
- Un servidor estático local configurado en el puerto `5500` para ejecutar las pruebas.
- Google Chrome para el script opcional de LinkedIn.

## Instalación

Desde la carpeta del proyecto:

```bash
npm ci
npx playwright install chromium
```

## Ejecutar las pruebas

Primero inicia un servidor estático que publique la raíz del proyecto en el puerto `5500` (por ejemplo, la extensión **Live Server** de VS Code). Comprueba que las páginas estén disponibles en estas rutas:

- `http://127.0.0.1:5500/shopping%20cart/`
- `http://127.0.0.1:5500/login/login.html`
- `http://127.0.0.1:5500/registration/register.html`

Con el servidor en ejecución, lanza Playwright:

```bash
npx playwright test
```

La configuración ejecuta las pruebas en Chromium con la ventana visible, genera un informe HTML y guarda trazas en el primer reintento, capturas y videos según la configuración. Para abrir el último informe:

```bash
npx playwright show-report
```

Los resultados generados se guardan en `test-results/` y `playwright-report/`; ambas carpetas están excluidas de Git.

> **Nota:** `tests/registration/registration.spec.ts` contiene una prueba llamada `registration failure` con una aserción intencionalmente falsa (`expect(true).toEqual(false)`). Por eso, la suite completa falla actualmente por diseño. Además, `playwright.config.ts` configura dos reintentos para cada prueba fallida.

El workflow de GitHub Actions ejecuta `npx playwright test`, pero actualmente no inicia un servidor para publicar `recursos/` en el puerto `5500`. Para que las pruebas puedan encontrar las páginas en CI, el workflow debe iniciar y esperar ese servidor antes de ejecutar Playwright.

## Script opcional de LinkedIn

El script no forma parte de la suite de Playwright Test. Se ejecuta por separado:

```bash
node add-linkedin-contacts.js
```

Por defecto busca Chrome en `C:\Program Files\Google\Chrome\Application\chrome.exe`. Si está instalado en otra ruta, define `CHROME_PATH` con la ruta correcta. El script utiliza el puerto de depuración `9222` y un perfil de Chrome dedicado llamado `PlaywrightLinkedInChrome`, separado del perfil habitual. Inicia sesión manualmente en LinkedIn en ese perfil si es la primera ejecución.

**El script puede enviar invitaciones reales a contactos.** Revisa los filtros y los resultados antes de ejecutarlo, y úsalo respetando las condiciones de LinkedIn.

## Estructura principal

```text
.
├── add-linkedin-contacts.js
├── pageObject/
│   ├── login/
│   ├── navegate/
│   └── transactions/
├── recursos/
│   ├── login/
│   ├── registration/
│   └── shopping cart/
├── tests/
│   ├── create-transactions/
│   ├── login/
│   ├── registration/
│   └── shoppig-cart/
├── playwright.config.ts
└── package.json
```
