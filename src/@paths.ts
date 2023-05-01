import * as Path from "path";

export const PROJECT_DIR = Path.resolve(__dirname, "..");

export const PUBLIC_DIR = Path.resolve(PROJECT_DIR, "public");
export const INSTAGRAM_JSON_PATH = Path.resolve(PUBLIC_DIR, `instagram.json`);
export const INSTAGRAM_RAPID_API_JSON_PATH = Path.resolve(
  PUBLIC_DIR,
  `instagram-rapid-api.json`
);
