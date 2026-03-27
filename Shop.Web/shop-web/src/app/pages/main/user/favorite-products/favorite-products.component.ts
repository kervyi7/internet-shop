import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { FavoritesService } from 'src/app/services/favorites.service';
import { IProduct } from 'src/app/models/interfaces/product';
import { map, Observable } from 'rxjs';
import { BaseCompleteComponent } from 'src/app/components/base/base-complete.component';
import { WidgetStateWithData } from 'src/app/components/state-switcher/state-switcher.model';
import { IGetModelsRequest } from 'src/app/models/interfaces/get-models-request';
import { withState } from 'src/app/components/state-switcher/utils/widget-state';

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
  public state$: Observable<WidgetStateWithData<IProduct[]>>;
  public isRowsView: boolean = false;
  public pagination: IGetModelsRequest = {
    skip: 0,
    count: 5,
  };

  constructor(
    private favoritesService: FavoritesService,
    private cd: ChangeDetectorRef
  ) {
    super();
  }

  public ngOnInit(): void {
    this.state$ = this.favoritesService.favorites$.pipe(
      map((response) => {
        //this.total = response.count;
        return response;
      }),
      // map через withState() додає loading/error
      withState()
    );

    // this.favoritesService.favorites$
    //   .pipe(takeUntil(this.__unsubscribe$))
    //   .subscribe((products) => {
    //     this.cd.markForCheck();
    //   });
  }
}
