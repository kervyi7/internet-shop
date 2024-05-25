import { Component, EventEmitter, Output } from '@angular/core';
import { BaseCompleteComponent } from '../base/base-complete.component';

@Component({
  selector: 'shop-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.scss'],

})
export class ImageUploaderComponent extends BaseCompleteComponent {
  @Output() public onFileChanged: EventEmitter<File> = new EventEmitter();

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
