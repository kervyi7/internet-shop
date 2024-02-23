import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BaseFieldComponent } from '../base-field/base-field.component';
import { InputTypes } from '../../../models/enums/input-types';
import { UntypedFormGroup } from '@angular/forms';
import { AutocompleteTypes } from '../../../models/enums/autocomplete-types';

@Component({
  selector: 'shop-def-input',
  templateUrl: './def-input.component.html',
  styleUrls: ['./def-input.component.scss', '../def-styles/qwp-styles-input-field.scss', '../def-styles/qwp-styles-field.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DefInputComponent extends BaseFieldComponent {
  @Input() label: string;
  @Input() icon: string;
  @Input() placeholder: string = '';
  @Input() autocomplete: AutocompleteTypes = AutocompleteTypes.off;
  @Input() set type(value: InputTypes | string) {
    this.thisType = value;
    this.setShowPassword();
  }
  @Input() set showPassword(value: boolean) {
    this._showPassword = value;
    this.setShowPassword();
  }

  private _showPassword: boolean = true;
  public thisType: InputTypes | string = InputTypes.text;
  public visible: boolean;
  public isNeedShowPassword: boolean;

  public setVisible(value: boolean): void {
    this.visible = value;
    this.thisType = this.visible ? InputTypes.text : InputTypes.password;
  }

  private setShowPassword(): void {
    this.isNeedShowPassword = this.thisType == InputTypes.password && this._showPassword;
  }
}
