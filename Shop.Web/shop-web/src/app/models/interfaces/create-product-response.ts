import { IBaseModel } from "./base/base-model";
import { IPropertyTemplate } from "./property";

export interface ICreateProductResponse extends IBaseModel {
  propertyTemplate?: IPropertyTemplate;
}