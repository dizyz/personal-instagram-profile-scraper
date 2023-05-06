import Axios from "axios";
import * as FS from "fs-extra";
import { RAPID_API_KEY } from "./@env";
import { INSTAGRAM_RAPID_API_JSON_PATH } from "./@paths";
import { convertImageUrlsInData } from "./@utils";

const INSTAGRAM_USERNAME = "ziyang.io";
const INSTAGRAM_USER_ID = 56257652623;

const RAPID_HOST = "instagram28.p.rapidapi.com";
const RAPID_API_ENDPOINT = `https://${RAPID_HOST}`;

const RAPID_API_JSON_URL =
  "https://dizyz.github.io/personal-scraper/instagram-rapid-api.json";

async function getProfileData() {
  const options = {
    method: "GET",
    url: `${RAPID_API_ENDPOINT}/user_info`,
    params: {
      user_name: INSTAGRAM_USERNAME,
    },
    headers: {
      "X-RapidAPI-Key": RAPID_API_KEY,
      "X-RapidAPI-Host": RAPID_HOST,
    },
  };

  const response = await Axios.request(options);
  return response.data;
}

async function getMediaData() {
  const options = {
    method: "GET",
    url: `${RAPID_API_ENDPOINT}/medias`,
    params: {
      user_id: INSTAGRAM_USER_ID,
      batch_size: "20",
    },
    headers: {
      "X-RapidAPI-Key": RAPID_API_KEY,
      "X-RapidAPI-Host": RAPID_HOST,
    },
  };

  const response = await Axios.request(options);
  return response.data;
}

export async function fetchInstagramMedia() {
  let data = undefined;
  try {
    throw new Error("by pass rapid api");
    const profileData = await getProfileData();
    const mediasData = await getMediaData();
    data = {
      profile: profileData,
      medias: mediasData,
    };
  } catch (e) {
    console.error("Failed to fetch Instagram data: ", e);
    console.info("Falling back to last json data from page.");
  }
  if (!data) {
    const response = await Axios.get(RAPID_API_JSON_URL);
    data = response.data;
  }

  data = await convertImageUrlsInData(data);

  await FS.writeJSON(INSTAGRAM_RAPID_API_JSON_PATH, data, {
    spaces: 2,
  });
}
