import { ICodeName } from "./base/code-name";

export interface IProperty<T = propertyValue> extends ICodeName {
  productId: number;
  propertyTemplateId: number;
  isPrimary: boolean;
  isTitle: boolean;
  description: string;
  suffix: string;
  value: T;
}

export interface IPropertyTemplate extends ICodeName {
  categoryId: number;
  extension: ITemplateExtension;
  stringProperties: IProperty<string>[];
  decimalProperties: IProperty<number>[];
  boolProperties: IProperty<boolean>[];
  dateProperties: IProperty[];
}

export interface ITemplateExtension {
  propertiesGroups: IPropertiesGroupResponse[];
}

export interface IPropertiesGroup extends ICodeName {
  propertyCodes: string[];
  stringProperties: IProperty<string>[];
  decimalProperties: IProperty<number>[];
  boolProperties: IProperty<boolean>[];
  dateProperties: IProperty[];
}

export interface IPropertiesGroupResponse extends ICodeName {
  propertyCodes: string[];
}