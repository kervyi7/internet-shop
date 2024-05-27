import { Component, OnInit } from '@angular/core';
import { IBaseImage, IImage } from '../../../models/interfaces/image';
import { AdminImageDataService } from '../../../services/data/admin-image-data.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { BaseCompleteComponent } from '../../base/base-complete.component';
import { takeUntil } from 'rxjs';
import { ImageEditorComponent } from '../../image-editor/image-editor.component';
import { ConfirmationService } from 'primeng/api';
import { PaginatorState } from 'primeng/paginator';
import { IGetModelsRequest } from '../../../models/interfaces/get-models-request';

@Component({
  selector: 'shop-image-storage-dialog',
  templateUrl: './image-storage-dialog.component.html',
  styleUrls: ['./image-storage-dialog.component.scss']
})
export class ImageStorageDialogComponent extends BaseCompleteComponent implements OnInit {
  private _searchBy = '';
  public searchText = '';
  public imageChangedFile: File;
  public images: IImage[];
  public skip = 0;
  public countPerPage = 10;
  public count = 0;
  public countOptions = [
    { label: 10, value: 10 },
    { label: 20, value: 20 },
    { label: 30, value: 30 }
  ];

  constructor(private _adminImageDataService: AdminImageDataService,
    private _dialogRef: DynamicDialogRef,
    private _dialogService: DialogService,
    private confirmationService: ConfirmationService) {
    super();
  }
  public ngOnInit(): void {
    this.loadImages();
    this.loadCount();
  }

  public onPageChange(event: PaginatorState): void {
    this.skip = event.first;
    this.countPerPage = event.rows;
    this.loadImages();
  }

  public onCountChange() {
    this.skip = 0;
    this.loadImages();
  }

  public deleteImage(e: Event, image: IBaseImage): void {
    if (image.isBinding) {
      this.tryDelete(image.id, this.lang.popups.imageBoundDelete, e.target);
    } else {
      this.tryDelete(image.id, this.lang.popups.imageDelete, e.target);
    }
  }

  public selectImage(image: IBaseImage): void {
    this._dialogRef.close(image);
  }

  public fileChanged(file: File): void {
    this._dialogRef = this._dialogService.open(ImageEditorComponent, {//create service
      data: {
        imageFile: file,
        imageName: file.name
      },
      header: `Image Editor`,//to localization
      width: '80%',//dialog options
      contentStyle: { overflow: 'auto' },
      baseZIndex: 5,
      maximizable: true
    });
    this._dialogRef.onClose.subscribe((data: IBaseImage) => {
      if (!data) {
        return;
      }
      this.createImage(data);
    })
  }

  public searchImage(): void {
    this.skip = 0;
    if (this._searchBy == this.searchText) {
      return;
    }
    this._searchBy = this.searchText;
    this.loadImages();
    this.loadCount();
  }

  private createImage(image: IBaseImage): void {
    this._adminImageDataService.create(image)
      .pipe(takeUntil(this.__unsubscribe$))
      .subscribe(() => {
        this.loadImages();
        this.loadCount();
      });
  }

  private loadImages(): void {
    const params: IGetModelsRequest = {
      skip: this.skip,
      count: this.countPerPage,
      searchValue: this._searchBy
    }
    this._adminImageDataService.getAll(params)
      .pipe(takeUntil(this.__unsubscribe$))
      .subscribe((data: IImage[]) => {
        this.images = data;
      });
  }

  private loadCount(): void {
    if (this.skip != 0) {
      return;
    }
    this._adminImageDataService.getCount()
      .pipe(takeUntil(this.__unsubscribe$))
      .subscribe((data: number) => {
        this.count = data;
      });
  }

  private tryDelete(id: number, message: string, target: EventTarget): void {
    this.confirmationService.confirm({
      target: target,
      message: message,
      accept: () => {
        this._adminImageDataService.delete(id)
          .pipe(takeUntil(this.__unsubscribe$))
          .subscribe(() => {
            this.loadImages();
          });
      },
      reject: () => {
        return;
      }
    });
  }
}
