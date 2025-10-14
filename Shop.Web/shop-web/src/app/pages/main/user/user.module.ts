import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserComponent } from './user.component';
import { UserRoutingModule } from './user-routing.module';
import { FavoriteProductsModule } from './favorite-products/favorite-products.module';
import { SettingsModule } from './settings/settings.module';
import { DeliveryAddressesModule } from './delivery-addresses/delivery-addresses.module';
import { SecurityModule } from './security/security.module';
import { ButtonModule } from "primeng/button";

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
    ButtonModule
],
  exports: [UserComponent],
})
export class UserModule {}
