import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ContentStateDirective } from './directives/content-state.directive';
import { DefaultEmptyStateComponent } from './components/default-empty-state/default-empty-state.component';
import { DefaultErrorStateComponent } from './components/default-error-state/default-error-state.component';
import { DefaultLoadingStateComponent } from './components/default-loading-state/default-loading-state.component';
import { EmptyStateDirective } from './directives/empty-state.directive';
import { ErrorStateDirective } from './directives/error-state.directive';
import { LoadingStateDirective } from './directives/loading-state-directive';
import { StateSwitcherComponent } from './state-switcher.component';

@NgModule({
  declarations: [
    StateSwitcherComponent,
    DefaultErrorStateComponent,
    DefaultLoadingStateComponent,
    EmptyStateDirective,
    ContentStateDirective,
    ErrorStateDirective,
    LoadingStateDirective
  ],
  imports: [CommonModule, DefaultEmptyStateComponent],
  exports: [
    StateSwitcherComponent,
    DefaultErrorStateComponent,
    DefaultEmptyStateComponent,
    EmptyStateDirective,
    ContentStateDirective,
    ErrorStateDirective,
    LoadingStateDirective,
    DefaultLoadingStateComponent
  ]
})
export class StateSwitcherModule {}
