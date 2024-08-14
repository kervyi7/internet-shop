import { ICodeName } from "./base/code-name";
import { IImage } from "./image";
import { IPropertyTemplate, IPropertyTemplateResponse } from "./property";

export interface ICategory extends ICodeName {
  image: IImage;
  position?: number;
  propertyTemplate?: IPropertyTemplate;
}

export interface ICategoryResponse extends ICodeName {
  image: IImage;
  position?: number;
  propertyTemplate?: IPropertyTemplateResponse;
}