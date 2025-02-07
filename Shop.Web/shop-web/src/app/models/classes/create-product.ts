import { ICreateProduct } from "../interfaces/product";

export class CreateProduct implements ICreateProduct {
  public code: string;
  public name: string;
  public categoryId: number;
  public typeId: number;
  public brandId: number;
  public price: number;
  public currency: string;
  public isExist: boolean;
  public id?: number;

  constructor() {

  }
}