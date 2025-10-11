import { FormControl } from "@angular/forms";

export interface ILoginForm {
  userName: FormControl<string>,
  password: FormControl<string>
}

export interface ISignUpForm {
  userName: FormControl<string>,
  firstName: FormControl<string>,
  lastName: FormControl<string>,
  email: FormControl<string>,
  password: FormControl<string>,
  confirmPassword: FormControl<string>
}
