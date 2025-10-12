import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { CartItem } from 'src/app/models/interfaces/cart';

@Component({
  selector: 'shop-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    CheckboxModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
  ],
})
export class CartItemComponent implements OnInit {
  @Input() item!: CartItem;
  @Input() public isCart: boolean = false;

  public isMobile = false;

  @Output() public quantityChange = new EventEmitter<CartItem>();
  @Output() public remove = new EventEmitter<void>();
  @Output() public toggleSelect = new EventEmitter<boolean>();

  @HostListener('window:resize')
  public onResize(): void {
    this.updateIsMobile();
  }

  public ngOnInit(): void {
    this.updateIsMobile();
  }

  public onQuantityChange(newCount: number): void {
    if (!newCount) {
      this.item.quantity = 1;
    } else {
      this.item.quantity = newCount;
    }
    this.quantityChange.emit(this.item);
  }

  public onRemove(): void {
    this.remove.emit();
  }

  public onSelectChange(checked: boolean): void {
    this.toggleSelect.emit(checked);
  }

  private updateIsMobile(): void {
    this.isMobile = window.innerWidth < 768;
  }
}
