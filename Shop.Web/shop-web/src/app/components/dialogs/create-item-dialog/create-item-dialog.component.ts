import { Component, OnInit } from '@angular/core';
import { ICodeName } from '../../../models/interfaces/base/code-name';
import { BaseCompleteComponent } from '../../base/base-complete.component';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ICodeNameForm } from '../../../models/interfaces/forms/code-name-form';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Util } from '../../../common/util';
import { MessageTypes } from '../../../models/enums/message-types';

@Component({
  selector: 'shop-create-item-dialog',
  templateUrl: './create-item-dialog.component.html',
  styleUrls: ['./create-item-dialog.component.scss']
})
export class CreateItemDialogComponent extends BaseCompleteComponent implements OnInit {
  public isValidName: boolean = true;
  public isValidCode: boolean = true;
  public codeNameForm: FormGroup<ICodeNameForm>;

  constructor(private _ref: DynamicDialogRef,
    private _refConfig: DynamicDialogConfig) {
    super();
    this.codeNameForm = this.getCodeNameForm();
  }

  public ngOnInit(): void {
    const data = this._refConfig.data;
    if (data) {
      this.codeNameForm.controls.name.setValue(data.items.name);
      this.codeNameForm.controls.code.setValue(data.items.code);
    }
  }

  public submit(): void {
    if (this.codeNameForm.invalid) {
      Util.markAllAsDirty(this.codeNameForm);
      this.notificationService.showMessage(MessageTypes.error, this.lang.notifications.error, this.lang.notifications.invalidData);
      return;
    }
    const codeName: ICodeName = {
      name: this.codeNameForm.controls.name.getRawValue(),
      code: this.codeNameForm.controls.code.getRawValue(),
    }
    this._ref.close(codeName);
  }

  private getCodeNameForm(): FormGroup<ICodeNameForm> {
    return new FormGroup<ICodeNameForm>({
      name: new FormControl("", Validators.required),
      code: new FormControl("", Validators.required),
    });
  }
}
