import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, Type } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs';
import { IImage } from '../../../../models/interfaces/image';
import { BaseCompleteComponent } from '../../../../components/base/base-complete.component';
import { ICreateProduct, IProduct } from '../../../../models/interfaces/product';
import { AdminProductDataService } from '../../../../services/data/admin/admin-product-data.service';
import { AdminCategoryDataService } from '../../../../services/data/admin/admin-category-data.service';
import { ICategory } from '../../../../models/interfaces/category';
import { ICodeName } from '../../../../models/interfaces/base/code-name';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SelectItemDialogComponent } from '../../../../components/dialogs/select-item-dialog/select-item-dialog.component';
import { MessageTypes } from '../../../../models/enums/message-types';
import { NotificationService } from '../../../../services/notification.service';
import { ImageStorageDialogComponent } from '../../../../components/dialogs/image-storage-dialog/image-storage-dialog.component';
import { DialogOptions } from '../../../../models/enums/dialog-options';
import { CreateProduct } from '../../../../models/classes/create-product';
import { IPropertyTemplate } from '../../../../models/interfaces/property';
import { BrandDataService } from '../../../../services/data/admin/admin-brand-data.service';
import { TypeDataService } from '../../../../services/data/admin/admin-type-data.service';
import { Util } from '../../../../common/util';
import { Converter } from '../../../../common/converter';
import { Location } from '@angular/common';
import { IBaseModel } from '../../../../models/interfaces/base/base-model';
import { ICreateProductResponse } from '../../../../models/interfaces/create-product-response';

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
  public editedProduct: CreateProduct = new CreateProduct();
  public template: IPropertyTemplate;

  constructor(
    private _notificationService: NotificationService,
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
  }

  public ngOnInit(): void {
    this.id = +this._activatedRoute.snapshot.paramMap.get('id')!;
    if (!this.id) {
      return;
    }
    this._adminProductDataService.getById(this.id)
      .pipe(takeUntil(this.__unsubscribe$))
      .subscribe((data: IProduct) => {
        this.product = data;
        this.editedProduct = this.createProduct(data);
        this.images = data.images.map((image) => {
          image.smallBody = Converter.toFileSrc(image.mimeType, image.smallBody);
          return image;
        });
        this.titleImage = data.images.find((image) => {
          return image.isTitle;
        });
        this.removeTitleImage();
        this.categories.push(data.category);
        this.types.push(data.type);
        this.brands.push(data.brand);
        this.selectedCategory = data.category;
        this.selectedType = data.type;
        this.selectedBrand = data.brand;
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
    this.openDialog(SelectItemDialogComponent, config);
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
    this.openDialog(SelectItemDialogComponent, config);
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
    image.referenceKey = this.product.id;
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
    image.referenceKey = this.product.id;
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

  public saveProduct(): void {
    if (this.id) {
      const isValid = !this.validateData();
      if (!isValid) {
        this._notificationService.showMessage(MessageTypes.error, this.lang.notifications.error, this.lang.notifications.notChanged);
      } else {
        this._adminProductDataService.edit(this.id, this.editedProduct).subscribe({
          error: err => this._notificationService.showMessage(MessageTypes.error, this.lang.notifications.error, this.lang.notifications.notChanged),
          complete: () => this._notificationService.showMessage(MessageTypes.success, this.lang.notifications.success, this.lang.notifications.changesSaved)
        });
        return;
      }
    }
    this.editedProduct.categoryId = this.selectedCategory.id;
    this.editedProduct.typeId = this.selectedType.id;
    this.editedProduct.brandId = this.selectedBrand.id
    this._adminProductDataService.create(this.editedProduct).subscribe((data: ICreateProductResponse) => {
      this._location.replaceState(`admin/products/edit/${data.id}`);
      this.id = data.id;
      this.template = data.propertyTemplate;
      this._cd.detectChanges();
    });
  }

  private validateData(): boolean {
    const product = this.createProduct(this.product);
    return Util.isDataEqual(product, this.editedProduct);
  }

  private openDialog<T>(component: Type<T>, config: DynamicDialogConfig): void {
    this._dialogRef = Util.openDialog(this._dialogService, component, config)
  }//review it

  private createProduct(data: IProduct): ICreateProduct {
    const product: ICreateProduct = {
      id: data.id,
      name: data.name,
      code: data.code,
      categoryId: data.category.id,
      typeId: data.type.id,
      brandId: data.brand.id,
      price: data.price,
      currency: data.currency,
      isExist: data.isExist,
      salePrice: data.salePrice,
      count: data.count,
      description: data.description
    }
    return product;
  }

  private removeTitleImage(): void {
    const index = this.images.indexOf(this.titleImage);
    if (index > -1) {
      this.images.splice(index, 1);
    }
  }
}
