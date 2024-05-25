import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import imageCompression from 'browser-image-compression';
import { Options } from 'browser-image-compression';
import { ImageCroppedEvent, ImageTransform } from 'ngx-image-cropper';
import { IBaseImage } from '../../models/interfaces/image';
import { Converter } from '../../common/converter';
import { MimeTypes } from '../../models/enums/mime-types';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { BaseCompleteComponent } from '../base/base-complete.component';

@Component({
  selector: 'shop-image-editor',
  templateUrl: './image-editor.component.html',
  styleUrls: ['./image-editor.component.scss']
})
export class ImageEditorComponent extends BaseCompleteComponent implements OnInit {
  @Output() public onSave: EventEmitter<IBaseImage> = new EventEmitter();
  private _croppedImage: Blob;
  private _resizedImage: Blob;
  public imageFile: File;
  public showCropper = false;
  public croppedImage: SafeUrl;
  public resizedImage: SafeUrl;
  public canvasRotation = 0;
  public translateH = 0;
  public translateV = 0;
  public imageName: string = "";
  public transform: ImageTransform = {
    translateUnit: 'px'
  };

  constructor(
    private _refConfig: DynamicDialogConfig,
    private sanitizer: DomSanitizer,
    private _ref: DynamicDialogRef) {
    super();
  }

  public ngOnInit() {
    this.imageFile = this._refConfig.data.imageFile;
    this.imageName = this._refConfig.data.imageName;
  }

  public async save(): Promise<void> {
    const image: IBaseImage = {
      body: await Converter.fileToBase64(this._croppedImage),
      smallBody: await Converter.fileToBase64(this._resizedImage),
      fileSize: this._croppedImage.size,
      name: this.imageName,
      fileName: this.getFileName(this.imageFile.name),
      mimeType: MimeTypes.JPEG,
      isBinding: false
    };
    this._ref.close(image);
  }

  public async imageCropped(event: ImageCroppedEvent): Promise<void> {
    this._croppedImage = event.blob;
    this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(this._croppedImage));
    console.log(event);
    const file = new File([event.blob], this.imageFile.name, { type: 'image/jpeg' });
    this._resizedImage = await this.resize(file);
    this.resizedImage = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(this._resizedImage));
  }

  public imageLoaded(): void {
    this.showCropper = true;
    console.log('Image loaded');//todo messages
  }

  public loadImageFailed(): void {
    console.error('Load image failed');//todo messages
  }

  public rotateLeft(): void {
    setTimeout(() => {
      this.canvasRotation--;
      this.flipAfterRotate();
    });
  }

  public rotateRight(): void {
    setTimeout(() => {
      this.canvasRotation++;
      this.flipAfterRotate();
    });
  }

  public flipHorizontal(): void {
    this.transform = {
      ...this.transform,
      flipH: !this.transform.flipH
    };
  }

  public flipVertical(): void {
    this.transform = {
      ...this.transform,
      flipV: !this.transform.flipV
    };
  }

  private flipAfterRotate(): void {
    const flippedH = this.transform.flipH;
    const flippedV = this.transform.flipV;
    this.transform = {
      ...this.transform,
      flipH: flippedV,
      flipV: flippedH
    };
    this.translateH = 0;
    this.translateV = 0;
  }

  private getFileName(value: string): string {
    const parts = value.split('.');
    if (parts.length === 1) {
      return value;
    }
    const extension = parts.pop();
    const result = parts.join();
    return result;
  }

  private async resize(file: File): Promise<File> {
    const options: Options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 200,
      useWebWorker: false,
      initialQuality: 0.8,
      libURL: ''
    };
    try {
      return await imageCompression(file, options);
    } catch (error) {
      return null;
    }
  }
}
