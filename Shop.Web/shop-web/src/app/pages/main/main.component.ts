import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, Type } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { BaseCompleteComponent } from '../../components/base/base-complete.component';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Util } from 'src/app/common/util';
import { CartDialogComponent } from 'src/app/components/dialogs/cart-dialog/cart-dialog.component';
import { DialogOptions } from 'src/app/models/enums/dialog-options';

@Component({
  selector: 'shop-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent extends BaseCompleteComponent implements OnInit {
  private _dialogRef: DynamicDialogRef;
  public isAuthorized: boolean;

  constructor(private _authService: AuthService,
    private _router: Router,
    private _dialogService: DialogService,
    private _cd: ChangeDetectorRef) {
    super();
  }

  public ngOnInit(): void {
    this.isAuthorized = this._authService.isLoggedIn();
  }

  public goToAdmin(): void {
    this._router.navigate(['/admin']);
  }

  public goToLogin(): void {
    this._router.navigate(['/login']);
  }

  public openCart(): void {
    const config = { header: "Cart", width: DialogOptions.standardWidth, maximizable: false };
    this._dialogRef = Util.openDialog(this._dialogService, CartDialogComponent, config)
  }

  public goToHome(): void {
    if (this._router.url === '/') {
      return;
    }
    this._router.navigate(['/']);
  }
}
