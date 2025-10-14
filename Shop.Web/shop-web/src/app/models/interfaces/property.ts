import { PropertyTypes } from "../enums/property-types";
import { ICodeName } from "./base/code-name";

export interface IProperty<T = propertyValue> extends ICodeName {
  productId: number;
  propertyTemplateId: number;
  isPrimary: boolean;
  isTitle: boolean;
  description: string;
  suffix: string;
  type: PropertyTypes;
  value: T;
}

export interface IPropertyTemplate extends ICodeName, IPropertyAll {
  categoryId: number;
  extension: ITemplateExtension;
}
//TODO: check if needed
export interface IPropertyTemplateResponse extends IPropertyResponse, IPropertyTemplate {
}

export interface IPropertyResponse extends IPropertyAll {
}

export interface IPropertyAll {
  stringProperties?: IProperty<string>[];
  decimalProperties?: IProperty<number>[];
  boolProperties?: IProperty<boolean>[];
  dateProperties?: IProperty[];
}

export interface ITemplateExtension {
  propertiesGroups: IPropertiesGroupResponse[];
}

export interface IPropertiesGroup extends ICodeName {
  propertyCodes: string[];
  properties: IProperty[];
}

export interface IPropertiesGroupResponse extends ICodeName {
  propertyCodes: string[];
}