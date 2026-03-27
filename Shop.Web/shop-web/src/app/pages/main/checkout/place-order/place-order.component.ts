import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Util } from 'src/app/common/util';
import { CustomValidators } from 'src/app/common/validators';
import { CartItem } from 'src/app/models/interfaces/cart';
import { DeliveryAddress } from 'src/app/models/interfaces/delivery-address';
import { Order, OrderItem } from 'src/app/models/interfaces/order';
import { ShippingOption } from 'src/app/models/interfaces/shipping-option';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { DeliveryAddressDataService } from 'src/app/services/data/delivery-address-data.service';
import { OrderDataService } from 'src/app/services/data/order-data.service';
import { ShippingDataService } from 'src/app/services/data/shipping-data.service';

@Component({
  selector: 'shop-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaceOrderComponent {
  private userId: string;
  public cart: CartItem[] = [];
  public shippingCost = 4.99;
  public checkoutForm!: FormGroup;
  public extraForm!: FormGroup;
  public total: number = 0;
  public deliveryAddresses: DeliveryAddress[] = [];
  public selectedAddress: DeliveryAddress;
  public shippingOptions: ShippingOption[] = [];
  public selectedShippingOption: ShippingOption | null = null;

  constructor(
    private cartService: CartService,
    private fb: FormBuilder,
    private deliveryService: DeliveryAddressDataService,
    private orderService: OrderDataService,
    private shippingService: ShippingDataService,
    private authService: AuthService,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {}

  public ngOnInit(): void {
    this.cartService.cart$.subscribe(
      (cart) => (this.cart = cart.filter((item) => item.isSelected))
    );
    this.total = this.cartService.getTotalPrice();
    this.createForms();
    if (this.authService.isLoggedIn()) {
      this.userId = this.authService.getUserId();
      this.deliveryService.getAll(this.userId).subscribe((addresses) => {
        if (addresses.length) {
          this.deliveryAddresses = addresses;
          const defaultAddress = addresses.find((item) => item.isDefault);
          this.selectedAddress = defaultAddress ?? addresses[0];
          this.cd.detectChanges();
        }
      });
    }

    this.loadShippingOptions();
  }

  public selectDeliveryAddress(address: DeliveryAddress): void {
    this.selectedAddress = address;
  }

  public addAddress(): void {
    this.router.navigate(['./user/delivery-addresses']);
  }

  public selectShipping(option: ShippingOption): void {
    this.selectedShippingOption = option;
    this.shippingCost = option.cost;
  }

  public submitOrder(): void {
    if (this.deliveryAddresses.length === 0 && this.checkoutForm.invalid) {
      Util.markAllAsDirty(this.checkoutForm);
      return;
    }

    if (this.extraForm.invalid) {
      Util.markAllAsDirty(this.extraForm);
      return;
    }

    const items: OrderItem[] = this.cart
      .filter((i) => i.isSelected)
      .map(
        (i): OrderItem => ({
          productId: i.product.id,
          product: null,
          quantity: i.quantity || 1,
        })
      );

    let orderPayload: Order = {
      items: items,
      notes: this.extraForm.value.notes,
      shippingOptionId: this.selectedShippingOption.id,
      userId: this.userId,
    };
    if (this.userId && this.deliveryAddresses.length) {
      orderPayload.deliveryAddressId = this.selectedAddress?.id;

      if (!orderPayload.deliveryAddressId) {
        alert('Please select a delivery address');
        return;
      }
    } else {
      const form = this.checkoutForm.value;
      orderPayload.deliveryAddress = {
        firstName: form.firstName,
        lastName: form.lastName,
        country: form.country,
        city: form.city,
        street: form.street,
        houseNumber: form.houseNumber,
        apartment: form.apartment,
        postcode: form.postcode,
        phone: form.phone,
        email: form.email,
        notes: form.notes,
      };
    }

    this.orderService.create(orderPayload).subscribe({
      next: (id) => {
        alert('Order placed successfully!');
        this.cartService.removeSelected();
        this.router.navigate(['/checkout/payment', id]);
      },
      error: (err) => {
        console.error('Order creation failed', err);
        alert('Something went wrong. Please try again.');
      },
    });
  }

  public getErrorMessage(controlName: string, form: FormGroup): string | null {
    const control = form.get(controlName);
    return CustomValidators.getErrorMessage(control);
  }

  private createForms(): void {
    this.checkoutForm = this.fb.group({
      firstName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          CustomValidators.noSpaces(),
        ],
      ],
      lastName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          CustomValidators.noSpaces(),
        ],
      ],
      country: ['', [Validators.required, CustomValidators.noSpaces()]],
      city: ['', [Validators.required, CustomValidators.noSpaces()]],
      street: ['', [Validators.required, CustomValidators.noSpaces()]],
      houseNumber: ['', [Validators.required, CustomValidators.noSpaces()]],
      apartment: [''],
      postcode: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[0-9A-Za-z\- ]{3,10}$/),
          CustomValidators.noSpaces(),
        ],
      ],
      phone: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[0-9+()\-\s]{6,20}$/),
          CustomValidators.noSpaces(),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      notes: ['', [Validators.maxLength(200)]],
    });

    this.extraForm = this.fb.group({
      notes: ['', [Validators.maxLength(200)]],
      agreement: [false, Validators.requiredTrue],
    });
  }
  private loadShippingOptions(): void {
    this.shippingService.getAll().subscribe((options) => {
      this.shippingOptions = options;
      if (options.length > 0) {
        this.selectedShippingOption = options[0];
        this.shippingCost = options[0].cost;
      }
      this.cd.detectChanges();
    });
  }
}
