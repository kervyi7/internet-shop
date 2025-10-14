import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { BaseCompleteComponent } from '../../components/base/base-complete.component';
import { CartService } from 'src/app/services/cart.service';
import { map } from 'rxjs';

@Component({
  selector: 'shop-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent extends BaseCompleteComponent implements OnInit {
  public isAuthorized: boolean;
  public isAdmin: boolean;

  public totalQuantity$ = this.cartService.cart$.pipe(
    map((items) => items.reduce((sum, item) => sum + (item.quantity || 1), 0))
  );

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private cartService: CartService
  ) {
    super();
  }

  public ngOnInit(): void {
    this.isAuthorized = this._authService.isLoggedIn();
    this.isAdmin = this._authService.isAdmin();
  }

  public goToAdmin(): void {
    this._router.navigate(['/admin']);
  }

  public goToUser(): void {
    this._router.navigate(['/user']);
  }

  public goToFavorites(): void {
    this._router.navigate(['/user/favorites']);
  }

  public goToLogin(): void {
    this._router.navigate(['/login']);
  }

  public goToCart(): void {
    this._router.navigate(['/checkout']);
  }

  public goToHome(): void {
    if (this._router.url === '/') {
      return;
    }
    this._router.navigate(['/']);
  }
}
