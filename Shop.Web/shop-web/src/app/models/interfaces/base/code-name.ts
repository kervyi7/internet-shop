import { IBaseModel } from "./base-model";

export interface ICodeName extends IBaseModel{
  code: string;
  name: string;
}