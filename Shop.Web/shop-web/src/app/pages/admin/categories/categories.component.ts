import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ICategory } from '../../../models/interfaces/category';
import { AdminCategoryDataService } from '../../../services/data/admin-category-data.service';
import { BaseCompleteComponent } from '../../../components/base/base-complete.component';
import { takeUntil } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'shop-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoriesComponent extends BaseCompleteComponent implements OnInit {
  public categories: ICategory[] = [];

  constructor(
    private _adminCategoryDataService: AdminCategoryDataService,
    private _cd: ChangeDetectorRef,
    private _router: Router) {
    super();
  }

  public ngOnInit(): void {
    this.get();
  }

  public get() {
    this._adminCategoryDataService.getAll().pipe(
      takeUntil(this.__unsubscribe$)).subscribe((data: ICategory[]) => {
        this.categories = data;
        this._cd.detectChanges();
      });
  }

  public select(category: ICategory): void {
    this._router.navigate(['admin/categories/edit', category.id]);
  }

  public create(): void {
    this._router.navigate(['admin/categories/create']);
  }

  public delete(e: Event, category: ICategory) {
    e.stopPropagation();
    this._adminCategoryDataService.delete(category.id).subscribe(()=> {
      this.get();
    });
  }
}
