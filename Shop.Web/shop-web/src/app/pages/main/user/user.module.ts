import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserComponent } from './user.component';
import { UserRoutingModule } from './user-routing.module';
import { FavoriteProductsModule } from './favorite-products/favorite-products.module';
import { SettingsModule } from './settings/settings.module';
import { DeliveryAddressesModule } from './delivery-addresses/delivery-addresses.module';
import { SecurityModule } from './security/security.module';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { OrdersModule } from './orders/orders.module';

@NgModule({
  declarations: [UserComponent],
  imports: [
    CommonModule,
    RouterModule,
    UserRoutingModule,
    FavoriteProductsModule,
    SettingsModule,
    DeliveryAddressesModule,
    SecurityModule,
    ButtonModule,
    ConfirmDialogModule,
    OrdersModule
  ],
  exports: [UserComponent],
})
export class UserModule {}
