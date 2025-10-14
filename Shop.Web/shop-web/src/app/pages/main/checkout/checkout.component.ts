import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Step } from 'src/app/models/interfaces/step';

@Component({
  selector: 'shop-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  public steps: Step[] = [
    { label: 'Cart', route: '/checkout/cart' },
    { label: 'Place Order', route: '/checkout/place-order' },
    { label: 'Payment', route: '/checkout/payment' },
    { label: 'Confirmation', route: '/checkout/confirmation' },
  ];

  public isMobile = false;

  public get currentStepIndex(): number {
    return this.steps.findIndex((s) => this.router.url.startsWith(s.route));
  }

  @HostListener('window:resize')
  public onResize(): void {
    this.updateIsMobile();
  }

  constructor(private router: Router) {}
  public ngOnInit(): void {
    this.updateIsMobile();
  }

  public isActive(route: string): boolean {
    return this.router.url.startsWith(route);
  }

  public goToStep(step: Step, index: number): void {
    const current = this.currentStepIndex;

    if (index <= current) {
      this.router.navigateByUrl(step.route);
    } else {
      return;
    }
  }

  private updateIsMobile(): void {
    this.isMobile = window.innerWidth < 768;
  }
}
