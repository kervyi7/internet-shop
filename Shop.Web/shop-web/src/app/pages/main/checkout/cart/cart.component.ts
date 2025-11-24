import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductSectionType } from 'src/app/models/enums/product-section';
import { CartItem } from 'src/app/models/interfaces/cart';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  public SectionType = ProductSectionType;
  public cart$: Observable<CartItem[]> = this.cartService.cart$;
  public selectAll = false;

  constructor(private readonly cartService: CartService) {}

  public ngOnInit(): void {
    this.cart$.subscribe((cart) => {
      const selectedCount = cart.filter((x) => x.isSelected).length;
      this.selectAll = cart.length > 0 && selectedCount === cart.length;
    });
  }

  public removeItem(productId: number): void {
    this.cartService.remove(productId);
  }

  public clearCart(): void {
    this.cartService.clear();
  }

  public toggleSelection(item: CartItem): void {
    this.cartService.toggleSelect(item.productId);
  }

  public updateQuantity(item: CartItem): void {
    this.cartService.updateQuantity(item.productId, item.quantity);
  }

  public toggleSelectAll(): void {
    if (this.selectAll) {
      this.cartService.deselectAll();
    } else {
      this.cartService.selectAll();
    }
  }

  public getSelectedTotal(cart: CartItem[]): number {
    return cart
      .filter((x) => x.isSelected)
      .reduce(
        (sum, x) =>
          sum +
          (x.product.discountedPrice ?? x.product.price) * (x.quantity || 1),
        0
      );
  }

  public isSelectedItems(cart: CartItem[]): boolean {
    return !cart.some((x) => x.isSelected);
  }
}
