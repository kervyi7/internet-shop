import { ICodeName } from "./base/code-name";
import { ICategory } from "./category";
import { IImage } from "./image";
import { IProperty, IPropertyAll, IPropertyResponse } from "./property";

export interface IProduct extends ICodeName, IPropertyAll {
  category: ICategory;
  type: ICodeName;
  brand: ICodeName;
  price: number;
  salePrice: number;
  count: number;
  description: string;
  currency: string;
  isExist: boolean;
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

export interface IProductResponse extends IPropertyResponse, IProduct {
  dateProperties: IProperty<string>[];
}