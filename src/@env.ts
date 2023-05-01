export const RAPID_API_KEY = process.env.RAPID_API_KEY;
if (!RAPID_API_KEY) {
  throw new Error("RAPID_API_KEY is not set");
}
