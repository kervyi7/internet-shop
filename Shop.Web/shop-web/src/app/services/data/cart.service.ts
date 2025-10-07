import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IProduct } from 'src/app/models/interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly STORAGE_KEY = 'shopping_cart';
  private items: IProduct[] = [];
  private cartSubject: BehaviorSubject<IProduct[]> = new BehaviorSubject<IProduct[]>([]);

  constructor() {
    this.loadCart();
  }

  public get cart$(): Observable<IProduct[]> {
    return this.cartSubject.asObservable();
  }

  public addToCart(product: IProduct): void {
    const existing = this.items.find(item => item.id === product.id);
    if (existing) {
      existing.selectedCount = (existing.selectedCount || 1) + 1;
    } else {
      product.selectedCount = 1;
      this.items.push(product);
    }
    this.saveCart();
  }

  public updateQuantity(product: IProduct): void {
    const existing = this.items.find(item => item.id === product.id);

    if (existing) {
      existing.selectedCount = product.selectedCount ?? 1;
    } else {
      this.items.push({
        ...product,
        selectedCount: product.selectedCount ?? 1
      });
    }

    this.saveCart();
  }

  public removeFromCart(productId: number): void {
    this.items = this.items.filter(item => item.id !== productId);
    this.saveCart();
  }

  public clearCart(): void {
    this.items = [];
    this.saveCart();
  }

  public getTotalQuantity(): number {
    return this.items.reduce((total, item) => total + (item.selectedCount || 1), 0);
  }

  public getTotalPrice(): number {
    return this.items.reduce((total, item) => total + (item.price * (item.selectedCount || 1)), 0);
  }

  private loadCart(): void {
    const storedCart = localStorage.getItem(this.STORAGE_KEY);
    if (storedCart) {
      this.items = JSON.parse(storedCart);
      this.cartSubject.next(this.items);
    }
  }

  private saveCart(): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.items));
    this.cartSubject.next(this.items);
  }
}
