/**
 * Converts a FormData object into a JSON object
 *
 *
 * @param formData - The FormData object
 * @returns A `Record<string, any>` JSON object
 *
 */
export function formDataToJson(formData: FormData): Record<string, any> {
  const jsonObject: Record<string, any> = {};

  formData.forEach((value, key) => {
    const keys = key.split(".");
    let obj = jsonObject;
    keys.forEach((k, index) => {
      if (index === keys.length - 1) {
        obj[k] = value;
      } else {
        obj[k] = obj[k] || {};
        obj = obj[k];
      }
    });
  });

  return jsonObject;
}
