import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ScreenSizes } from 'src/app/models/enums/screen-sizes';
import { Step } from 'src/app/models/interfaces/step';
import { ScreenService } from 'src/app/services/screen.service';

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

  constructor(private router: Router, private screenService: ScreenService) {}

  public ngOnInit(): void {
    this.isMobile = this.screenService.isMobile();
    this.screenService.screenSize$.subscribe((size) => {
      this.isMobile = size === ScreenSizes.Mobile;
    });
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
}
