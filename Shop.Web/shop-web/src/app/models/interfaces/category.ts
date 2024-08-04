import { ICodeName } from "./base/code-name";
import { IImage } from "./image";
import { IPropertyTemplate } from "./property";

export interface ICategory extends ICodeName {
  image: IImage;
  position?: number;
  propertyTemplate?: IPropertyTemplate;
}