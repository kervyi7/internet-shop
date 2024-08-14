import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BaseCompleteComponent } from '../base/base-complete.component';
import { IPropertiesGroup, IProperty, IPropertyTemplate } from '../../models/interfaces/property';
import { Util } from '../../common/util';
import { DialogOptions } from '../../models/enums/dialog-options';
import { MessageTypes } from '../../models/enums/message-types';
import { ICodeName } from '../../models/interfaces/base/code-name';
import { PropertyDialogComponent } from '../dialogs/property-dialog/property-dialog.component';
import { SelectItemDialogComponent } from '../dialogs/select-item-dialog/select-item-dialog.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AdminCategoryDataService } from '../../services/data/admin/admin-category-data.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'shop-properties-list',
  templateUrl: './properties-list.component.html',
  styleUrls: ['./properties-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PropertiesListComponent extends BaseCompleteComponent implements OnInit {
  @Input() public isProduct: boolean;
  @Input() public template: IPropertyTemplate;
  @Input() public properties: IProperty[];

  private _dialogRef: DynamicDialogRef;
  public groups: IPropertiesGroup[];

  constructor(
    private _adminCategoryDataService: AdminCategoryDataService,
    private _cd: ChangeDetectorRef,
    private _dialogService: DialogService,
    private _notificationService: NotificationService) {
    super();
  }
  public ngOnInit() {
    if (!this.template) {
      return;
    }
    if (!this.template.extension || !this.template.extension.propertiesGroups) {
      this.template.extension = {
        propertiesGroups: []
      }
      return;
    }
    this.groups = [];
    for (let group of this.template.extension.propertiesGroups) {
      const newGroup: IPropertiesGroup = {
        name: group.name,
        code: group.code,
        propertyCodes: group.propertyCodes,
        properties: this.properties.filter((x) => group.propertyCodes.includes(x.code))
      };
      this.groups.push(newGroup);
    }
  }

  public editTemplate(): void {
    const data = { items: this.template };
    const config = { header: this.lang.headers.property, width: DialogOptions.standardWidth, maximizable: false, data: data };
    this._dialogRef = Util.openDialog(this._dialogService, SelectItemDialogComponent, config);
    this._dialogRef.onClose.subscribe((response: ICodeName) => {
      const newTemplate = this.template;
      newTemplate.name = response.name;
      newTemplate.code = response.code;
      this._adminCategoryDataService.editTemplate(newTemplate).subscribe(() => {
        this.template.name = response.name;
        this.template.code = response.code;
        this._cd.detectChanges();
      });
    });
  }

  public deleteProperty(property: IProperty, group: IProperty[], groupCode: string): void {
    this._adminCategoryDataService.deleteProperty(this.template.id, property).subscribe({
      error: (err: string) => this._notificationService.showMessage(MessageTypes.error, this.lang.notifications.error, err),
      complete: () => {
        this._notificationService.showMessage(MessageTypes.success, this.lang.notifications.success, this.lang.notifications.deletedProperty);
        group.splice(group.indexOf(property), 1);
        this.template.extension.propertiesGroups.map((x) => {
          if (x.code == groupCode) {
            this.template.extension.propertiesGroups.map((x) => {
              x.propertyCodes.splice(x.propertyCodes.indexOf(property.code), 1);
            });
          }
        });
        this._adminCategoryDataService.editTemplate(this.template).subscribe();
      }
    });
  }

  public editProperty(property: IProperty): void {
    const data = { items: property };
    const config = { header: this.lang.headers.property, width: DialogOptions.standardWidth, maximizable: false, data: data };
    this._dialogRef = Util.openDialog(this._dialogService, PropertyDialogComponent, config);
    this._dialogRef.onClose.subscribe((newProperty: IProperty) => {
      if (!newProperty) {
        return;
      }
      if (this.isProduct) {
        property.value = newProperty.value;
      } else {
        property.code = newProperty.code;
        property.name = newProperty.name;
        property.value = newProperty.value;
      }
      this._cd.detectChanges();
    });
  }

  public editPropertyGroup(group: IPropertiesGroup): void {
    const data = { items: group };
    const config = { header: this.lang.headers.property, width: DialogOptions.standardWidth, maximizable: false, data: data };
    this._dialogRef = Util.openDialog(this._dialogService, SelectItemDialogComponent, config);
    this._dialogRef.onClose.subscribe((newGroup: IPropertiesGroup) => {
      if (!newGroup) {
        return;
      }
      this.template.extension.propertiesGroups.map((x) => {
        if (x.code == group.code) {
          x.code = newGroup.code;
          x.name = newGroup.name;
        }
      });
      this._adminCategoryDataService.editTemplate(this.template).subscribe(() => {
        group.code = newGroup.code;
        group.name = newGroup.name;
        this._cd.detectChanges();
      });
    });
  }

  public addPropertyGroup(): void {
    const config = { header: this.lang.headers.property, width: DialogOptions.standardWidth, maximizable: false };
    this._dialogRef = Util.openDialog(this._dialogService, SelectItemDialogComponent, config);
    this._dialogRef.onClose.subscribe((group: ICodeName) => {
      if (!group) {
        return;
      }
      const newGroup: IPropertiesGroup = {
        name: group.name,
        code: group.code,
        propertyCodes: [],
        properties: []
      };
      this.groups.push(newGroup);
      this._cd.detectChanges();
    });
  }

  public addProperty(group: IPropertiesGroup): void {
    const data = { templateId: this.template.id }
    const config = { header: this.lang.headers.property, width: DialogOptions.standardWidth, maximizable: false, data: data };
    this._dialogRef = Util.openDialog(this._dialogService, PropertyDialogComponent, config);
    this._dialogRef.onClose.subscribe((property: IProperty) => {
      if (!property) {
        return;
      }
      group.propertyCodes.push(property.code);
      this.template.extension.propertiesGroups = this.groups;
      this._adminCategoryDataService.editTemplate(this.template).subscribe(() => {
        group.properties.push(property);
        this._cd.detectChanges();
      });
    });
  }
}
