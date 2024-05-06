import { Component, OnInit } from '@angular/core';
import { ICodeName } from '../../../models/interfaces/base/code-name';
import { UtilityDataService } from '../../../services/data/utility-data.service';
import { takeUntil } from 'rxjs';
import { BaseCompleteComponent } from '../../base/base-complete.component';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ProductItems } from '../../../models/enums/product-items';

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
    private _utilityDataService: UtilityDataService,
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
      this._utilityDataService.createBrand(this.newItem).pipe(
        takeUntil(this.__unsubscribe$)).subscribe(data => {
          this.newItem.id = data.id;
          this._ref.close(this.newItem);
        });
    } else {
      this._utilityDataService.createType(this.newItem).pipe(
        takeUntil(this.__unsubscribe$)).subscribe(data => {
          this.newItem.id = data.id;
          this._ref.close(this.newItem);
        });
    }
  }
}
