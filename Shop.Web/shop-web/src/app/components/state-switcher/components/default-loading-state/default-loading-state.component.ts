import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-default-loading-state',
  templateUrl: './default-loading-state.component.html',
  styleUrls: ['./default-loading-state.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DefaultLoadingStateComponent {
  @Input() public isOverlay = false;
  @Input() public minHeight = 0;
  @Input() public verticalPadding = 8;
}
