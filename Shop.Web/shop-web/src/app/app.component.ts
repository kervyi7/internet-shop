import { ChangeDetectorRef, Component } from '@angular/core';
import { DisplayService } from './services/display.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public isShowLoadBar: boolean = false;

  constructor(private _displayService: DisplayService,
    private _cd: ChangeDetectorRef) {
  }

  public ngOnInit(): void {
    this._displayService.stateLoadBar$.subscribe((stateLoadBar) => {
      if (stateLoadBar) {
        this.changeState(stateLoadBar);
      }
      setTimeout(() => {
        this.changeState(stateLoadBar);
      }, 1000);
    });
  }

  private changeState(state: boolean): void {
    this.isShowLoadBar = state;
    this._cd.detectChanges();
  }
}
