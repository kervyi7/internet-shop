import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject, fromEvent } from 'rxjs';
import { debounceTime, startWith } from 'rxjs/operators';
import { ScreenSizes } from '../models/enums/screen-sizes';

@Injectable({
  providedIn: 'root',
})
export class ScreenService {
  private _screenSize$ = new BehaviorSubject<ScreenSizes>(this.getScreenSize());
  public readonly screenSize$ = this._screenSize$.asObservable();

  constructor(private ngZone: NgZone) {
    this.ngZone.runOutsideAngular(() => {
      fromEvent(window, 'resize')
        .pipe(debounceTime(200), startWith(null))
        .subscribe(() => {
          const newSize = this.getScreenSize();
          if (newSize !== this._screenSize$.value) {
            this.ngZone.run(() => this._screenSize$.next(newSize));
          }
        });
    });
  }

  private getScreenSize(): ScreenSizes {
    const width = window.innerWidth;

    switch (true) {
      case width < 769:
        return ScreenSizes.Mobile;
      case width < 1200:
        return ScreenSizes.Tablet;
      default:
        return ScreenSizes.Desktop;
    }
  }

  public isMobile(): boolean {
    return this._screenSize$.value === ScreenSizes.Mobile;
  }

  public isTablet(): boolean {
    return this._screenSize$.value === ScreenSizes.Mobile;
  }
}
