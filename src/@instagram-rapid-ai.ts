import Axios from "axios";
import * as FS from "fs-extra";
import { RAPID_API_KEY } from "./@env";
import { INSTAGRAM_RAPID_API_JSON_PATH } from "./@paths";

const INSTAGRAM_USER_ID = 56257652623;

const RAPID_HOST = "instagram28.p.rapidapi.com";
const RAPID_API_ENDPOINT = `https://${RAPID_HOST}`;

export async function fetchInstagramMedia() {
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
  await FS.writeJSON(INSTAGRAM_RAPID_API_JSON_PATH, response.data, {
    spaces: 2,
  });
}
