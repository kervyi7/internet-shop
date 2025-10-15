import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DeliveryAddress } from 'src/app/models/interfaces/delivery-address';

@Component({
  selector: 'shop-address-card',
  templateUrl: './address-card.component.html',
  styleUrls: ['./address-card.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, RadioButtonModule, ButtonModule],
})
export class AddressCardComponent {
  @Input() public address: DeliveryAddress;
  @Input() public selectedAddressId: number;
  @Input() public isEdit: boolean = false;
  @Output() public edit: EventEmitter<DeliveryAddress> = new EventEmitter();
  @Output() public select: EventEmitter<DeliveryAddress> = new EventEmitter();
  @Output() public delete: EventEmitter<DeliveryAddress> = new EventEmitter();

  public selectAddress(item: DeliveryAddress): void {
    this.select.next(item);
  }

  public showEditForm(item: DeliveryAddress): void {
    this.edit.next(item);
  }

  public deleteAddress(item: DeliveryAddress): void {
    this.delete.next(item);
  }
}
