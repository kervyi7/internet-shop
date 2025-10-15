import { IBaseModel } from "./base/base-model";

export interface ShippingOption extends IBaseModel {
  name: string;
  cost: number;
  description: string;
  isActive: boolean;
}
