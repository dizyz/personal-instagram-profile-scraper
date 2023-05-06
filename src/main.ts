import Puppeteer from "puppeteer";
import * as FS from "fs-extra";
import { PUBLIC_DIR } from "./@paths";
import { fetchInstagramPhotos } from "./@instagram";
import { fetchInstagramMedia } from "./@instagram-rapid-ai";

(async () => {
  // Prepare public folder if not exists
  await FS.ensureDir(PUBLIC_DIR);

  try {
    console.log("Fetching Instagram photos...");
    await fetchInstagramMedia();
    console.log("- Done.");
  } catch (e) {
    console.error("- Failed to fetch Instagram media: ", e);
  }

  // const browser = await Puppeteer.launch();

  // // Scrap Instagram photos
  // try {
  //   await fetchInstagramPhotos(browser);
  // } catch (e) {
  //   console.error("Failed to fetch Instagram photos: ", e);
  // }

  // await browser.close();
})().catch(console.error);
