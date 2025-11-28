import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { IImage } from 'src/app/models/interfaces/image';

@Component({
  selector: 'shop-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalleryComponent implements OnInit {
  @Input() public images: IImage[] = [];
  @Input() public selectedImage: IImage;
  @Input() public isVertical: boolean = true;
  @Input() public showAnimation: boolean = false;

  constructor(private cd: ChangeDetectorRef) {}

  public ngOnInit(): void {
    if (this.showAnimation) {
      let code = 1;
      setInterval(() => {
        code++;
        this.showImage(code);
        if (code === this.images.length) {
          code = 0;
        }
      }, 3000);
    }
  }

  public selectImage(image: IImage): void {
    this.selectedImage = image;
    this.cd.detectChanges();
  }

  public showImage(code: number): void {
    this.selectImage(this.images[code - 1]);
  }
}
