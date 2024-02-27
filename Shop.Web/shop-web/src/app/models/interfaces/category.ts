import { IBaseModel } from "./base/base-model";
import { ICodeName } from "./base/code-name";

export interface ICategory extends IBaseModel, ICodeName {
  avatar: string;
}