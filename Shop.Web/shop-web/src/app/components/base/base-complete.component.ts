import { Directive, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { ILocalization } from '../../models/interfaces/localization/localization';
import { AppConfigService } from '../../services/app-config.service';

@Directive()
export abstract class BaseCompleteComponent implements OnDestroy {
  protected __unsubscribe$ = new Subject<void>();

  public lang: ILocalization = AppConfigService.localization;

  public ngOnDestroy(): void {
    this.__unsubscribe$.next();
    this.__unsubscribe$.complete();
  }
}
