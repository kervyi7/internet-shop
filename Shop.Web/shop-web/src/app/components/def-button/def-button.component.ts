import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonTypes } from '../../models/enums/button-types';

@Component({
  selector: 'shop-def-button',
  templateUrl: './def-button.component.html',
  styleUrls: ['./def-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DefButtonComponent {
  @Output() click = new EventEmitter<void>();

  @Input() isDisabled: boolean;
  @Input() type: ButtonTypes | string;

  public onClick(event: MouseEvent): void {
    event.stopPropagation();
    if (!this.isDisabled) {
      return;
    }
    this.click.next();
  }
}
