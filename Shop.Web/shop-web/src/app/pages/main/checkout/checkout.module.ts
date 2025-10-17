import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StateSwitcherModule } from 'src/app/components/state-switcher/state-switcher.module';
import { CheckoutRoutingModule } from './checkout-routing.module';
import { CheckoutComponent } from './checkout.component';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { DialogService } from 'primeng/dynamicdialog';
import { PaymentComponent } from './payment/payment.component';
import { PlaceOrderComponent } from './place-order/place-order.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { CartComponent } from './cart/cart.component';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CartItemComponent } from 'src/app/components/cart-item/cart-item.component';
import { CheckboxModule } from 'primeng/checkbox';
import { OrderSummaryComponent } from 'src/app/components/order-summary/order-summary.component';
import { AddressCardComponent } from 'src/app/components/address-card/address-card.component';
import { RadioButtonModule } from 'primeng/radiobutton';
import { OrderDetailsComponent } from 'src/app/components/order-details/order-details.component';
import { ProductSectionsComponent } from 'src/app/components/product-sections/product-sections.component';

@NgModule({
  declarations: [
    CheckoutComponent,
    CartComponent,
    PaymentComponent,
    PlaceOrderComponent,
    ConfirmationComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    CheckoutRoutingModule,
    ButtonModule,
    CarouselModule,
    StateSwitcherModule,
    InputTextModule,
    InputTextareaModule,
    CartItemComponent,
    OrderSummaryComponent,
    CheckboxModule,
    ProductSectionsComponent,
    AddressCardComponent,
    RadioButtonModule,
    OrderDetailsComponent
  ],
  providers: [DialogService],
  exports: [CheckoutComponent],
})
export class CheckoutModule {}
