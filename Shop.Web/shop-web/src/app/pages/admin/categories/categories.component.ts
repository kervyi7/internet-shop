import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { ICategory } from '../../../models/interfaces/category';
import { AdminCategoryDataService } from '../../../services/data/admin/admin-category-data.service';
import { BaseCompleteComponent } from '../../../components/base/base-complete.component';
import { takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { IPropertyTemplate } from '../../../models/interfaces/property';
import { Converter } from '../../../common/converter';
import { IGetModelsRequest } from 'src/app/models/interfaces/get-models-request';
import { IPageData } from 'src/app/models/interfaces/page-data';
import { PaginatorState } from 'primeng/paginator';

@Component({
  selector: 'shop-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoriesComponent
  extends BaseCompleteComponent
  implements OnInit
{
  public categories: ICategory[] = [];
  public template: IPropertyTemplate;
  public total: number = 0;
  public pagination: IGetModelsRequest = {
    skip: 0,
    count: 5
  };

  constructor(
    private _adminCategoryDataService: AdminCategoryDataService,
    private _cd: ChangeDetectorRef,
    private _router: Router
  ) {
    super();
  }

  public ngOnInit(): void {
    this.loadCategories();
  }

  public onPaginationFiltersChange(event: IGetModelsRequest): void {
    this.pagination = event;
    this.loadCategories();
  }

  public onPageChange(event: PaginatorState): void {
    this.pagination = {
      ...this.pagination,
      skip: event.first,
      count: event.rows,
    };
    this.loadCategories();
  }

  public loadCategories(): void {
    this._adminCategoryDataService
      .getAll(this.pagination)
      .pipe(takeUntil(this.__unsubscribe$))
      .subscribe((data: IPageData<ICategory[]>) => {
        this.categories = data.data;
        this.total = data.count;
        this.categories.map(
          (item: ICategory) =>
            (item.image.smallBody = Converter.toFileSrc(
              item.image.mimeType,
              item.image.smallBody
            ))
        );
        this._cd.detectChanges();
      });
  }

  public select(category: ICategory): void {
    this._router.navigate(['admin/categories/edit', category.id]);
  }

  public create(): void {
    this._router.navigate(['admin/categories/create']);
  }

  public delete(e: Event, category: ICategory): void {
    e.stopPropagation();
    this._adminCategoryDataService
      .delete(category.id)
      .pipe(takeUntil(this.__unsubscribe$))
      .subscribe(() => {
        this.loadCategories();
      });
  }
}
