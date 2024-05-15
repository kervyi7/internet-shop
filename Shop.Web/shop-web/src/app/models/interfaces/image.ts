import { IBaseModel } from "./base/base-model";

export interface IImage extends IBaseImage {
  referenceKey?: number;
}

export interface IBaseImage extends IBaseModel {
  body: string;
  smallBody: string;
  fileSize: number;
  fileName: string;
  name: string;
  mimeType: string;
  isBinding: boolean;
}