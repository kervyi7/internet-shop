import { ICodeName } from "./base/code-name";

export interface IProperty<T = propertyValue> extends ICodeName {
  productId: number;
  isPrimary: boolean;
  isTitle: boolean;
  description: string;
  suffix: string;
  value: T;
}