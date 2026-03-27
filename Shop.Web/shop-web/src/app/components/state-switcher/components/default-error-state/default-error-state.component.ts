import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-default-error-state',
  templateUrl: './default-error-state.component.html',
  styleUrls: ['./default-error-state.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DefaultErrorStateComponent {
  @Output() public reloadWidget = new EventEmitter();
}
