import { Directive, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Directive()
export abstract class BaseCompleteComponent implements OnDestroy {
  protected __unsubscribe$ = new Subject<void>();

  public ngOnDestroy(): void {
    this.__unsubscribe$.next();
    this.__unsubscribe$.complete();
  }
}
