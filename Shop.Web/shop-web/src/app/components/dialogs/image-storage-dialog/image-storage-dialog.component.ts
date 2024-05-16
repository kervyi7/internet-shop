import { Component, OnInit } from '@angular/core';
import { IBaseImage, IImage } from '../../../models/interfaces/image';
import { AdminImageDataService } from '../../../services/data/admin-image-data.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { BaseCompleteComponent } from '../../base/base-complete.component';
import { takeUntil } from 'rxjs';
import { ImageEditorComponent } from '../../image-editor/image-editor.component';
import { ConfirmationService } from 'primeng/api';
import { PaginatorState } from 'primeng/paginator';

@Component({
  selector: 'shop-image-storage-dialog',
  templateUrl: './image-storage-dialog.component.html',
  styleUrls: ['./image-storage-dialog.component.scss']
})
export class ImageStorageDialogComponent extends BaseCompleteComponent implements OnInit {
  public searchText = '';
  public imageChangedFile: File;
  public images: IImage[];
  public skip = 0;
  public count = 10;
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
    this._adminImageDataService.getAll(this.skip, this.count).subscribe(data => {
      this.images = data;
    });
  }

  public onPageChange(event: PaginatorState): void {
    this.skip = event.first;
    this.count = event.rows;
    this._adminImageDataService.getAll(this.skip, this.count).subscribe(data => {
      this.images = data;
    });
  }

  public onCountChange(count: number) {
    this.skip = 0;
    this.count = count;
    this._adminImageDataService.getAll(this.skip, this.count).subscribe(data => {
      this.images = data;
    });
  }

  public deleteImage(image: IBaseImage): void {
    if (image.isBinding) {
      this.delete(image.id, this.lang.popups.imageBoundDelete);
    } else {
      this.delete(image.id, this.lang.popups.imageDelete);
    }
  }

  public editImage(image: IBaseImage): void {

  }

  public selectImage(image: IBaseImage): void {
    this._dialogRef.close(image);
  }

  public fileChanged(file: File): void {
    this._dialogRef = this._dialogService.open(ImageEditorComponent, {
      data: {
        imageFile: file,
        imageName: file.name
      },
      header: `Image Editor`,
      width: '80%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 5,
      maximizable: true
    });
    this._dialogRef.onClose.subscribe((data) => {
      if (!data) {
        return;
      }
      this.saveImage(data);
    })
  }

  public saveImage(baseImage: IBaseImage): void {
    const image: IImage = {
      body: baseImage.body,
      name: baseImage.name,
      smallBody: baseImage.smallBody,
      fileName: baseImage.fileName,
      fileSize: baseImage.fileSize,
      mimeType: baseImage.mimeType,
      isBinding: baseImage.isBinding
    }
    this._adminImageDataService.create(image).subscribe(() => {
      this.images.push(image);
    });
  }

  private updateImages(): void {
    this._adminImageDataService.getAll(this.skip, this.count).pipe(
      takeUntil(this.__unsubscribe$)).subscribe((data: IImage[]) => {
        this.images = data;
      })
  }

  private delete(id: number, message: string) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: message,
      accept: () => {
        this._adminImageDataService.delete(id).subscribe(() => {
          this.updateImages();
        });
      },
      reject: () => {
        return;
      }
    });
  }
}
