
import { IImage } from "../models/interfaces/image";
import { IProduct } from "../models/interfaces/product";
import { Converter } from "./converter";
//TODO: Use everywhere
export class ImageMapper {
  public static mapIImage(image: IImage): IImage {
    return {
      ...image,
      smallBody: Converter.toFileSrc(image.mimeType, image.smallBody),
      body: image.body
        ? Converter.toFileSrc(image.mimeType, image.body)
        : undefined,
    };
  }

  public static mapIImages(images: IImage[]): IImage[] {
    return images?.map(this.mapIImage);
  }

  public static mapProduct(product: IProduct): IProduct {
    if (!product) return product;
    return {
      ...product,
      images: this.mapIImages(product.images),
    };
  }
}
