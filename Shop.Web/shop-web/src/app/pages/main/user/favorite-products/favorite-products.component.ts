import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { FavoritesService } from 'src/app/services/favorites.service';
import { IProduct } from 'src/app/models/interfaces/product';
import { takeUntil } from 'rxjs';
import { BaseCompleteComponent } from 'src/app/components/base/base-complete.component';

@Component({
  selector: 'shop-favorite-products',
  templateUrl: './favorite-products.component.html',
  styleUrls: ['./favorite-products.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoriteProductsComponent
  extends BaseCompleteComponent
  implements OnInit
{
  public products: IProduct[] = [];
  public isRowsView: boolean = false;

  constructor(
    private favoritesService: FavoritesService,
    private cd: ChangeDetectorRef
  ) {
    super();
  }

  public ngOnInit(): void {
    this.favoritesService.favorites$
      .pipe(takeUntil(this.__unsubscribe$))
      .subscribe((products) => {
        this.products = products;
        this.cd.markForCheck();
      });
  }
}
