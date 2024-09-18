import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminCategoryDataService } from '../../../../services/data/admin/admin-category-data.service';
import { BaseCompleteComponent } from '../../../../components/base/base-complete.component';
import { takeUntil } from 'rxjs';
import { ICategory } from '../../../../models/interfaces/category';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ImageStorageDialogComponent } from '../../../../components/dialogs/image-storage-dialog/image-storage-dialog.component';
import { MessageTypes } from '../../../../models/enums/message-types';
import { DialogOptions } from '../../../../models/enums/dialog-options';
import { Converter } from '../../../../common/converter';
import { Util } from '../../../../common/util';
import { IImage } from '../../../../models/interfaces/image';
import { Location } from '@angular/common';
import { IBaseModel } from '../../../../models/interfaces/base/base-model';
import { IPropertiesGroup, IProperty, IPropertyTemplate } from '../../../../models/interfaces/property';
import { CreateItemDialogComponent } from '../../../../components/dialogs/create-item-dialog/create-item-dialog.component';
import { ICodeName } from '../../../../models/interfaces/base/code-name';
import { ICodeNameForm } from '../../../../models/interfaces/forms/code-name-form';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'shop-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss', '../../../../../assets/styles/category-product.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryComponent extends BaseCompleteComponent implements OnInit {
  private _dialogRef: DynamicDialogRef;
  public id: number;
  public imageChangedFile: File;
  public image: string = "";
  public groups: IPropertiesGroup[] = [];
  public categoryName: string;
  public categoryCode: string;
  public template: IPropertyTemplate;
  public properties: IProperty[] = [];
  public categoryForm: FormGroup<ICodeNameForm>;
  public category: ICategory = {
    image: null,
    code: null,
    name: null,
    propertyTemplate: null,
  };

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _adminCategoryDataService: AdminCategoryDataService,
    private _cd: ChangeDetectorRef,
    private _dialogService: DialogService,
    private _location: Location) {
    super();
    this.categoryForm = this.getCategoryForm();
  }

  public ngOnInit(): void {
    this.id = +this._activatedRoute.snapshot.paramMap.get('id')!;
    if (this.id) {
      this.loadCategory();
    }
  }

  public submit(): void {
    if (this.categoryForm.invalid) {
      Util.markAllAsDirty(this.categoryForm);
      this.notificationService.showMessage(MessageTypes.error, this.lang.notifications.error, this.lang.notifications.invalidData);
      return;
    }
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
    this._dialogRef = Util.openDialog(this._dialogService, CreateItemDialogComponent, config);
    this._dialogRef.onClose.pipe(takeUntil(this.__unsubscribe$)).subscribe((template: ICodeName) => {
      if (!template) {
        return;
      }
      this.displayService.changeStateLoadBar(true);
      const newTemplate: IPropertyTemplate = {
        categoryId: this.id,
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
      this._adminCategoryDataService.createTemplate(newTemplate)
        .pipe(takeUntil(this.__unsubscribe$))
        .subscribe((data: IBaseModel) => {
          this.template = newTemplate;
          this.template.id = data.id;
          this.displayService.changeStateLoadBar(false);
          this._cd.detectChanges();
        });
    });
  }

  public editImage(image: IImage): void {
    image.referenceKey = this.id;
    this._adminCategoryDataService.editImage(this.id, image)
      .pipe(takeUntil(this.__unsubscribe$))
      .subscribe(() => {
        this.image = image.smallBody;
      });
  }

  private edit(): void {
    this.displayService.changeStateLoadBar(true);
    const category: ICategory = {
      id: this.id,
      image: this.category.image,
      name: this.categoryForm.controls.name.getRawValue(),
      code: this.categoryForm.controls.code.getRawValue(),
      position: null
    }
    if (this.validate(category)) {
      this.notificationService.showMessage(MessageTypes.error, this.lang.notifications.error, this.lang.notifications.notChanged);
    }
    this._adminCategoryDataService.editCategory(this.id, category)
      .pipe(takeUntil(this.__unsubscribe$))
      .subscribe(() => {
        this.displayService.changeStateLoadBar(false);
      });
  }

  private validate(category: ICategory): boolean {
    return category == this.category;
  }

  private create(): void {
    this.displayService.changeStateLoadBar(true);
    const category: ICategory = {
      image: this.category.image,
      name: this.categoryForm.controls.name.getRawValue(),
      code: this.categoryForm.controls.code.getRawValue(),
    };
    this._adminCategoryDataService.create(category)
      .pipe(takeUntil(this.__unsubscribe$))
      .subscribe((data: IBaseModel) => {
        this._location.replaceState(`admin/categories/edit/${data.id}`)
        this.id = data.id;
        this.displayService.changeStateLoadBar(false);
        this._cd.detectChanges();
      });
  }

  private getCategoryForm(): FormGroup<ICodeNameForm> {
    return new FormGroup<ICodeNameForm>({
      name: new FormControl("", Validators.required),
      code: new FormControl("", Validators.required),
    });
  }

  private loadCategory(): void {
    this.displayService.changeStateLoadBar(true);
    this._adminCategoryDataService.getById(this.id)
      .pipe(takeUntil(this.__unsubscribe$))
      .subscribe((data: ICategory) => {
        this.category = data;
        this.categoryForm.patchValue(data);
        if (this.category.image) {
          this.image = Converter.toFileSrc(this.category.image.mimeType, this.category.image.smallBody);
        }
        this.template = data.propertyTemplate;
        if (!this.template) {
          this.displayService.changeStateLoadBar(false);
          this._cd.detectChanges();
          return;
        }
        this.properties.push(...this.template.stringProperties);
        this.properties.push(...this.template.decimalProperties);
        this.properties.push(...this.template.boolProperties);
        this.properties.push(...this.template.dateProperties);
        this.displayService.changeStateLoadBar(false);
        this._cd.detectChanges();
      });
  }
}
