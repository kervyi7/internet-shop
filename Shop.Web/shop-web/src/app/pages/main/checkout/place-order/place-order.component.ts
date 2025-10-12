import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Util } from 'src/app/common/util';
import { CartItem } from 'src/app/models/interfaces/cart';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'shop-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.scss'],
})
export class PlaceOrderComponent {
  public cart: CartItem[] = [];
  public shippingCost = 4.99;
  public checkoutForm!: FormGroup;
  public total: number = 0;

  constructor(private cartService: CartService, private fb: FormBuilder) {}

  public ngOnInit(): void {
    this.cartService.cart$.subscribe((cart) => (this.cart = cart));

    this.total =
      this.cart.reduce(
        (sum, i) =>
          sum +
          (i.product.discountPrice ?? i.product.price) * (i.quantity || 1),
        0
      ) + this.shippingCost;

    this.checkoutForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required],
      street: ['', Validators.required],
      houseNumber: ['', Validators.required],
      apartment: [''],
      postcode: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      notes: [''],
      agreement: ['', Validators.requiredTrue],
    });
  }

  public submitOrder(): void {
    if (this.checkoutForm.valid) {
      const orderData = {
        items: this.cart,
        shipping: this.shippingCost,
        total: this.cartService.getTotalPrice() + this.shippingCost,
        customer: this.checkoutForm.value,
      };
      alert('done');
      //this.cartService.clearCart();
      //this.checkoutForm.reset();
    } else {
      Util.markAllAsDirty(this.checkoutForm);
    }
  }

  public getTotal(): number {
    return this.cart
      .filter((item) => item.isSelected)
      .reduce(
        (sum, i) =>
          sum +
          (i.product.discountPrice ?? i.product.price) * (i.quantity || 1),
        0
      );
  }
}
