import { Pipe, PipeTransform } from '@angular/core';
import { IBaseImage } from '../models/interfaces/image';
import { Converter } from '../common/converter';

@Pipe({ name: 'toBase64', standalone: true })
export class Base64Pipe implements PipeTransform {
  transform(image: IBaseImage): string | undefined {
    if (!image) {
      return undefined;
    }
    return Converter.toFileSrc(image.mimeType, image.smallBody);
  }
}