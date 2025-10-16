import { FormControl } from "@angular/forms";
import { ICodeNameForm } from "./code-name-form";
import { ICodeName } from "../base/code-name";
import { ICategory } from "../category";

export interface IProductForm extends ICodeNameForm {
  category: FormControl<ICategory>;
  type: FormControl<ICodeName>;
  brand: FormControl<ICodeName>;
  price: FormControl<number>;
  discountedPrice: FormControl<number>;
  count: FormControl<number>;
  description: FormControl<string>;
  currency: FormControl<string>;
}