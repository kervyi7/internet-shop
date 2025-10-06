import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { EMPTY_STATE_IMAGE } from '../../state-switcher.config';

@Component({
  selector: 'app-default-empty-state',
  standalone: true,
  imports: [],
  templateUrl: './default-empty-state.component.html',
  styleUrls: ['./default-empty-state.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DefaultEmptyStateComponent {
  @Input() public image = EMPTY_STATE_IMAGE.emptyNoData;
  @Input() public title = 'Unfortunately, there no data to display';//language
  @Input() public subTitle = '';
  @Input() public justifyContent: 'start' | 'center' | 'end' = 'center';
  @Input() public paddingY = 8;

  public isShowContent = false;

  public onImageLoaded(): void {
    this.isShowContent = true;
  }
}
