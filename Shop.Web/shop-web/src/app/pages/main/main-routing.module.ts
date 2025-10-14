import { inject, NgModule, Type } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { ProductsModule } from './products/products.module';
import { ProductComponent } from './products/product/product.component';
import { HomeComponent } from './home/home.component';
import { CheckoutModule } from 'src/app/pages/main/checkout/checkout.module';
import { UserModule } from 'src/app/pages/main/user/user.module';
import { UserGuard } from 'src/app/guards/user.guard';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },

      {
        path: 'user',
        runGuardsAndResolvers: 'always',
        canActivate: [() => inject(UserGuard).canActivate()],
        loadChildren: (): Promise<Type<UserModule>> =>
          import('src/app/pages/main/user/user.module').then((m) => m.UserModule),
      },
      {
        path: 'checkout',
        loadChildren: (): Promise<Type<CheckoutModule>> =>
          import('src/app/pages/main/checkout/checkout.module').then(
            (m) => m.CheckoutModule
          ),
      },
      {
        path: ':category',
        loadChildren: (): Promise<Type<ProductsModule>> =>
          import('src/app/pages/main/products/products.module').then(
            (m) => m.ProductsModule
          ),
      },
      {
        path: ':category/:code',
        component: ProductComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
