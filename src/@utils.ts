import fetch from "isomorphic-unfetch";

export async function convertExternalImageUrlToBase64Url(
  externalUrl: string,
  mimeType: string = "image/jpeg"
): Promise<string> {
  const response = await fetch(externalUrl);
  const arrayBuffer = await response.arrayBuffer();
  const base64Content = Buffer.from(arrayBuffer).toString("base64");
  return `data:${mimeType};base64,${base64Content}`;
}

export async function convertExternalImagesUrlsToBase64Urls(
  externalUrls: string[],
  mimeType: string = "image/jpeg"
): Promise<string[]> {
  let promises: Promise<string>[] = [];
  for (const externalUrl of externalUrls) {
    const storePhoto = async (): Promise<string> => {
      return convertExternalImageUrlToBase64Url(externalUrl, mimeType);
    };
    promises.push(storePhoto());
  }
  return Promise.all(promises);
}

export async function convertImageUrlsInData(data: any): Promise<any> {
  if (!data) {
    return data;
  }

  if (Array.isArray(data)) {
    let promises: Promise<void>[] = [];
    for (let i = 0; i < data.length; i++) {
      const promise = (async () => {
        data[i] = await convertImageUrlsInData(data[i]);
      })();
      promises.push(promise);
    }
    await Promise.all(promises);
    return data;
  }

  if (typeof data === "object") {
    let promises: Promise<void>[] = [];
    for (const key in data) {
      const promise = (async () => {
        data[key] = await convertImageUrlsInData(data[key]);
      })();
      promises.push(promise);
    }
    await Promise.all(promises);
    return data;
  }

  if (typeof data === "string") {
    if (data.startsWith("http") && data.endsWith(".jpg")) {
      return convertExternalImageUrlToBase64Url(data);
    }
  }

  return data;
}
