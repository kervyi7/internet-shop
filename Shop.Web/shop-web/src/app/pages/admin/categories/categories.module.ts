import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CategoriesComponent } from './categories.component';
import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoryComponent } from './category/category.component';

@NgModule({
  declarations: [
    CategoriesComponent,
    CategoryComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    CategoriesRoutingModule
  ],
  providers: [],
  exports: [
    CategoriesComponent
  ]
})
export class CategoriesModule { }
