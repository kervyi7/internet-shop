import { FormControl } from "@angular/forms";

export interface ILoginForm {
	userName: FormControl<string>,
	password: FormControl<string>
}