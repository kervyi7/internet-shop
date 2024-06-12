import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, Type } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs';
import { IImage } from '../../../../models/interfaces/image';
import { BaseCompleteComponent } from '../../../../components/base/base-complete.component';
import { ICreateProduct, IProduct } from '../../../../models/interfaces/product';
import { AdminProductDataService } from '../../../../services/data/admin-product-data.service';
import { AdminCategoryDataService } from '../../../../services/data/admin-category-data.service';
import { ICategory } from '../../../../models/interfaces/category';
import { ICodeName } from '../../../../models/interfaces/base/code-name';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PropertyDialogComponent } from '../../../../components/dialogs/property-dialog/property-dialog.component';
import { SelectItemDialogComponent } from '../../../../components/dialogs/select-item-dialog/select-item-dialog.component';
import { MessageTypes } from '../../../../models/enums/message-types';
import { NotificationService } from '../../../../services/notification.service';
import { ImageStorageDialogComponent } from '../../../../components/dialogs/image-storage-dialog/image-storage-dialog.component';
import { DialogOptions } from '../../../../models/enums/dialog-options';
import { ProductItems } from '../../../../models/enums/product-items';
import { CreateProduct } from '../../../../models/classes/create-product';
import { IProperty } from '../../../../models/interfaces/property';
import { BrandDataService } from '../../../../services/data/admin-brand-data.service';
import { TypeDataService } from '../../../../services/data/admin-type-data.service';
import { Util } from '../../../../common/util';

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

  constructor(
    private _notificationService: NotificationService,
    private _dialogService: DialogService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _adminProductDataService: AdminProductDataService,
    private _adminCategoryDataService: AdminCategoryDataService,
    private _brandDataService: BrandDataService,
    private _typeDataService: TypeDataService,
    private _cd: ChangeDetectorRef) {
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
        this.images = data.images;
        this.titleImage = data.images.find((image) => { return image.isTitle });
        this.removeTitleImage();
        this.categories.push(data.category);
        this.types.push(data.type);
        this.brands.push(data.brand);
        this.selectedCategory = data.category;
        this.selectedType = data.type;
        this.selectedBrand = data.brand;
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

  public deleteProperty(property: IProperty): void {
    this._adminProductDataService.deleteProperty(this.product.id, property).subscribe({
      error: err => this._notificationService.showMessage(MessageTypes.error, this.lang.notifications.error, err),
      complete: () => {
        this._notificationService.showMessage(MessageTypes.success, this.lang.notifications.success, this.lang.notifications.deletedProperty);
        this.updateProperties();
      }
    });
  }

  public addProperty(): void {
    const data = { id: this.product.id };
    const config = { header: this.lang.headers.property, width: DialogOptions.standardWidth, maximizable: false, data: data };
    this.openDialog(PropertyDialogComponent, config);
    this._dialogRef.onClose.subscribe(() => {
      this.updateProperties();
    });
  }

  public editProperty(property: IProperty): void {
    const data = { items: property };
    const config = { header: this.lang.headers.property, width: DialogOptions.standardWidth, maximizable: false, data: data };
    this.openDialog(PropertyDialogComponent, config);
    this._dialogRef.onClose.subscribe(() => {
      this.updateProperties();
    });
  }

  public editImages(isTitle: boolean) {
    const config = { header: this.lang.headers.imageStorage, width: DialogOptions.standardWidth, maximizable: true };
    this.openDialog(ImageStorageDialogComponent, config);
    this._dialogRef.onClose.subscribe(data => {
      if (!data) {
        return;
      }
      this.saveImage(data, isTitle);
    });
  }

  public editTypes(): void {
    const data = { items: this.types, itemsName: ProductItems.type };
    const config = { header: this.lang.headers.types, width: DialogOptions.standardWidth, maximizable: true, data: data };
    this.openDialog(SelectItemDialogComponent, config);
    this._dialogRef.onClose.pipe(takeUntil(this.__unsubscribe$)).subscribe(data => {
      if (!data) {
        return;
      }
      this.types.unshift(data);
    });
  }

  public editBrands(): void {
    const data = { items: this.brands, itemsName: ProductItems.brand };
    const config = { header: this.lang.headers.brands, width: DialogOptions.standardWidth, maximizable: true, data: data };
    this.openDialog(SelectItemDialogComponent, config);
    this._dialogRef.onClose.pipe(takeUntil(this.__unsubscribe$)).subscribe(data => {
      if (!data) {
        return;
      }
      this.brands.unshift(data);
    });
  }

  public saveImage(image: IImage, isTitle: boolean): void {
    image.referenceKey = this.product.id;
    image.isTitle = isTitle;
    this._adminProductDataService.addImage(image).subscribe(() => {
      this.updateImages();
    });
  }

  public deleteImage(image: IImage): void {
    image.referenceKey = this.product.id;
    this._adminProductDataService.deleteImage(this.product.id, image).subscribe(() => {
      this.updateImages();
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
    this._adminProductDataService.create(this.editedProduct).subscribe(data => {
      this._router.navigate([`/admin/products/edit/${data.id}`])
    });
  }

  private validateData(): boolean {
    const product = this.createProduct(this.product);
    return Util.isDataEqual(product, this.editedProduct);
  }

  private openDialog<T>(component: Type<T>, config: DynamicDialogConfig): void {
    this._dialogRef = this._dialogService.open(component, {
      data: config.data,
      header: config.header,
      width: config.width,
      maximizable: config.maximizable,
      contentStyle: { overflow: 'visible' }
    });
  }

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

  private updateProperties(): void {
    this._adminProductDataService.getById(this.id).pipe(
      takeUntil(this.__unsubscribe$)).subscribe((data: IProduct) => {
        this.product.stringProperties = data.stringProperties;
        this.product.intProperties = data.intProperties;
        this.product.boolProperties = data.boolProperties;
        this.product.dateProperties = data.dateProperties;
      })
  }

  private removeTitleImage(): void {
    const index = this.images.indexOf(this.titleImage);
    if (index > -1) {
      this.images.splice(index, 1);
    }
  }

  private updateImages(): void {
    this._adminProductDataService.getById(this.id).pipe(
      takeUntil(this.__unsubscribe$)).subscribe((data: IProduct) => {
        this.product.images = data.images;
        this.titleImage = data.images.find((image) => { return image.isTitle });
        this.images = data.images;
        this.removeTitleImage();
        debugger;
        this._cd.detectChanges();
      })
  }
}
