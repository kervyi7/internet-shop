import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DisplayService {
  private _stateLoadBar$ = new Subject<boolean>();

  public changeStateLoadBar(visible: boolean): void {
    this._stateLoadBar$.next(visible);
  }

  get stateLoadBar$(): Subject<boolean> {
    return this._stateLoadBar$;
  }
}