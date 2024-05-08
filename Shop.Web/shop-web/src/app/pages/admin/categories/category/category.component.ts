import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminCategoryDataService } from '../../../../services/data/admin-category-data.service';
import { BaseCompleteComponent } from '../../../../components/base/base-complete.component';
import { takeUntil } from 'rxjs';
import { ICategory } from '../../../../models/interfaces/category';
import { IImage } from '../../../../models/interfaces/image';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ImageStorageDialogComponent } from '../../../../components/dialogs/image-storage-dialog/image-storage-dialog.component';

@Component({
  selector: 'shop-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryComponent extends BaseCompleteComponent implements OnInit {
  private _dialogRef: DynamicDialogRef
  private _id: number;
  public imageChangedFile: File;
  public image: IImage;
  public category: ICategory;
  public categoryName: string;
  public categoryCode: string;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _adminCategoryDataService: AdminCategoryDataService,
    private _cd: ChangeDetectorRef,
    private _dialogService: DialogService) {
    super();
  }

  public ngOnInit(): void {
    this._id = +this._activatedRoute.snapshot.paramMap.get('id')!;
    console.log(this._id);
    if (this._id) {
      this._adminCategoryDataService.getById(this._id).pipe(
        takeUntil(this.__unsubscribe$)).subscribe((data: ICategory) => {
          this.category = data;
          this.image = this.category.image;
          this.categoryName = this.category.name;
          this.categoryCode = this.category.code;
          this._cd.detectChanges();
        });
    }
  }

  public submit() {
    if (this._id) {
      this.edit();
    } else {
      this.create();
    }
  }

  private edit() {
    const category: ICategory = {
      id: this._id,
      image: this.image,
      name: this.categoryName,
      code: this.categoryCode,
      position: null
    }
    if (this.validate(category)) {
      throw new Error("nothing changed");
    }
    this._adminCategoryDataService.editCategory(this._id, category).subscribe();
  }

  private validate(category: ICategory) {
    return category == this.category;
  }

  private create() {
    const category: ICategory = {
      image: this.image,
      name: this.categoryName,
      code: this.categoryCode
    };
    this._adminCategoryDataService.create(category).subscribe(() => {
      this.goToPreviousPage()
    });
  }

  public showImageStorage() {
    this._dialogRef = this._dialogService.open(ImageStorageDialogComponent, {
      header: this.lang.headers.imageStorage,
      width: '1100px',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 4,
      maximizable: true
    });
    this._dialogRef.onClose.subscribe(data => {
      if (!data) {
        return;
      }
      this.image = data;
      this._cd.detectChanges();
    });
  }

  public goToPreviousPage() {
    this._router.navigate(['/admin/categories']);
  }
}
