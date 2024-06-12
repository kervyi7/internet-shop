import { Component, OnInit } from '@angular/core';
import { ICodeName } from '../../../models/interfaces/base/code-name';
import { takeUntil } from 'rxjs';
import { BaseCompleteComponent } from '../../base/base-complete.component';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ProductItems } from '../../../models/enums/product-items';
import { BrandDataService } from '../../../services/data/admin-brand-data.service';
import { TypeDataService } from '../../../services/data/admin-type-data.service';

@Component({
  selector: 'shop-select-item-dialog',
  templateUrl: './select-item-dialog.component.html',
  styleUrls: ['./select-item-dialog.component.scss']
})
export class SelectItemDialogComponent extends BaseCompleteComponent implements OnInit {
  public items: ICodeName[];
  public itemsName: string;
  public isShowAddItem = false;
  public newItem: ICodeName = { name: '', code: '' };
  public isValidName: boolean = true;
  public isValidCode: boolean = true;

  constructor(
    private _brandDataService: BrandDataService,
    private _typeDataService: TypeDataService,
    private _refConfig: DynamicDialogConfig,
    private _ref: DynamicDialogRef) {
    super();
  }

  public ngOnInit(): void {
    this.items = this._refConfig.data.items;
    this.itemsName = this._refConfig.data.itemsName;
  }

  public showAddItem(): void {
    this.isShowAddItem = !this.isShowAddItem;
  }

  public addItem(): void {
    if (this.itemsName == ProductItems.brand) {
      this._brandDataService.createBrand(this.newItem).pipe(
        takeUntil(this.__unsubscribe$)).subscribe(data => {
          this.newItem.id = data.id;
          this._ref.close(this.newItem);
        });
    } else {
      this._typeDataService.createType(this.newItem).pipe(
        takeUntil(this.__unsubscribe$)).subscribe(data => {
          this.newItem.id = data.id;
          this._ref.close(this.newItem);
        });
    }
  }
}
