import { IProduct } from "./product";

export interface FavoriteProductRequest {
  userId: string;
  productId: number;
}

export interface FavoriteProduct {
  userId: string;
  product: IProduct;
}
