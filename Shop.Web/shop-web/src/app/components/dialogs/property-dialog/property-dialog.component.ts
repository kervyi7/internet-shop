import { Component, OnInit } from '@angular/core';
import { IProperty } from '../../../models/interfaces/property';
import { AdminProductDataService } from '../../../services/data/admin/admin-product-data.service';
import { PropertyTypes } from '../../../models/enums/property-types';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageTypes } from '../../../models/enums/message-types';
import { NotificationService } from '../../../services/notification.service';
import { IDialogData } from '../../../models/interfaces/dialog-data';
import { Util } from '../../../common/util';
import { BaseCompleteComponent } from '../../base/base-complete.component';
import { Property } from '../../../models/classes/property';
import { AdminCategoryDataService } from '../../../services/data/admin/admin-category-data.service';

@Component({
  selector: 'shop-property-dialog',
  templateUrl: './property-dialog.component.html',
  styleUrls: ['./property-dialog.component.scss']
})
export class PropertyDialogComponent extends BaseCompleteComponent implements OnInit {
  private _data: IDialogData;
  public selectedType = PropertyTypes.string;
  public propertyTypes = PropertyTypes;
  public property: IProperty;
  public editedProperty: Property = new Property();
  public isDisabled = false;

  constructor(private _adminProductService: AdminProductDataService,
    private _adminCategoryService: AdminCategoryDataService,
    private _ref: DynamicDialogRef,
    private _refConfig: DynamicDialogConfig,
    private _notificationService: NotificationService) {
    super();
  }

  public ngOnInit(): void {
    this._data = this._refConfig.data;
    if (this._data.items) {
      this.isDisabled = true;
      this.property = this._data.items;
      this.editedProperty = structuredClone(this.property);
      this.selectedType = this.editedProperty.type;
    };
  }

  public save(): void {
    const property: IProperty = {
      type: this.selectedType,
      productId: this.editedProperty.productId || this._refConfig.data.productId,
      propertyTemplateId: this.editedProperty.propertyTemplateId || this._refConfig.data.templateId,
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
      if (this.isBoolProperty() && this.isValueEmpty(property.value)) {
        property.value = false;
      } else {
        this._notificationService.showMessage(MessageTypes.error, this.lang.notifications.error, this.lang.notifications.invalidData);
        return;
      }
    }
    if (this.property) {
      if (Util.isDataEqual(property, this.property)) {
        this._ref.close();
        return;
      }
      if (!this.property.productId) {
        this._adminCategoryService.editProperty(property.id, property).subscribe({
          error: err => this._notificationService.showMessage(MessageTypes.error, this.lang.notifications.error, this.lang.notifications.notChanged),
          complete: () => {
            this._notificationService.showMessage(MessageTypes.success, this.lang.notifications.success, this.lang.notifications.changesSaved)
            this._ref.close(property);
          }
        });
      } else {
        this._adminProductService.editProperty(property.id, property).subscribe({
          error: err => this._notificationService.showMessage(MessageTypes.error, this.lang.notifications.error, this.lang.notifications.notChanged),
          complete: () => {
            this._notificationService.showMessage(MessageTypes.success, this.lang.notifications.success, this.lang.notifications.changesSaved)
            this._ref.close(property);
          }
        });
      }
    } else {
      this._adminCategoryService.addProperty(property).subscribe({
        error: err => this._notificationService.showMessage(MessageTypes.error, this.lang.notifications.error, this.lang.notifications.notChanged),
        complete: () => {
          this._notificationService.showMessage(MessageTypes.success, this.lang.notifications.success, this.lang.notifications.changesSaved)
          this._ref.close(property);
        }
      });
    }
  }

  private isBoolProperty(): boolean {
    return this.selectedType == 'bool';
  }

  private isValueEmpty(value: propertyValue): boolean {
    return value == '';
  }

  private isDataValid(editedString: IProperty): boolean {
    const isRequiredFilled = editedString.name != '' && editedString.code != '' && editedString.value !== '';
    return isRequiredFilled;
  }
}
