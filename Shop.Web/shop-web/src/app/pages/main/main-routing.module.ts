import { NgModule, Type } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { ProductsModule } from './products/products.module';
import { ProductComponent } from './products/product/product.component';
import { HomeComponent } from './home/home.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CheckoutModule } from 'src/app/pages/main/checkout/checkout.module';

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
        path: 'checkout',
        loadChildren: (): Promise<Type<CheckoutModule>> =>
          import('src/app/pages/main/checkout/checkout.module').then(m => m.CheckoutModule)
      },
      {
        path: ':category',
        loadChildren: (): Promise<Type<ProductsModule>> =>
          import('src/app/pages/main/products/products.module').then(m => m.ProductsModule)
      },
      {
        path: ':category/:code',
        component: ProductComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
