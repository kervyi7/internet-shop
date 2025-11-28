import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  Type,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { ImageMapper } from 'src/app/common/image-mapper';
import { Util } from 'src/app/common/util';
import { BaseCompleteComponent } from 'src/app/components/base/base-complete.component';
import { ImageStorageDialogComponent } from 'src/app/components/dialogs/image-storage-dialog/image-storage-dialog.component';
import { DialogOptions } from 'src/app/models/enums/dialog-options';
import { Banner, BannerTypes } from 'src/app/models/interfaces/banner';
import { IImage } from 'src/app/models/interfaces/image';
import { AdminBannerDataService } from 'src/app/services/data/admin/admin-banners-data.service';

@Component({
  selector: 'shop-banners',
  templateUrl: './banners.component.html',
  styleUrls: [
    './banners.component.scss',
    '../../../../../assets/styles/category-product.scss',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BannersComponent extends BaseCompleteComponent implements OnInit {
  private _dialogRef: DynamicDialogRef;
  public promoBanner!: Banner;
  public adGallery!: Banner;
  public modalBanner!: Banner;
  public promoForm!: FormGroup;
  public adGalleryForm!: FormGroup;
  public modalForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private bannerDataService: AdminBannerDataService,
    private cd: ChangeDetectorRef,
    private dialogService: DialogService
  ) {
    super();
  }

  public ngOnInit(): void {
    this.bannerDataService.getAll().subscribe((list) => {
      this.promoBanner = list.find((x) => x.type == BannerTypes.promo)!;
      this.adGallery = list.find((x) => x.type == BannerTypes.adGallery)!;
      this.modalBanner = list.find((x) => x.type == BannerTypes.modal)!;

      this.adGallery.images = ImageMapper.mapIImages(this.adGallery.images);
      this.modalBanner.images = ImageMapper.mapIImages(this.modalBanner.images);

      this.buildForms();
    });
  }

  public buildForms() {
    this.promoForm = this.fb.group({
      header: [this.promoBanner.header, Validators.required],
      text: [this.promoBanner.text ?? ''],
      isActive: [this.promoBanner.isActive],
    });

    this.adGalleryForm = this.fb.group({
      header: [this.adGallery.header, Validators.required],
      isActive: [this.adGallery.isActive],
    });

    this.modalForm = this.fb.group({
      header: [this.modalBanner.header, Validators.required],
      text: [this.modalBanner.text ?? ''],
      isActive: [this.modalBanner.isActive],
    });

    this.cd.detectChanges();
  }

  public editImages(isSingle: boolean): void {
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
      if (isSingle) {
        this.modalBanner.images.push(data);
      } else {
        this.adGallery.images.push(data);
      }
      this.cd.detectChanges();
    });
  }

  public deleteImage(image: IImage, isSingle: boolean): void {
    if (isSingle) {
      this.modalBanner.images = [];
    } else {
      this.adGallery.images.splice(this.adGallery.images.indexOf(image, 1));
    }
    this.cd.detectChanges();
  }

  public savePromo() {
    const dto = {
      id: this.promoBanner.id,
      header: this.promoForm.value.header,
      text: this.promoForm.value.text,
      isActive: this.promoForm.value.isActive,
    };
    this.bannerDataService.update(dto).subscribe();
  }

  public saveAdGallery() {
    const dto = {
      id: this.adGallery.id,
      header: this.adGalleryForm.value.header,
      isActive: this.adGalleryForm.value.isActive,
      imageIds: this.adGallery.images.map((image) => image.id),
    };
    this.bannerDataService.update(dto).subscribe();
  }

  public saveModal() {
    const dto = {
      id: this.modalBanner.id,
      header: this.modalForm.value.header,
      text: this.modalForm.value.text,
      isActive: this.modalForm.value.isActive,
      imageIds: this.modalBanner.images[0]?.id
        ? [this.modalBanner.images[0]?.id]
        : [],
    };
    this.bannerDataService.update(dto).subscribe();
  }

  private openDialog<T>(component: Type<T>, config: DynamicDialogConfig): void {
    this._dialogRef = Util.openDialog(this.dialogService, component, config);
  }
}
