import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'shop-favorites-button',
  templateUrl: './favorites-button.component.html',
  styleUrls: ['./favorites-button.component.scss'],
  standalone: true,
  imports: [CommonModule, ButtonModule],
})
export class FavoritesButtonComponent {
  @Input() public isFavorite: boolean = false;
  @Output() public click: EventEmitter<MouseEvent> = new EventEmitter();

  public handleClick(e: MouseEvent): void {
    this.click.next(e);
  }
}
