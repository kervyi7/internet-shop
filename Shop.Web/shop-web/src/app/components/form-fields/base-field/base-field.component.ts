import { Directive, Input } from "@angular/core";
import { UntypedFormGroup, Validators } from "@angular/forms";

@Directive()
export abstract class BaseFieldComponent {
  @Input() formGroup: UntypedFormGroup;
  @Input() fieldCode: string;

  public isInvalid(): boolean {
    const control = this.formGroup.controls[this.fieldCode];
    return (control.touched || control.dirty) && control.invalid;
  }

  public isRequired(): boolean {
    return this.formGroup.controls[this.fieldCode].hasValidator(Validators.required);
  }

  public isDisabled(): boolean {
    return this.formGroup.controls[this.fieldCode].disabled;
  }
}
