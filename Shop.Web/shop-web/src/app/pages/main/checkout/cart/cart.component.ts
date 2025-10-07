import { Component } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IProduct } from 'src/app/models/interfaces/product';
import { CartService } from 'src/app/services/data/cart.service';

@Component({
  selector: 'shop-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  public cart$: Observable<IProduct[]> = this.cartService.cart$;
  public selectedItems: Set<number> = new Set();
  public selectAll = false;

  constructor(private cartService: CartService) { }

  public ngOnInit(): void { }

  public removeItem(productId: number): void {
    this.cartService.removeFromCart(productId);
    this.selectedItems.delete(productId);
  }

  public clearCart(): void {
    this.cartService.clearCart();
    this.selectedItems.clear();
    this.selectAll = false;
  }

  public toggleSelection(productId: number): void {
    if (this.selectedItems.has(productId)) {
      this.selectedItems.delete(productId);
    } else {
      this.selectedItems.add(productId);
    }
    this.updateSelectAll();
  }

  public updateQuantity(product: IProduct) {
    this.cartService.updateQuantity(product);
  }

  public toggleSelectAll(cart: IProduct[]): void {
    if (this.selectAll) {
      this.selectedItems = new Set(cart.map(item => item.id));
      cart.map(item => item.selected = true)

    } else {
      this.selectedItems.clear();
    }
  }

  public getSelectedTotal(cart: IProduct[]): number {
    return cart
      .filter(item => this.selectedItems.has(item.id))
      .reduce((sum, item) => sum + (item.price * (item.selectedCount || 1)), 0);
  }

  public isSelected(id: number): boolean {
    return this.selectedItems.has(id)
  }

  private updateSelectAll(): void {
    this.cart$.pipe(map(cart => {
      this.selectAll = cart.length > 0 && this.selectedItems.size === cart.length;
    })).subscribe();
  }
}
