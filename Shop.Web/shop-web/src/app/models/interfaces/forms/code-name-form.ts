import { FormControl } from "@angular/forms";

export interface ICodeNameForm {
  name: FormControl<string>,
  code: FormControl<string>
}