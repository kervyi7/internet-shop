import { ChangeDetectionStrategy, Component, ContentChild, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { ContentStateDirective } from './directives/content-state.directive';
import { EmptyStateDirective } from './directives/empty-state.directive';
import { ErrorStateDirective } from './directives/error-state.directive';
import { LoadingStateDirective } from './directives/loading-state-directive';
import { WidgetState, CurrentWidgetState } from './state-switcher.model';

@Component({
  selector: 'app-state-switcher',
  templateUrl: './state-switcher.component.html',
  styleUrls: ['./state-switcher.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StateSwitcherComponent implements OnChanges {
  @Input() public isShowLoadingOverlay = false;
  @Input() public state: WidgetState | null = { isEmpty: false, error: false, isLoading: false };
  @Input() public minHeightLoading = 0;
  @Input() public loadingVerticalPadding = 8;

  // Default error state outputs
  @Output() public reloadWidget = new EventEmitter();

  @ContentChild(EmptyStateDirective) public emptyStateContent: EmptyStateDirective | undefined;
  @ContentChild(ErrorStateDirective) public errorStateContent: ErrorStateDirective | undefined;
  @ContentChild(LoadingStateDirective) public loadingStateContent: LoadingStateDirective | undefined;
  @ContentChild(ContentStateDirective) public contentState: ContentStateDirective | undefined;

  public STATE_TYPES = CurrentWidgetState;

  public ngOnChanges({ state }: SimpleChanges): void {
    if (state?.currentValue) {
      this.state = state.currentValue;
    }
  }

  public get currentState(): CurrentWidgetState {
    if (this.state?.error) {
      return CurrentWidgetState.ERROR;
    }
    if (this.state?.isLoading && this.isShowLoadingOverlay) {
      return CurrentWidgetState.LOADING_OVERLAY;
    }
    if (this.state?.isLoading) {
      return CurrentWidgetState.LOADING;
    }
    if (this.state?.isEmpty) {
      return CurrentWidgetState.EMPTY;
    }

    return CurrentWidgetState.DEFAULT;
  }
}
