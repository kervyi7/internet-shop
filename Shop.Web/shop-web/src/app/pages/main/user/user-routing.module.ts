import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { FavoriteProductsComponent } from './favorite-products/favorite-products.component';
import { SettingsComponent } from './settings/settings.component';
import { OrdersComponent } from './orders/orders.component';
import { DeliveryAddressesComponent } from './delivery-addresses/delivery-addresses.component';
import { SecurityComponent } from './security/security.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'settings',
      },
      {
        path: 'settings',
        component: SettingsComponent,
      },
      {
        path: 'security',
        component: SecurityComponent,
      },
      {
        path: 'orders',
        component: OrdersComponent,
      },
      {
        path: 'delivery-addresses',
        component: DeliveryAddressesComponent,
      },
      {
        path: 'favorites',
        component: FavoriteProductsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
