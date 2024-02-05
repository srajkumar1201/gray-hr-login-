
const puppeteer = require('puppeteer');
const { PuppeteerScreenRecorder } = require('puppeteer-screen-recorder');

let username="your user neme"
let password="your password"
let grayhrUrl="your company grayhr homepage url" 


(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({
    width: parseInt(1440),
    height: parseInt(1000),
    deviceScaleFactor: 1,
  })
  await page.waitForTimeout(2000).catch(err=>err)
  // Navigate to the website
  await page.goto(grayhrUrl);
  const recorder = new PuppeteerScreenRecorder(page);
  await recorder.start('login.mp4');
  await page.waitForTimeout(5000).catch(err=>err)

  await page.waitForSelector('#username');
  await page.type('#username', username);
  await page.waitForSelector('#password');
  await page.type('#password', password);
  await page.click('button[type="submit"]');
//   Wait for the cookies popup to appear

  // Close the cookies popup
  await page.waitForTimeout(10000).catch(err=>err)
  await page.waitForSelector('>>> button[name="primary"]');

  await page.click('>>> button[name="primary"]');

  await page.waitForTimeout(5000).catch(err=>err)
  await page.screenshot({ path: "beforeLogin.jpeg" ,fullPage: true,quality:100}); 

  
  const dropdownButtonSelector = 'gt-dropdown.hydrated';

  // Wait for the dropdown button to be present
  await page.waitForSelector(dropdownButtonSelector);

  // Click the dropdown button to expand the dropdown
  await page.click(dropdownButtonSelector);
  await page.waitForTimeout(1000).catch(err=>err)


  // Wait for the dropdown container to appear
  await page.waitForSelector('>>> div > div.dropdown > div > div > div:nth-child(4) > div');
  // // Selector for the "Work from Home" option
  const workFromHomeSelector = '>>> div > div.dropdown > div > div > div:nth-child(4) > div'; // Adjust if needed

  // // Click the "Work from Home" option
  await page.click(workFromHomeSelector);
  await page.waitForTimeout(1000).catch(err=>err)


  await page.waitForSelector('body > app > ng-component > div > div > div.container-fluid.app-container.px-0 > div > ghr-home > div.page.page-home.ng-star-inserted > div > gt-home-dashboard > gt-popup-modal > div > div > div.col-md-4.col-lg-4.attendance-info.mb-2x > gt-button');

  // Click the button using page.evaluate
  await page.evaluate(() => {
    const buttonSelector = 'body > app > ng-component > div > div > div.container-fluid.app-container.px-0 > div > ghr-home > div.page.page-home.ng-star-inserted > div > gt-home-dashboard > gt-popup-modal > div > div > div.col-md-4.col-lg-4.attendance-info.mb-2x > gt-button';
    const button = document.querySelector(buttonSelector);

    if (button) {
      // Access the button within the shadow DOM
      const shadowButton = button.shadowRoot.querySelector('button');

      if (shadowButton) {
        // Perform the click within the page context
        shadowButton.click();
      } else {
        console.error('Button inside shadowRoot not found.');
      }
    } else {
      console.error(`Button with selector ${buttonSelector} not found.`);
    }
  });


  await page.waitForTimeout(5000).catch(err=>err)

    await page.screenshot({ path: "login.jpeg" ,fullPage: true,quality:100}); 


  await recorder.stop();

  await browser.close();
})();

