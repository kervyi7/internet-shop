import { Component, OnInit } from '@angular/core';
import { IProperty } from '../../../models/interfaces/property';
import { AdminProductDataService } from '../../../services/data/admin-product-data.service';
import { PropertyTypes } from '../../../models/enums/property-types';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageTypes } from '../../../models/enums/message-types';
import { NotificationService } from '../../../services/notification.service';
import { IDialogData } from '../../../models/interfaces/dialog-data';
import { Util } from '../../../common/util';
import { BaseCompleteComponent } from '../../base/base-complete.component';

@Component({
  selector: 'shop-property-dialog',
  templateUrl: './property-dialog.component.html',
  styleUrls: ['./property-dialog.component.scss']
})
export class PropertyDialogComponent extends BaseCompleteComponent implements OnInit {
  private data: IDialogData;
  public selectedType = PropertyTypes.string;
  public propertyTypes = PropertyTypes;
  public property: IProperty;
  public editedProperty: IProperty;
  public isDisabled = false;

  constructor(private _adminProductService: AdminProductDataService,
    private _ref: DynamicDialogRef,
    private _refConfig: DynamicDialogConfig,
    private _notificationService: NotificationService) {
    super();
  }

  public ngOnInit(): void {
    this.data = this._refConfig.data;
    if (!this.data.id) {
      this.isDisabled = true;
      this.property = this._refConfig.data.items;
      this.editedProperty = structuredClone(this.property);
      this.selectedType = Util.getPropertyType(this.editedProperty);
    } else {
      this.editedProperty = {//create class
        id: 0,
        productId: 0,
        isPrimary: false,
        isTitle: false,
        description: '',
        value: '',
        code: '',
        name: '',
        suffix: ''
      }
    }
  }

  public save(): void {
    const property: IProperty = {
      productId: this.editedProperty.productId || this._refConfig.data.id,
      isPrimary: this.editedProperty.isPrimary,
      isTitle: this.editedProperty.isTitle,
      description: this.editedProperty.description,
      suffix: this.editedProperty.suffix,
      value: this.editedProperty.value,
      name: this.editedProperty.name,
      code: this.editedProperty.code,
      id: this.editedProperty.id,
    };
    if (!this.isDataValid(property)) {
      this._notificationService.showMessage(MessageTypes.error, "Error", "Invalid data");
      return;
    }
    if (this.property) {
      if (Util.isDataEqual(property, this.property)) {
        this._ref.close();
        return;
      }
      this._adminProductService.editProperty(property.id, property).subscribe({
        error: err => this._notificationService.showMessage(MessageTypes.error, "Error", "Changes were not detected"),//todo create message enum
        complete: () => {
          this._notificationService.showMessage(MessageTypes.success, "Success", "Changes were saved")
          this._ref.close();
        }
      });
    } else {
      this._adminProductService.addProperty(property).subscribe({
        error: err => this._notificationService.showMessage(MessageTypes.error, "Error", "Changes were not detected"),
        complete: () => {
          this._notificationService.showMessage(MessageTypes.success, "Success", "Changes were saved")
          this._ref.close();
        }
      });
    }
  }

  private isDataValid(editedString: IProperty): boolean {
    const isRequiredFilled = editedString.name != '' && editedString.code != '' && editedString.value !== '';
    return isRequiredFilled;
  }
}
