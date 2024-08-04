import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminCategoryDataService } from '../../../../services/data/admin/admin-category-data.service';
import { BaseCompleteComponent } from '../../../../components/base/base-complete.component';
import { takeUntil } from 'rxjs';
import { ICategory } from '../../../../models/interfaces/category';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ImageStorageDialogComponent } from '../../../../components/dialogs/image-storage-dialog/image-storage-dialog.component';
import { MessageTypes } from '../../../../models/enums/message-types';
import { NotificationService } from '../../../../services/notification.service';
import { DialogOptions } from '../../../../models/enums/dialog-options';
import { Converter } from '../../../../common/converter';
import { Util } from '../../../../common/util';
import { IImage } from '../../../../models/interfaces/image';
import { Location } from '@angular/common';
import { IBaseModel } from '../../../../models/interfaces/base/base-model';
import { IPropertiesGroup, IPropertyTemplate } from '../../../../models/interfaces/property';
import { SelectItemDialogComponent } from '../../../../components/dialogs/select-item-dialog/select-item-dialog.component';
import { ICodeName } from '../../../../models/interfaces/base/code-name';

@Component({
  selector: 'shop-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryComponent extends BaseCompleteComponent implements OnInit {
  private _dialogRef: DynamicDialogRef;
  public id: number;
  public imageChangedFile: File;
  public image: string = "";
  public groups: IPropertiesGroup[] = [];
  public category: ICategory;
  public categoryName: string;
  public categoryCode: string;
  public template: IPropertyTemplate;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _adminCategoryDataService: AdminCategoryDataService,
    private _cd: ChangeDetectorRef,
    private _dialogService: DialogService,
    private _notificationService: NotificationService,
    private _location: Location) {
    super();
  }

  public ngOnInit(): void {
    this.id = +this._activatedRoute.snapshot.paramMap.get('id')!;
    if (this.id) {
      this.loadCategory();
    } else {
      this.category = {
        image: null,
        code: null,
        name: null,
      }
    }
  }

  public submit(): void {
    if (this.id) {
      this.edit();
    } else {
      this.create();
    }
  }

  public showImageStorage(): void {
    const config = { header: this.lang.headers.imageStorage, overflow: 'auto', baseZIndex: 4, width: DialogOptions.standardWidth, maximizable: true };
    this._dialogRef = Util.openDialog(this._dialogService, ImageStorageDialogComponent, config);
    this._dialogRef.onClose.subscribe(data => {
      if (!data) {
        return;
      }
      this.category.image = data;
      this.image = data.smallBody;
      this.editImage(data);
      this._cd.detectChanges();
    });
  }

  public goToPreviousPage(): void {
    this._router.navigate(['/admin/categories']);
  }

  public addPropertyTemplate(): void {
    const config = { header: this.lang.headers.property, width: DialogOptions.standardWidth, maximizable: false };
    this._dialogRef = Util.openDialog(this._dialogService, SelectItemDialogComponent, config);
    this._dialogRef.onClose.subscribe((template: ICodeName) => {
      const newTemplate: IPropertyTemplate = {
        categoryId: this.category.id,
        name: template.name,
        code: template.code,
        extension: {
          propertiesGroups: []
        },
        stringProperties: [],
        decimalProperties: [],
        boolProperties: [],
        dateProperties: []
      };
      this._adminCategoryDataService.createTemplate(newTemplate).subscribe((data: IBaseModel) => {
        this.template = newTemplate;
        this.template.id = data.id;
        this._cd.detectChanges();
      });
    });
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

  public editImage(image: IImage): void {
    image.referenceKey = this.category.id;
    this._adminCategoryDataService.editImage(this.id, image).subscribe(() => {
      this.image = image.smallBody;
    });
  }

  private edit(): void {
    const category: ICategory = {
      id: this.id,
      image: this.category.image,
      name: this.categoryName,
      code: this.categoryCode,
      position: null
    }
    if (this.validate(category)) {
      this._notificationService.showMessage(MessageTypes.error, this.lang.notifications.error, this.lang.notifications.notChanged);
    }
    this._adminCategoryDataService.editCategory(this.id, category).subscribe();
  }

  private validate(category: ICategory): boolean {
    return category == this.category;
  }

  private create(): void {
    const category: ICategory = {
      image: this.category.image,
      name: this.categoryName,
      code: this.categoryCode
    };
    this._adminCategoryDataService.create(category).subscribe((data: IBaseModel) => {
      this._location.replaceState(`admin/categories/edit/${data.id}`)
      this.id = data.id
      this._cd.detectChanges();
    });
  }

  public loadCategory(): void {
    this._adminCategoryDataService.getById(this.id)
      .pipe(takeUntil(this.__unsubscribe$))
      .subscribe((data: ICategory) => {
        this.category = data;
        this.categoryName = this.category.name;
        this.categoryCode = this.category.code;
        if (this.category.image) {
          this.image = Converter.toFileSrc(this.category.image.mimeType, this.category.image.smallBody);
        }
        this.template = data.propertyTemplate;
        this._cd.detectChanges();
      });
  }
}
