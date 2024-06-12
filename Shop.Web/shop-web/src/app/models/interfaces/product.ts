import { ICodeName } from "./base/code-name";
import { IImage } from "./image";
import { IProperty } from "./property";

export interface IProduct extends ICodeName {
  category: ICodeName;
  type: ICodeName;
  brand: ICodeName;
  price: number;
  salePrice: number;
  count: number;
  description: string;
  currency: string;
  isExist: boolean;
  stringProperties: IProperty[];
  intProperties: IProperty[];
  boolProperties: IProperty[];
  dateProperties: IProperty[];
  images: IImage[];
}

export interface ICreateProduct extends ICodeName {
  categoryId: number;
  typeId: number;
  brandId: number;
  price: number;
  currency: string;
  isExist: boolean;
  salePrice: number;
  count: number;
  description: string;
}

export interface IProductResponse extends IProduct {
  dateProperties: IProperty<string>[];
}