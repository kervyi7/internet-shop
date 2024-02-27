import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminCategoryDataService } from '../../../../services/data/admin-category-data.service';
import { BaseCompleteComponent } from '../../../../components/base/base-complete.component';
import { takeUntil } from 'rxjs';
import { ICategory } from '../../../../models/interfaces/category';

@Component({
  selector: 'shop-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent extends BaseCompleteComponent implements OnInit {
  private _id: number;
  public category: ICategory;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _adminCategoryDataService: AdminCategoryDataService,
    private _cd: ChangeDetectorRef) {
    super();
  }

  ngOnInit(): void {
    this._id = +this._activatedRoute.snapshot.paramMap.get('id')!;
    console.log(this._id);
    this._adminCategoryDataService.getById(this._id).pipe(
      takeUntil(this.__unsubscribe$)).subscribe((data: ICategory) => {
        this.category = data;
        this._cd.detectChanges();
      });
  }
}
