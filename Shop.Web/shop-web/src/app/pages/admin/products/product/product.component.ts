import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, Type } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs';
import { IImage } from '../../../../models/interfaces/image';
import { BaseCompleteComponent } from '../../../../components/base/base-complete.component';
import { IProduct, IProductResponse } from '../../../../models/interfaces/product';
import { AdminProductDataService } from '../../../../services/data/admin/admin-product-data.service';
import { AdminCategoryDataService } from '../../../../services/data/admin/admin-category-data.service';
import { ICategory } from '../../../../models/interfaces/category';
import { ICodeName } from '../../../../models/interfaces/base/code-name';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CreateItemDialogComponent } from '../../../../components/dialogs/create-item-dialog/create-item-dialog.component';
import { MessageTypes } from '../../../../models/enums/message-types';
import { NotificationService } from '../../../../services/notification.service';
import { ImageStorageDialogComponent } from '../../../../components/dialogs/image-storage-dialog/image-storage-dialog.component';
import { DialogOptions } from '../../../../models/enums/dialog-options';
import { IProperty, IPropertyTemplate } from '../../../../models/interfaces/property';
import { BrandDataService } from '../../../../services/data/admin/admin-brand-data.service';
import { TypeDataService } from '../../../../services/data/admin/admin-type-data.service';
import { Util } from '../../../../common/util';
import { Converter } from '../../../../common/converter';
import { Location } from '@angular/common';
import { IBaseModel } from '../../../../models/interfaces/base/base-model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IProductForm } from '../../../../models/interfaces/forms/product-form';

@Component({
  selector: 'shop-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
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
    private _location: Location) {
    super();
    this.productForm = this.getProductForm();
  }

  public ngOnInit(): void {
    this.id = +this._activatedRoute.snapshot.paramMap.get('id')!;
    if (!this.id) {
      this.productForm = this.getProductForm();
      return;
    }
    this._adminProductDataService.getById(this.id)
      .pipe(takeUntil(this.__unsubscribe$))
      .subscribe((data: IProduct) => {
        this.images = data.images.map((image) => {
          image.smallBody = Converter.toFileSrc(image.mimeType, image.smallBody);
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
        this.properties.push(...this.product.dateProperties);
        this.template = data.category.propertyTemplate;
        this._cd.detectChanges();
      });
  }

  public getTypes(): void {
    if (this.types.length) {
      return;
    }
    this._typeDataService.getType()
      .pipe(takeUntil(this.__unsubscribe$))
      .subscribe((data: ICodeName[]) => {
        this.types = data;
        this._cd.detectChanges();
      });
  }

  public getBrands(): void {
    if (this.brands.length) {
      return;
    }
    this._brandDataService.getBrand()
      .pipe(takeUntil(this.__unsubscribe$))
      .subscribe((data: ICodeName[]) => {
        this.brands = data;
        this._cd.detectChanges();
      });
  }

  public getCategories(): void {
    if (this.categories.length) {
      return;
    }
    this._adminCategoryDataService.getAll()
      .pipe(takeUntil(this.__unsubscribe$))
      .subscribe((data: ICategory[]) => {
        this.categories = data;
        this._cd.detectChanges();
      });
  }

  public handleClearTypes(): void {
    this.types = [];
  }

  public handleClearCategories(): void {
    this.categories = [];
  }

  public handleClearBrands(): void {
    this.brands = [];
  }

  public isInputEmpty(input: string | number | ICodeName): boolean {
    return !Boolean(input);
  }

  public editImages(isTitle: boolean): void {
    const config = { header: this.lang.headers.imageStorage, width: DialogOptions.standardWidth, maximizable: true };
    this.openDialog(ImageStorageDialogComponent, config);
    this._dialogRef.onClose.subscribe(data => {
      if (!data) {
        return;
      }
      this.saveImage(data, isTitle);
    });
  }

  public addType(): void {
    const config = { header: this.lang.headers.types, width: DialogOptions.standardWidth, maximizable: true };
    this.openDialog(CreateItemDialogComponent, config);
    this._dialogRef.onClose.pipe(takeUntil(this.__unsubscribe$)).subscribe((type: ICodeName) => {
      if (!type) {
        return;
      }
      this._typeDataService.createType(type)
        .pipe(takeUntil(this.__unsubscribe$))
        .subscribe(data => {
          type.id = data.id;
          this.types.unshift(type);
        });
    });
  }

  public addBrand(): void {
    const config = { header: this.lang.headers.brands, width: DialogOptions.standardWidth, maximizable: true };
    this.openDialog(CreateItemDialogComponent, config);
    this._dialogRef.onClose
      .pipe(takeUntil(this.__unsubscribe$))
      .subscribe((brand: ICodeName) => {
        if (!brand) {
          return;
        }
        this._brandDataService.createBrand(brand)
          .pipe(takeUntil(this.__unsubscribe$))
          .subscribe((data: IBaseModel) => {
            brand.id = data.id;
            this.brands.unshift(brand);
          });
      });
  }

  public saveImage(image: IImage, isTitle: boolean): void {
    image.referenceKey = this.id;
    image.isTitle = isTitle;
    this._adminProductDataService.addImage(image).subscribe(() => {
      if (image.isTitle) {
        this.titleImage = image;
      } else {
        this.images.push(image);
      }
      this._cd.detectChanges();
    });
  }

  public deleteImage(image: IImage): void {
    image.referenceKey = this.id;
    this._adminProductDataService.deleteImage(this.product.id, image).subscribe(() => {
      if (image.isTitle) {
        this.titleImage = null;
      } else {
        this.images.splice(this.images.indexOf(image), 1);
      }
      this._cd.detectChanges();
    });
  }

  public goToPreviousPage(): void {
    this._router.navigate(['/admin/products']);
  }

  public submit(): void {
    if (this.productForm.invalid) {
      Util.markAllAsDirty(this.productForm);
      this.notificationService.showMessage(MessageTypes.error, this.lang.notifications.error, this.lang.notifications.invalidData);
      return;
    }
    const product: IProduct = { ...this.productForm.getRawValue() };
    if (this.id) {
      this._adminProductDataService.edit(this.id, product).subscribe({
        error: err => this.notificationService.showMessage(MessageTypes.error, this.lang.notifications.error, this.lang.notifications.notChanged),
        complete: () => this.notificationService.showMessage(MessageTypes.success, this.lang.notifications.success, this.lang.notifications.changesSaved)
      });
    } else {
      this._adminProductDataService.create(product).subscribe((data: IProductResponse) => {
        this._location.replaceState(`admin/products/edit/${data.id}`);
        this.id = data.id;
        this.template = data.propertyTemplate;
        this._cd.detectChanges();
      });
    }
  }

  private openDialog<T>(component: Type<T>, config: DynamicDialogConfig): void {
    this._dialogRef = Util.openDialog(this._dialogService, component, config)
  }

  private getProductForm(): FormGroup<IProductForm> {
    return new FormGroup<IProductForm>({
      name: new FormControl("", Validators.required),
      code: new FormControl("", Validators.required),
      category: new FormControl<ICategory | null>(null, Validators.required),
      type: new FormControl<ICodeName | null>(null, Validators.required),
      brand: new FormControl<ICodeName | null>(null, Validators.required),
      price: new FormControl(null, Validators.required),
      salePrice: new FormControl(null, Validators.required),
      count: new FormControl(null, Validators.required),
      description: new FormControl(""),
      currency: new FormControl("", Validators.required),
    });
  }

  private createProduct(): IProduct {
    const product: IProduct = {
      id: this.id,
      name: this.productForm.controls.name.getRawValue(),
      code: this.productForm.controls.name.getRawValue(),
      category: this.productForm.controls.category.getRawValue(),
      type: this.productForm.controls.type.getRawValue(),
      brand: this.productForm.controls.brand.getRawValue(),
      price: this.productForm.controls.price.getRawValue(),
      currency: this.productForm.controls.currency.getRawValue(),
      salePrice: this.productForm.controls.salePrice.getRawValue(),
      count: this.productForm.controls.count.getRawValue(),
      description: this.productForm.controls.description.getRawValue(),
    };
    
    return product;
  }

  private removeTitleImage(): void {
    const index = this.images.indexOf(this.titleImage);
    if (index > -1) {
      this.images.splice(index, 1);
    }
  }
}
