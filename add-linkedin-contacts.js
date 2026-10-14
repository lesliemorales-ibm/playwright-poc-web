
const os = require('node:os');
const path = require('node:path');
const { spawn } = require('node:child_process');
const { chromium } = require('playwright');

const chromePath =
  process.env.CHROME_PATH ||
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const userDataDir = path.join(
  process.env.LOCALAPPDATA || os.homedir(),
  'PlaywrightLinkedInChrome'
);
const debuggingUrl = 'http://127.0.0.1:9222';

const delay = (milliseconds) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

async function waitForChrome(chrome) {
  const deadline = Date.now() + 15000;
  let lastError;

  while (Date.now() < deadline) {
    if (chrome.spawnError) {
      throw chrome.spawnError;
    }
    if (chrome.exitCode !== null) {
      throw new Error(`Chrome terminó antes de iniciar (código ${chrome.exitCode}).`);
    }

    try {
      const response = await fetch(`${debuggingUrl}/json/version`, {
        signal: AbortSignal.timeout(1000),
      });
      if (response.ok) {
        await response.body?.cancel();
        return;
      }
      lastError = new Error(`Chrome respondió con HTTP ${response.status}.`);
    } catch (error) {
      lastError = error;
    }

    await delay(300);
  }

  throw new Error(
    'Chrome no habilitó la depuración remota en el puerto 9222.',
    { cause: lastError }
  );
}

async function main() {
  const chrome = spawn(
    chromePath,
    [
      '--remote-debugging-port=9222',
      `--user-data-dir=${userDataDir}`,
    ],
    { stdio: 'ignore' }
  );
  chrome.once('error', (error) => {
    chrome.spawnError = error;
  });

  await waitForChrome(chrome);

  const browser = await chromium.connectOverCDP(debuggingUrl);
  const context = browser.contexts()[0];
  const page = context.pages()[0] || (await context.newPage());

  await page.goto('https://www.linkedin.com/mynetwork/');

  const allContactsFromBogota =
    "//h2[contains(., 'People you may know in Bogotá D.C. Metropolitan Area')]/ancestor::div[@class='discover-sections-list__item']//ul//li";
  const occupation =
    "//span[contains(@class, 'discover-person-card__occupation')]";
  const connectButton = "//button[contains(., 'Connect')]";
  const contactName =
    "//span[contains(@class, 'discover-person-card__name')]";

  await page.waitForTimeout(6000);

  const allContacts = await page.locator(allContactsFromBogota).all();
  console.log('Number of contacts found:', allContacts.length);

  const matches = ['qa', 'automation', 'pruebas'];
  const contactsThatMatch = [];

  for (const contact of allContacts) {
    const currentRole = await contact.locator(occupation).textContent();
    console.log(currentRole);

    const normalizedRole = currentRole?.toLocaleLowerCase() || '';
    if (matches.some((match) => normalizedRole.includes(match))) {
      contactsThatMatch.push(contact);
    }
  }

  console.log('Contacts that match:', contactsThatMatch.length);

  for (const contact of contactsThatMatch) {
    const currentRole = await contact.locator(occupation).textContent();
    const currentName = await contact.locator(contactName).textContent();

    await contact.locator(connectButton).click();
    console.log('Inviting to:', currentName);
    console.log('Adding role:', currentRole);
    await page.waitForTimeout(4000);
  }
}

main().catch((error) => {
  console.error('No se pudo iniciar Chrome o conectar con Playwright:', error);
  process.exitCode = 1;
});