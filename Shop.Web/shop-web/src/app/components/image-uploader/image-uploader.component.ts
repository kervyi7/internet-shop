import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IBaseImage } from '../../models/interfaces/image';

@Component({
  selector: 'shop-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.scss'],

})
export class ImageUploaderComponent {
  @Output() public onSave: EventEmitter<IBaseImage> = new EventEmitter();
  @Output() public onFileChanged: EventEmitter<File> = new EventEmitter();
  @Input() public images: IBaseImage[] = [];
  @Input() public typeText: boolean = false;
  public imageChangedFile: File;
  public showImage: string = '';

  public addImage(image: IBaseImage): void {
    this.imageChangedFile = null;
    this.images.push(image);
    this.onSave.next(image);
  }

  public fileChangeEvent(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (!target || target.files.length == 0) {
      return;
    }
    const file = target.files[0];
    if (file.type !== "image/jpeg" && file.type !== "image/png") {
      return;
    }
    this.onFileChanged.next(file);
  }

  public clearInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    target.value = null;
  }
}
