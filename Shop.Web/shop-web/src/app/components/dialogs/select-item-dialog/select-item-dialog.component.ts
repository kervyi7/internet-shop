import { Component, OnInit } from '@angular/core';
import { ICodeName } from '../../../models/interfaces/base/code-name';
import { takeUntil } from 'rxjs';
import { BaseCompleteComponent } from '../../base/base-complete.component';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ProductItems } from '../../../models/enums/product-items';
import { BrandDataService } from '../../../services/data/admin/admin-brand-data.service';
import { TypeDataService } from '../../../services/data/admin/admin-type-data.service';

@Component({
  selector: 'shop-select-item-dialog',
  templateUrl: './select-item-dialog.component.html',
  styleUrls: ['./select-item-dialog.component.scss']
})
export class SelectItemDialogComponent extends BaseCompleteComponent implements OnInit {
  public newItem: ICodeName = { name: '', code: '' };
  public isValidName: boolean = true;
  public isValidCode: boolean = true;

  constructor(private _ref: DynamicDialogRef,
    private _refConfig: DynamicDialogConfig) {
    super();
  }

  public ngOnInit(): void {
    const data = this._refConfig.data;
    if (data) {
      this.newItem.name = data.items.name;
      this.newItem.code = data.items.code;
    }
  }

  public addItem(): void {
    this._ref.close(this.newItem);
  }
}
