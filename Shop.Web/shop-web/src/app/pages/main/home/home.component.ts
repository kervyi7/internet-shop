import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Converter } from '../../../common/converter';
import { ICategory } from '../../../models/interfaces/category';
import { CategoryDataService } from '../../../services/data/category-data.service';
import { BaseCompleteComponent } from '../../../components/base/base-complete.component';
import { withState } from 'src/app/components/state-switcher/utils/widget-state';
import { AuthService } from 'src/app/services/auth.service';
import { ProductSectionType } from 'src/app/models/enums/product-section';

@Component({
  selector: 'shop-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent extends BaseCompleteComponent implements OnInit {
  public userId: string;
  public SectionType = ProductSectionType;
  public categoriesState$ = this._categoryDataService.getAll().pipe(
    withState((data: ICategory[]) =>
      data.map((item) => ({
        ...item,
        image: {
          ...item.image,
          body: Converter.toFileSrc(
            item.image.mimeType,
            item.image.body
          ),
        },
      }))
    )
  );

  constructor(
    private _categoryDataService: CategoryDataService,
    private _authService: AuthService,
    private _router: Router
  ) {
    super();
  }

  public ngOnInit(): void {
    this.userId = this._authService.getUserId();
  }

  public goToProductList(categoryName: string): void {
    this._router.navigate([`/${categoryName}`]);
  }
}
