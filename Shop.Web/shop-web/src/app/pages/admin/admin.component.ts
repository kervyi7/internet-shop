import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BaseCompleteComponent } from '../../components/base/base-complete.component';
import {
  trigger,
  state,
  style,
  transition,
  animate,
  AnimationEvent,
} from '@angular/animations';

@Component({
  selector: 'shop-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  animations: [
    trigger('openClose', [
      state(
        'open',
        style({
          width: '300px',
        })
      ),
      state(
        'closed',
        style({
          width: '88px',
        })
      ),
      transition('open <=> closed', [animate('0.25s')]),
    ]),
  ],
})
export class AdminComponent extends BaseCompleteComponent {
  public isMenuOpen = false;
  showButtonNames = false;
  constructor(private _router: Router) {
    super();
  }

  public onAnimationEvent(event: AnimationEvent): void {
    event.fromState == 'closed'
      ? (this.showButtonNames = true)
      : (this.showButtonNames = false);
  }

  public changeMenuState(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  public openCategories(): void {
    this._router.navigate(['/admin/categories']);
  }

  public openProducts(): void {
    this._router.navigate(['/admin/products']);
  }

  public openOrders(): void {
    this._router.navigate(['/admin/orders']);
  }

  public openShipping(): void {
    this._router.navigate(['/admin/shipping']);
  }
  public openInfo(): void {
    this._router.navigate(['/admin/info']);
  }

  public openSettings(): void {
    this._router.navigate(['/admin/settings']);
  }

  public openHomePage(): void {
    this._router.navigate(['/']);
  }
}
