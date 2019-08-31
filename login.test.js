
const puppeteer = require('puppeteer');

const APP = "https://angular-6-registration-login-example.stackblitz.io/register";

let browser;
let page;

beforeAll (async () => {
  jest.setTimeout(50000);
  browser = await puppeteer.launch({headless: false});
  page = await browser.newPage();
  await page.goto(APP, {waitUntil: 'networkidle2'});
  page.once('load', () => console.log('Page loaded!'));
  const dimensions = await page.evaluate(() => {
    return {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
      deviceScaleFactor: window.devicePixelRatio
    };
  });
  console.log('Dimensions:', dimensions);
  await page.screenshot({path: 'example.png'});
});

afterAll(() => {
  browser.close();
});

describe("Prueba de registro y login exitoso", () => {
  test("Se puede registrar en la pagina", async () => {
    await page.waitForSelector('form[ng-reflect-form="[object Object]"]');
    await page.click('input[formcontrolname="firstName"]');
    await page.type('input[formcontrolname="firstName"]', 'Nelson');
    await page.click('input[formcontrolname="lastName"]');
    await page.type('input[formcontrolname="lastName"]', 'Hurtado');
    await page.click('input[formcontrolname="username"]');
    await page.type('input[formcontrolname="username"]', 'nhurtado');
    await page.click('input[formcontrolname="password"]');
    await page.type('input[formcontrolname="password"]', '123456');
    await page.click('button[class="btn btn-primary"]');
    
    page = await browser.newPage();
    await page.goto('https://angular-6-registration-login-example.stackblitz.io/login', {waitUntil: 'networkidle2'});
    page.once('load', () => console.log('Pagina login cargada!'));

    await page.waitForSelector('form[ng-reflect-form="[object Object]"]');

    await page.click('input[formcontrolname="username"]');
    await page.type('input[formcontrolname="username"]', 'nhurtado');
    await page.click('input[formcontrolname="password"]');
    await page.type('input[formcontrolname="password"]', '123456');
    await page.click('button[class="btn btn-primary"]');
    
    page = await browser.newPage();
    await page.goto('https://angular-6-registration-login-example.stackblitz.io/', {waitUntil: 'networkidle2'});
    page.once('load', () => console.log('Pagina de login exitoso cargada!'));
    await page.waitForSelector('.container');
    const text = await page.$eval('h1', el => el.innerText );
    console.log(text);

    expect(text).toEqual("Hi Nelson!");
  });
});

