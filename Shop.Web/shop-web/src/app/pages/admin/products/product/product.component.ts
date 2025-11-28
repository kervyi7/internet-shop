import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  Type,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs';
import { IImage } from '../../../../models/interfaces/image';
import { BaseCompleteComponent } from '../../../../components/base/base-complete.component';
import {
  IProduct,
  IProductResponse,
} from '../../../../models/interfaces/product';
import { AdminProductDataService } from '../../../../services/data/admin/admin-product-data.service';
import { AdminCategoryDataService } from '../../../../services/data/admin/admin-category-data.service';
import { ICategory } from '../../../../models/interfaces/category';
import { ICodeName } from '../../../../models/interfaces/base/code-name';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { CreateItemDialogComponent } from '../../../../components/dialogs/create-item-dialog/create-item-dialog.component';
import { MessageTypes } from '../../../../models/enums/message-types';
import { ImageStorageDialogComponent } from '../../../../components/dialogs/image-storage-dialog/image-storage-dialog.component';
import { DialogOptions } from '../../../../models/enums/dialog-options';
import {
  IProperty,
  IPropertyTemplate,
} from '../../../../models/interfaces/property';
import { BrandDataService } from '../../../../services/data/admin/admin-brand-data.service';
import { TypeDataService } from '../../../../services/data/admin/admin-type-data.service';
import { Util } from '../../../../common/util';
import { Converter } from '../../../../common/converter';
import { Location } from '@angular/common';
import { IBaseModel } from '../../../../models/interfaces/base/base-model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IProductForm } from '../../../../models/interfaces/forms/product-form';
import Quill from 'quill';

@Component({
  selector: 'shop-product',
  templateUrl: './product.component.html',
  styleUrls: [
    './product.component.scss',
    '../../../../../assets/styles/category-product.scss',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductComponent extends BaseCompleteComponent implements OnInit {
  private _dialogRef: DynamicDialogRef;
  public id: number;
  public imageChangedFile: File;
  public categories: ICodeName[] = [];
  public types: ICodeName[] = [];
  public brands: ICodeName[] = [];
  public selectedType: ICodeName;
  public selectedBrand: ICodeName;
  public selectedCategory: ICodeName;
  public images: IImage[] = [];
  public titleImage: IImage;
  public product: IProduct;
  public template: IPropertyTemplate;
  public properties: IProperty[] = [];
  public productForm: FormGroup<IProductForm>;

  constructor(
    private _dialogService: DialogService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _adminProductDataService: AdminProductDataService,
    private _adminCategoryDataService: AdminCategoryDataService,
    private _brandDataService: BrandDataService,
    private _typeDataService: TypeDataService,
    private _cd: ChangeDetectorRef,
    private _location: Location
  ) {
    super();
    this.productForm = this.getProductForm();
  }

  public ngOnInit(): void {
    this.displayService.changeStateLoadBar(true);
    this.id = +this._activatedRoute.snapshot.paramMap.get('id')!;
    if (!this.id) {
      this.productForm = this.getProductForm();
      this.displayService.changeStateLoadBar(false);
      return;
    }
    this._adminProductDataService
      .getById(this.id)
      .pipe(takeUntil(this.__unsubscribe$))
      .subscribe((data: IProduct) => {
        this.images = data.images.map((image) => {
          image.smallBody = Converter.toFileSrc(
            image.mimeType,
            image.smallBody
          );
          return image;
        });
        this.titleImage = data.images.find((image) => {
          return image.isTitle;
        });
        this.product = data;
        this.removeTitleImage();
        this.categories.push(data.category);
        this.types.push(data.type);
        this.brands.push(data.brand);
        this.productForm.patchValue(data);
        this.selectedCategory = data.category;
        this.selectedType = data.type;
        this.selectedBrand = data.brand;
        this.properties.push(...this.product.stringProperties);
        this.properties.push(...this.product.decimalProperties);
        this.properties.push(...this.product.boolProperties);
        this.template = data.category.propertyTemplate;
        this.displayService.changeStateLoadBar(false);
        this._cd.detectChanges();
      });
  }

  public getTypes(): void {
    if (this.types.length > 1) {
      return;
    }
    this.displayService.changeStateLoadBar(true);
    this._typeDataService
      .getType()
      .pipe(takeUntil(this.__unsubscribe$))
      .subscribe((data: ICodeName[]) => {
        if (this.types.length) {
          const index = data.findIndex(
            (item) => item.code == this.types[0].code
          );
          data.splice(index, 1);
        }
        this.types.push(...data);
        this.displayService.changeStateLoadBar(false);
        this._cd.detectChanges();
      });
  }

  public getBrands(): void {
    if (this.brands.length > 1) {
      return;
    }
    this.displayService.changeStateLoadBar(true);
    this._brandDataService
      .getBrand()
      .pipe(takeUntil(this.__unsubscribe$))
      .subscribe((data: ICodeName[]) => {
        if (this.brands.length) {
          const index = data.findIndex(
            (item) => item.code == this.brands[0].code
          );
          data.splice(index, 1);
        }
        this.brands.push(...data);
        this.displayService.changeStateLoadBar(false);
        this._cd.detectChanges();
      });
  }

  public getCategories(): void {
    if (this.categories.length > 1) {
      return;
    }
    this.displayService.changeStateLoadBar(true);
    this._adminCategoryDataService
      .getAllMini()
      .pipe(takeUntil(this.__unsubscribe$))
      .subscribe((data: ICodeName[]) => {
        if (this.categories.length) {
          const index = data.findIndex(
            (item) => item.code == this.categories[0].code
          );
          data.splice(index, 1);
        }
        this.categories.push(...data);
        this.displayService.changeStateLoadBar(false);
        this._cd.detectChanges();
      });
  }

  public editImages(isTitle: boolean): void {
    const config = {
      header: this.lang.headers.imageStorage,
      width: DialogOptions.standardWidth,
      maximizable: true,
    };
    this.openDialog(ImageStorageDialogComponent, config);
    this._dialogRef.onClose.subscribe((data) => {
      if (!data) {
        return;
      }
      this.saveImage(data, isTitle);
    });
  }

  public onEditorChange(event: Quill) {
    this.productForm.controls.description.setValue(event.root.innerHTML);
  }

  public addType(): void {
    const config = {
      header: this.lang.headers.types,
      width: DialogOptions.standardWidth,
      maximizable: true,
    };
    this.openDialog(CreateItemDialogComponent, config);
    this._dialogRef.onClose.subscribe((type: ICodeName) => {
      if (!type) {
        return;
      }
      this._typeDataService
        .createType(type)
        .pipe(takeUntil(this.__unsubscribe$))
        .subscribe((data) => {
          type.id = data.id;
          this.types.unshift(type);
        });
    });
  }

  public addBrand(): void {
    const config = {
      header: this.lang.headers.brands,
      width: DialogOptions.standardWidth,
      maximizable: true,
    };
    this.openDialog(CreateItemDialogComponent, config);
    this._dialogRef.onClose.subscribe((brand: ICodeName) => {
      if (!brand) {
        return;
      }
      this._brandDataService
        .createBrand(brand)
        .pipe(takeUntil(this.__unsubscribe$))
        .subscribe((data: IBaseModel) => {
          brand.id = data.id;
          this.brands.unshift(brand);
        });
    });
  }

  public deleteImage(image: IImage): void {
    this.displayService.changeStateLoadBar(true);
    image.referenceKey = this.id;
    this._adminProductDataService
      .deleteImage(this.product.id, image)
      .pipe(takeUntil(this.__unsubscribe$))
      .subscribe(() => {
        if (image.isTitle) {
          this.titleImage = null;
        } else {
          this.images.splice(this.images.indexOf(image), 1);
        }
        this.notificationService.showMessage(
          MessageTypes.success,
          this.lang.notifications.success,
          this.lang.notifications.success
        );
        this.displayService.changeStateLoadBar(false);
        this._cd.detectChanges();
      });
  }

  public goToPreviousPage(): void {
    this._router.navigate(['/admin/products']);
  }

  public submit(): void {
    if (this.productForm.invalid) {
      Util.markAllAsDirty(this.productForm);
      this.notificationService.showMessage(
        MessageTypes.error,
        this.lang.notifications.error,
        this.lang.notifications.invalidData
      );
      this._cd.detectChanges();
      return;
    }
    const product: IProduct = { ...this.productForm.getRawValue(), images: [] };
    if (product.discountedPrice >= product.price) {
      this.notificationService.showMessage(
        MessageTypes.error,
        this.lang.notifications.error,
        this.lang.notifications.invalidData
      );
      this.productForm.controls.discountedPrice.setErrors({ incorrect: true });
      this.productForm.controls.price.setErrors({ incorrect: true });
      this._cd.detectChanges();
      return;
    }
    this.displayService.changeStateLoadBar(true);
    if (this.id) {
      product.id = this.id;
      this._adminProductDataService
        .edit(this.id, product)
        .pipe(takeUntil(this.__unsubscribe$))
        .subscribe({
          error: (err) => {
            this.notificationService.showMessage(
              MessageTypes.error,
              this.lang.notifications.error,
              this.lang.notifications.notChanged
            );
            this.displayService.changeStateLoadBar(false);
          },
          complete: () => {
            this.notificationService.showMessage(
              MessageTypes.success,
              this.lang.notifications.success,
              this.lang.notifications.changesSaved
            );
            this.displayService.changeStateLoadBar(false);
          },
        });
    } else {
      this._adminProductDataService
        .create(product)
        .pipe(takeUntil(this.__unsubscribe$))
        .subscribe((data: IProductResponse) => {
          this._location.replaceState(`admin/products/edit/${data.id}`);
          this.id = data.id;
          this.template = data.propertyTemplate;
          this.properties.push(...this.template.stringProperties);
          this.properties.push(...this.template.decimalProperties);
          this.properties.push(...this.template.boolProperties);
          this.displayService.changeStateLoadBar(false);
          this._cd.detectChanges();
        });
    }
  }

  private saveImage(image: IImage, isTitle: boolean): void {
    this.displayService.changeStateLoadBar(true);
    image.referenceKey = this.id;
    image.isTitle = isTitle;
    this._adminProductDataService
      .addImage(image)
      .pipe(takeUntil(this.__unsubscribe$))
      .subscribe(() => {
        if (image.isTitle) {
          this.titleImage = image;
        } else {
          this.images.push(image);
        }
        this.notificationService.showMessage(
          MessageTypes.success,
          this.lang.notifications.success,
          this.lang.notifications.success
        );
        this.displayService.changeStateLoadBar(false);
        this._cd.detectChanges();
      });
  }

  private openDialog<T>(component: Type<T>, config: DynamicDialogConfig): void {
    this._dialogRef = Util.openDialog(this._dialogService, component, config);
  }

  private getProductForm(): FormGroup<IProductForm> {
    return new FormGroup<IProductForm>({
      name: new FormControl('', Validators.required),
      code: new FormControl('', Validators.required),
      category: new FormControl<ICategory | null>(null, Validators.required),
      type: new FormControl<ICodeName | null>(null, Validators.required),
      brand: new FormControl<ICodeName | null>(null, Validators.required),
      price: new FormControl(null, Validators.required),
      discountedPrice: new FormControl(null),
      count: new FormControl(null, Validators.required),
      description: new FormControl(''),
      currency: new FormControl('', Validators.required),
    });
  }

  private removeTitleImage(): void {
    const index = this.images.indexOf(this.titleImage);
    if (index > -1) {
      this.images.splice(index, 1);
    }
  }
}
