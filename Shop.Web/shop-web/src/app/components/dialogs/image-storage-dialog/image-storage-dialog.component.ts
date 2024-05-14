import { Component, OnInit } from '@angular/core';
import { IBaseImage, IImage } from '../../../models/interfaces/image';
import { AdminImageDataService } from '../../../services/data/admin-image-data.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { BaseCompleteComponent } from '../../base/base-complete.component';
import { takeUntil } from 'rxjs';
import { ImageEditorComponent } from '../../image-editor/image-editor.component';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'shop-image-storage-dialog',
  templateUrl: './image-storage-dialog.component.html',
  styleUrls: ['./image-storage-dialog.component.scss']
})
export class ImageStorageDialogComponent extends BaseCompleteComponent implements OnInit {
  public searchText: string = '';
  public imageChangedFile: File;
  public images: IImage[];

  constructor(private _adminImageDataService: AdminImageDataService,
    private _dialogRef: DynamicDialogRef,
    private _dialogService: DialogService,
    private confirmationService: ConfirmationService) {
    super();
  }
  public ngOnInit(): void {
    this._adminImageDataService.getAll().subscribe(data => {
      this.images = data;
    });
  }

  public deleteImage(image: IBaseImage): void {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure that you want to proceed?',//todo localization
      accept: () => {
        this._adminImageDataService.delete(image.id).subscribe(() => {
          this.updateImages();
        });
      },
      reject: () => {
        return;
      }
    });

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
      mimeType: baseImage.mimeType
    }
    this._adminImageDataService.create(image).subscribe(() => {
      this.images.push(image);
    });
  }

  private updateImages(): void {
    this._adminImageDataService.getAll().pipe(
      takeUntil(this.__unsubscribe$)).subscribe((data: IImage[]) => {
        this.images = data;
      })
  }
}
