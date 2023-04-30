import Puppeteer from "puppeteer";
import * as FS from "fs-extra";
import { INSTAGRAM_JSON_PATH, PUBLIC_DIR } from "./@paths";

const INSTAGRAM_URL = "https://www.instagram.com/ziyang.io/";

interface InstagramPhoto {
  url: string;
  caption: string;
}

(async () => {
  // Prepare public folder if not exists
  await FS.ensureDir(PUBLIC_DIR);

  const browser = await Puppeteer.launch();

  // Scrap Instagram photos
  {
    const page = await browser.newPage();
    await page.goto(INSTAGRAM_URL, { waitUntil: "networkidle2" });
    await page.waitForSelector("article img", { visible: true });
    const imageEls = await page.$$("article img");
    const photoUrls: InstagramPhoto[] = await Promise.all(
      imageEls.map(
        async (el) => await el.evaluate((el) => el.getAttribute("src"))
      )
    );
    await FS.writeJSON(
      INSTAGRAM_JSON_PATH,
      {
        photos: photoUrls,
      },
      { spaces: 2 }
    );
    await page.close();
  }

  await browser.close();
})().catch(console.error);
