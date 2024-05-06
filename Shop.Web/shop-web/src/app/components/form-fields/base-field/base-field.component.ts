import { Directive, Input } from "@angular/core";
import { UntypedFormGroup, Validators } from "@angular/forms";

@Directive()
export abstract class BaseFieldComponent {
  @Input() group: UntypedFormGroup;
  @Input() fieldCode: string;

  public isInvalid(): boolean {
    const control = this.group.controls[this.fieldCode];
    return (control.touched || control.dirty) && control.invalid;
  }

  public isRequired(): boolean {
    return this.group.controls[this.fieldCode].hasValidator(Validators.required);
  }

  public isDisabled(): boolean {
    return this.group.controls[this.fieldCode].disabled;
  }

  protected handleChangedValue(value: propertyValue, key?: string | number): void {
    if ((key === null && value === this.group.value) || (this.fieldCode != null && this.fieldCode === key)) {
      return;
    }
  }
}
