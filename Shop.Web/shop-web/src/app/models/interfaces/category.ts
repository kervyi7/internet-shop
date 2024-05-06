import { ICodeName } from "./base/code-name";
import { IImage } from "./image";

export interface ICategory extends ICodeName {
  image: IImage;
  position?: number;
}