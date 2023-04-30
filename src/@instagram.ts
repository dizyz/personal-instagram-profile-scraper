import { Browser } from "puppeteer";
import * as FS from "fs-extra";
import { INSTAGRAM_JSON_PATH } from "./@paths";

const INSTAGRAM_URL = "https://www.instagram.com/ziyang.io/";

interface InstagramPhoto {
  url: string;
  caption: string;
}

export async function fetchInstagramPhotos(browser: Browser) {
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
