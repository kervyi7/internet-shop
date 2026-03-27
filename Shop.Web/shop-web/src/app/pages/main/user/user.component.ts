import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { ProductSectionType } from 'src/app/models/enums/product-section';
import { Step } from 'src/app/models/interfaces/step';
import { AuthService } from 'src/app/services/auth.service';
import { AuthDataService } from 'src/app/services/data/auth-data.service';

@Component({
  selector: 'shop-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  providers: [ConfirmationService],
})
export class UserComponent implements OnInit {
  public SectionType = ProductSectionType;
  public activeTab: string = '';
  public steps: Step[] = [
    {
      label: 'My data',
      route: '/user/settings',
      icon: 'pi pi-user',
    },
    {
      label: 'Security',
      route: '/user/security',
      icon: 'pi pi-lock',
    },
    {
      label: 'Delivery Addresses',
      route: '/user/delivery-addresses',
      icon: 'pi pi-map-marker',
    },
    {
      label: 'Favorites',
      route: '/user/favorites',
      icon: 'pi pi-heart',
    },
    {
      label: 'Orders',
      route: '/user/orders',
      icon: 'pi pi-shopping-bag',
    },
  ];

  constructor(
    private router: Router,
    private confirmationService: ConfirmationService,
    private authDataService: AuthDataService,
    private authService: AuthService
  ) {}

  public ngOnInit(): void {
    this.setActiveTabFromRoute();
  }

  public isActive(route: string): boolean {
    return this.router.url.startsWith(route);
  }

  public goToStep(step: Step): void {
    this.activeTab = step.label;
    this.router.navigateByUrl(step.route);
  }

  public signOut(): void {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure that you want to sign out?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: 'none',
      rejectIcon: 'none',
      rejectButtonStyleClass: 'p-button-text',
      accept: () => {
        this.authDataService.logout().subscribe(() => {
          this.authService.removeTokenInfo();
          this.router.navigate(['./']);
        });
      },
    });
  }

  private setActiveTabFromRoute(): void {
    const currentRoute = this.router.url;
    const currentStep = this.steps.find((s) =>
      currentRoute.startsWith(s.route)
    );
    this.activeTab = currentStep ? currentStep.label : '';
  }
}
