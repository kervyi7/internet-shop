import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { BaseCompleteComponent } from '../../components/base/base-complete.component';
import { CartService } from 'src/app/services/cart.service';
import { map } from 'rxjs';
import { InfoPageDataService } from 'src/app/services/data/info-pages-data.service';
import { ShopContactInfo } from 'src/app/models/interfaces/info-pages';
import { ScreenService } from 'src/app/services/screen.service';
import { ScreenSizes } from 'src/app/models/enums/screen-sizes';

@Component({
  selector: 'shop-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent extends BaseCompleteComponent implements OnInit {
  public isAuthorized: boolean = false;
  public isAdmin: boolean = false;
  public isMobile: boolean = false;
  public isMenuOpen: boolean = false;
  public date: Date = new Date();
  public contacts: ShopContactInfo;
  public socialLinks = [
    { key: 'instagram', label: 'Instagram', icon: 'pi pi-instagram' },
    { key: 'facebook', label: 'Facebook', icon: 'pi pi-facebook' },
    { key: 'telegram', label: 'Telegram', icon: 'pi pi-send' },
    { key: 'twitter', label: 'Twitter', icon: 'pi pi-twitter' },
    { key: 'twitch', label: 'Twitch', icon: 'pi pi-video' },
    { key: 'youtube', label: 'YouTube', icon: 'pi pi-youtube' },
    { key: 'linkedin', label: 'LinkedIn', icon: 'pi pi-linkedin' },
    { key: 'github', label: 'GitHub', icon: 'pi pi-github' },
    { key: 'reddit', label: 'Reddit', icon: 'pi pi-reddit' },
    { key: 'discord', label: 'Discord', icon: 'pi pi-discord' },
  ];

  public totalQuantity$ = this.cartService.cart$.pipe(
    map((items) => items.reduce((sum, item) => sum + (item.quantity || 1), 0))
  );

  constructor(
    private infoPageDataService: InfoPageDataService,
    private _authService: AuthService,
    private _router: Router,
    private cartService: CartService,
    private screenService: ScreenService,
    private cd: ChangeDetectorRef
  ) {
    super();
  }

  public ngOnInit(): void {
    this.isMobile = this.screenService.isMobile();
    this.screenService.screenSize$.subscribe((size) => {
      this.isMobile = size === ScreenSizes.Mobile;
      this.cd.detectChanges();
    });
    this.isAuthorized = this._authService.isLoggedIn();
    this.isAdmin = this._authService.isAdmin();
    this.loadContacts();
  }
  public toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
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

  private loadContacts(): void {
    this.infoPageDataService.getContacts().subscribe((data) => {
      this.contacts = data;
    });
  }
}
