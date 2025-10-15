import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';
import { firstValueFrom } from 'rxjs';
import { BaseDataService } from './base-data.service';
import { AppConfigService } from '../app-config.service';

@Injectable({ providedIn: 'root' })
export class PaymentService extends BaseDataService {
  public baseUrl = 'payment';
  private stripePromise = loadStripe(
    'pk_test_51SIXRMGm7LsUiuRcQ4AbXxHvNS7W8TsQ1fEhDVaFVWup8gccyKhCdOfmkCTaPIfCuoVROeKHDtEhPIkppYL6Mkk800or5bEKos'
  );

  constructor(
    public readonly http: HttpClient,
    private _appConfigService: AppConfigService
  ) {
    super(_appConfigService);
  }

  async pay(
    amount: number,
    productName: string,
    orderId: number
  ): Promise<void> {
    try {
      const session = await firstValueFrom(
        this.http.post<{ id: string }>(this.getUrl('create-checkout-session'), {
          //TODO: payment interface
          amount,
          productName,
          orderId,
        })
      );

      const stripe = await this.stripePromise;
      if (stripe && session?.id) {
        const result = await stripe.redirectToCheckout({
          sessionId: session.id,
        });
        if (result.error) {
          console.error('Stripe redirect error:', result.error.message);
        }
      }
    } catch (error) {
      console.error('Payment failed:', error);
    }
  }
}
