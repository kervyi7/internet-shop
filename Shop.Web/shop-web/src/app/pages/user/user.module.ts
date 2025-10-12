import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { UserComponent } from "./user.component";
import { UserRoutingModule } from "./user-routing.module";
import { FavoriteProductsModule } from "./favorite-products/favorite-products.module";


@NgModule({
  declarations: [
    UserComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    UserRoutingModule,
    FavoriteProductsModule
  ],
  exports: [
    UserComponent
  ]
})
export class UserModule { }
