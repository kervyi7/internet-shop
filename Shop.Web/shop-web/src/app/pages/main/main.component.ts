import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { BaseCompleteComponent } from '../../components/base/base-complete.component';

@Component({
  selector: 'shop-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent extends BaseCompleteComponent implements OnInit {
  public isAuthorized: boolean;

  constructor(private _authService: AuthService,
    private _router: Router,
    private _cd: ChangeDetectorRef) {
    super();
  }

  public ngOnInit(): void {
    this.isAuthorized = this._authService.isLoggedIn();
  }

  public goToAdmin(): void {
    debugger
    this._router.navigate(['/admin']);
  }

  public goToLogin(): void {
    this._router.navigate(['/login']);
  }

  public goToHome(): void {
    if (this._router.url === '/') {
      return;
    }
    this._router.navigate(['/']);
  }
}
