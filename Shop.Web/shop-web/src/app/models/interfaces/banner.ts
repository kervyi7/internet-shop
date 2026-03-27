import { IImage } from './image';

export interface Banner {
  id: number;
  type: BannerTypes;
  header: string;
  text?: string;
  isActive: boolean;
  images: IImage[];
}

export interface BannerUpdate {
  id: number;
  header: string;
  text?: string;
  isActive: boolean;
  imageIds?: number[];
}

export enum BannerTypes {
  promo = 0,
  adGallery = 1,
  modal = 2,
}
