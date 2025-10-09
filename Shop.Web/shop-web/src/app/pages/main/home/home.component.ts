import {
  ChangeDetectionStrategy,
  Component
} from '@angular/core';
import { Router } from '@angular/router';
import { Converter } from '../../../common/converter';
import { ICategory } from '../../../models/interfaces/category';
import { CategoryDataService } from '../../../services/data/category-data.service';
import { BaseCompleteComponent } from '../../../components/base/base-complete.component';
import { withState } from 'src/app/components/state-switcher/utils/widget-state';

@Component({
  selector: 'shop-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent extends BaseCompleteComponent {

  public categoriesState$ = this._categoryDataService.getAll().pipe(
    withState((data: ICategory[]) =>
      data.map((item) => ({
        ...item,
        image: {
          ...item.image,
          smallBody: Converter.toFileSrc(
            item.image.mimeType,
            item.image.smallBody
          ),
        },
      }))
    )
  );

  constructor(
    private _categoryDataService: CategoryDataService,
    private _router: Router
  ) {
    super();
  }

  public goToProductList(categoryName: string): void {
    this._router.navigate([`/${categoryName}`]);
  }
}
