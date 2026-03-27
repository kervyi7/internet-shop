import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { SliderModule } from 'primeng/slider';
import {
  CategoryFiltersResponse,
  LabelValueModel,
  ProductFilters,
  PropertyFilter,
} from 'src/app/models/interfaces/filters';
import { CategoryDataService } from 'src/app/services/data/category-data.service';

@Component({
  selector: 'shop-filters-list',
  templateUrl: './filters-list.component.html',
  styleUrls: ['./filters-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    ReactiveFormsModule,
    CalendarModule,
    MultiSelectModule,
    SliderModule,
    CheckboxModule,
    InputTextModule,
  ],
})
export class FiltersListComponent implements OnInit {
  @Input() public categoryName: string = '';
  @Output() public filterApplied = new EventEmitter<ProductFilters>();
  @Output() public reset = new EventEmitter();

  public filters!: CategoryFiltersResponse;

  public filterForm: FormGroup = this.fb.group({
    brands: [[]],
    types: [[]],
    range: [[0, 0]],
    properties: this.fb.array([]),
  });

  constructor(
    private fb: FormBuilder,
    private categoryDataService: CategoryDataService,
    private cd: ChangeDetectorRef
  ) {}

  public ngOnInit(): void {
    this.loadFilters();
  }

  public get properties(): FormArray {
    return this.filterForm.get('properties') as FormArray;
  }

  public get brandControl(): FormControl {
    return this.filterForm.get('brands') as FormControl;
  }

  public get typesControl(): FormControl {
    return this.filterForm.get('types') as FormControl;
  }

  public get rangeControl(): FormControl {
    return this.filterForm.get('range') as FormControl;
  }

  public loadFilters(): void {
    this.categoryDataService.getCategoryFilters(this.categoryName).subscribe({
      next: (filters) => {
        this.filters = filters;
        this.filterForm.patchValue({
          brands: [],
          types: [],
          range: [this.filters.minPrice, this.filters.maxPrice],
        });
        const propsArray = this.fb.array(
          this.filters.properties.map((p) => this.createPropertyControl(p))
        );
        this.filterForm.setControl('properties', propsArray);
        this.cd.markForCheck();
      },
    });
  }

  private createPropertyControl(p: PropertyFilter): FormGroup {
    return this.fb.group({
      name: [p.name],
      type: [p.type],
      values: [[]],
    });
  }

  public getPropertyOptions(index: number): LabelValueModel[] {
    return (
      this.filters?.properties[index]?.values.map((v) => ({
        label: String(v),
        value: v,
      })) || []
    );
  }

  public getValuesControl(index: number): FormControl {
    return this.properties.at(index).get('values') as FormControl;
  }

  public onPriceInputChange(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    let value = Number(input.value);
    const range = [...(this.rangeControl.value || [0, 0])];

    if (isNaN(value)) return;

    if (index === 0) {
      value = Math.min(value, range[1]);
      value = Math.max(value, this.filters.minPrice);
    } else {
      value = Math.max(value, range[0]);
      value = Math.min(value, this.filters.maxPrice);
    }

    range[index] = value;
    this.rangeControl.setValue(range);
    this.cd.markForCheck();
  }

  public applyFilters(): void {
    const fv = this.filterForm.value;

    const priceRange: number[] = fv.range || [
      this.filters.minPrice,
      this.filters.maxPrice,
    ];

    const request: ProductFilters = {
      brandIds: (fv.brands || [])
        .map((b: any) => (typeof b === 'object' ? b.id : b))
        .filter(Boolean),
      typeIds: (fv.types || [])
        .map((t: any) => (typeof t === 'object' ? t.id : t))
        .filter(Boolean),
      priceFrom: priceRange[0],
      priceTo: priceRange[1],
      properties: this.propertiesToFilters(fv.properties || []),
    };

    this.filterApplied.emit(request);
    this.cd.markForCheck();
  }

  private propertiesToFilters(propForms: any[]): PropertyFilter[] {
    if (!this.filters?.properties) return [];

    return propForms
      .map((pf, i) => {
        const original = this.filters.properties[i];
        if (!original) return null;
        const vals = pf.values || [];
        if (!vals.length) return null;
        return { name: original.name, type: original.type, values: vals };
      })
      .filter((p) => p != null) as PropertyFilter[];
  }

  public resetFilters(): void {
    if (!this.filters) return;

    const propsArray = this.fb.array(
      this.filters.properties.map((p) => this.createPropertyControl(p))
    );
    this.filterForm.setControl('properties', propsArray);

    this.filterForm.patchValue({
      brands: [],
      types: [],
      range: [this.filters.minPrice, this.filters.maxPrice],
    });

    this.filterApplied.emit({
      brandIds: [],
      typeIds: [],
      priceFrom: this.filters.minPrice,
      priceTo: this.filters.maxPrice,
      properties: [],
    });
    this.reset.emit();

    this.cd.markForCheck();
  }
}
