import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'shop-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss'],
  standalone: true,
  imports: [CommonModule, ButtonModule],
})
export class OrderSummaryComponent {
  @Input() public isCart: boolean = false;
  @Input() public isDisabled: boolean = false;
  @Input() public itemsAmount: number = 0;
  @Input() public shippingAmount: number = 5;
  @Input() public currency: string = 'USD';
  @Output() public payClicked = new EventEmitter<void>();

  constructor(private router: Router) {}

  public redirectToPrevious(): void {
    this.router.navigate(['./']);
  }

  public redirectToCheckout(): void {
    this.router.navigate(['/checkout/place-order']);
  }

  public pay(): void {
    this.payClicked.emit();
  }
}
