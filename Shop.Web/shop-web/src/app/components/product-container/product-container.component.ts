import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IProduct } from 'src/app/models/interfaces/product';
import { ProductRowComponent } from 'src/app/components/product-container/product-row/product-row.component';
import { ProductCardComponent } from './product-card/product-card.component';

@Component({
  selector: 'shop-product-container',
  templateUrl: './product-container.component.html',
  styleUrls: ['./product-container.component.scss'],
  standalone: true,
  imports: [CommonModule, ProductRowComponent, ProductCardComponent]
})
export class ProductContainerComponent {
  @Input() public isRow: boolean = false;
  @Input() public product: IProduct;

}
