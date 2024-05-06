import { MimeTypes } from "../models/enums/mime-types";

export class Converter {
  public static base64ToFile(base64: string, filename: string, options?: FilePropertyBag): File {
    const bstr = atob(base64);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, options);
  }

  public static async fileToBase64(file: File | Blob): Promise<string> {
    const buffer = await file.arrayBuffer();
    const array = new Uint8Array(buffer);
    const base64 = btoa(Array(array.length)
      .fill('')
      .map((_, i) => String.fromCharCode(array[i]))
      .join(''));
    return base64;
  }

  public static toFileSrc(type: MimeTypes | string, body: string): string {
    return `data:${type};base64, ${body}`;
  }
}