import { IBaseModel } from "./base/base-model";

export interface IDialogData extends IBaseModel {
  items?: any;
  itemsName?: string;
}