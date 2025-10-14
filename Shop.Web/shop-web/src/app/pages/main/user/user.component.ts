import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Step } from 'src/app/models/interfaces/step';

@Component({
  selector: 'shop-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  public isMobile = false;
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

  constructor(private router: Router) {}

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

  private setActiveTabFromRoute(): void {
    const currentRoute = this.router.url;
    const currentStep = this.steps.find((s) =>
      currentRoute.startsWith(s.route)
    );
    this.activeTab = currentStep ? currentStep.label : '';
  }
}
