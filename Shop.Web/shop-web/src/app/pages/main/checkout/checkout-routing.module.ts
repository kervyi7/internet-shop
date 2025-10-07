import { NgModule, Type } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutComponent } from './checkout.component';
import { CartComponent } from './cart/cart.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { PaymentComponent } from './payment/payment.component';
import { PlaceOrderComponent } from './place-order/place-order.component';

const routes: Routes = [
  {
    path: '',
    component: CheckoutComponent,
    children: [
      {
        path: 'cart',
        component: CartComponent,
      },
      {
        path: 'place-order',
        component: PlaceOrderComponent
      },
      {
        path: 'payment',
        component: PaymentComponent
      },
      {
        path: 'confirmation',
        component: ConfirmationComponent
      },
      {
        path: '**',
        redirectTo: 'cart'
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CheckoutRoutingModule { }
