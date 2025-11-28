import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { SortingType } from 'src/app/models/enums/sorting-types';
import { LabelValueModel } from 'src/app/models/interfaces/filters';
import { IGetModelsRequest } from 'src/app/models/interfaces/get-models-request';

@Component({
  selector: 'shop-pagination-filters',
  templateUrl: './pagination-filters.component.html',
  styleUrls: ['./pagination-filters.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, DropdownModule],
})
export class PaginationFiltersComponent {
  @Input() public isSortingShow: boolean = true;
  @Input() public sortingHeader: string = 'Sort';
  @Input() public sortingConfig: LabelValueModel[] = [];
  @Input() public counterConfig: LabelValueModel[] = [
    { label: '5', value: 5 },
    { label: '10', value: 10 },
    { label: '20', value: 20 },
    { label: '30', value: 30 },
    { label: '40', value: 40 },
    { label: '50', value: 50 },
  ];
  public pagination: IGetModelsRequest = {
    skip: 0,
    count: 5,
    sortBy: SortingType.all,
  };
  @Output() public onChange = new EventEmitter<IGetModelsRequest>();

  public onPaginationFiltersChange(): void {
    if (!this.isSortingShow) {
      this.pagination.sortBy = undefined;
    }
    this.onChange.next(this.pagination);
  }
}
