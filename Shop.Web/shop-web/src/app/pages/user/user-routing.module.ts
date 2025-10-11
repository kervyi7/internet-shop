import { NgModule, Type } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { FavoriteProductsComponent } from './favorite-products/favorite-products.component';
import { SettingsComponent } from './settings/settings.component';
import { OrdersComponent } from './orders/orders.component';
import { ShippingComponent } from './shipping/shipping.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      {
        path: 'settings',
        component: SettingsComponent
      },
      {
        path: 'orders',
        component: OrdersComponent
      },
      {
        path: 'shipping',
        component: ShippingComponent
      },
      {
        path: 'favorites',
        component: FavoriteProductsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
