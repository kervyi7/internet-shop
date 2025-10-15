import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, forkJoin } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IProduct } from 'src/app/models/interfaces/product';
import { CartItem, CartItemRequest } from '../models/interfaces/cart';
import { CartDataService } from './data/cart-data.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly STORAGE_KEY = 'shopping_cart';
  private items: CartItem[] = [];
  private cartSubject: BehaviorSubject<CartItem[]> = new BehaviorSubject<
    CartItem[]
  >([]);
  private userId?: string;

  constructor(private readonly cartDataService: CartDataService) {
    this.loadCart();
  }

  public get cart$(): Observable<CartItem[]> {
    return this.cartSubject.asObservable();
  }

  public setUser(userId: string): void {
    this.userId = userId;
    this.syncLocalCartToServer();
  }

  public add(product: IProduct): void {
    const existing = this.items.find((i) => i.productId === product.id);

    if (existing) {
      const newQuantity = existing.quantity + 1;

      if (product.count && newQuantity > product.count) {
        return;
      }

      existing.quantity = newQuantity;
    } else {
      if (product.count && product.count < 1) {
        return;
      }

      this.items.push({
        userId: this.userId ?? '',
        productId: product.id,
        product,
        quantity: 1,
        isSelected: true,
      });
    }

    this.saveCart();
  }

  public updateQuantity(productId: number, quantity: number): void {
    if (!this.userId) {
      const existing = this.items.find((i) => i.productId === productId);
      if (existing) {
        existing.quantity = quantity;
        this.saveCart();
      }
    } else {
      const model: CartItemRequest = {
        userId: this.userId!,
        productId,
        quantity,
      };
      this.cartDataService.add(model).subscribe(() => this.refreshServerCart());
    }
  }

  public remove(productId: number): void {
    if (!this.userId) {
      this.items = this.items.filter((i) => i.productId !== productId);
      this.saveCart();
    } else {
      const model: CartItemRequest = {
        userId: this.userId!,
        productId,
        quantity: 0,
      };
      this.cartDataService
        .delete(model)
        .subscribe(() => this.refreshServerCart());
    }
  }

  public removeSelected(): void {
    const selectedIds = this.items
      .filter((item) => item.isSelected)
      .map((item) => item.productId);

    if (!selectedIds.length) return;

    if (!this.userId) {
      this.items = this.items.filter(
        (item) => !selectedIds.includes(item.productId)
      );
      this.saveCart();
    } else {
      this.cartDataService
        .deleteSelected({
          userId: this.userId!,
          productIds: selectedIds,
        })
        .subscribe(() => this.refreshServerCart());
    }
  }

  public clear(): void {
    if (!this.userId) {
      this.items = [];
      this.saveCart();
    } else {
      this.cartDataService
        .clear(this.userId!)
        .subscribe(() => this.cartSubject.next([]));
    }
  }

  public toggleSelect(productId: number): void {
    const item = this.items.find((i) => i.productId === productId);
    if (item) {
      item.isSelected = !item.isSelected;
      this.saveCart();
    }
  }

  public selectAll(): void {
    this.items.forEach((i) => (i.isSelected = true));
    this.saveCart();
  }

  public deselectAll(): void {
    this.items.forEach((i) => (i.isSelected = false));
    this.saveCart();
  }

  public getTotalPrice(): number {
    return this.items
      .filter((i) => i.isSelected !== false)
      .reduce((sum, i) => sum + (i.product.discountPrice ?? i.product.price) * i.quantity, 0);
  }

  public getTotalQuantity(): number {
    return this.items.reduce((sum, i) => sum + i.quantity, 0);
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
    this.cartSubject.next([...this.items]);
  }

  private refreshServerCart(): void {
    if (!this.userId) return;
    this.cartDataService.getAll(this.userId).subscribe((serverItems) => {
      this.items = serverItems.map((i) => ({
        ...i,
        isSelected: i.isSelected ?? true,
      }));
      this.cartSubject.next(this.items);
    });
  }

  private syncLocalCartToServer(): void {
    if (!this.userId) return;

    const storedCart = localStorage.getItem(this.STORAGE_KEY);
    if (!storedCart) {
      this.refreshServerCart();
      return;
    }

    const localItems: CartItem[] = JSON.parse(storedCart);
    if (!localItems.length) {
      this.refreshServerCart();
      return;
    }

    const requests = localItems.map((item) =>
      this.cartDataService.add({
        userId: this.userId!,
        productId: item.productId,
        quantity: item.quantity,
      })
    );

    forkJoin(requests)
      .pipe(
        tap(() => {
          localStorage.removeItem(this.STORAGE_KEY);
          this.refreshServerCart();
        })
      )
      .subscribe();
  }
}
