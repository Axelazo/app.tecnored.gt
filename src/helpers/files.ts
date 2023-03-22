/**
 * Returns a promise of a Blob file.
 *
 *
 * @param file - The file parameter
 * @returns A Promise with tha resolves to the file or null
 *
 */
export function loadFile(file: File | null): Promise<Blob | null> {
  if (!file) {
    return Promise.resolve(null);
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const blob = new Blob([reader.result ?? ""], {
        type: file.type,
      });
      resolve(blob);
    };
    reader.readAsArrayBuffer(file);
  });
}

/**
 * Downloads and image, converts it to a file.
 *
 *
 * @param url - The url of the image
 * @returns A Promise with tha resolves to the file or null
 *
 */
export function DownloadImageAsFile(url: string) {
  return new Promise<File>((resolve, reject) => {
    fetch(url).then((response) => {
      const blob = response.blob();
      blob
        .then((blob) => {
          const file = new File([blob], "filename.png", { type: blob.type });
          resolve(file);
        })
        .catch((error) => {
          reject(error);
        });
    });
  });
}
