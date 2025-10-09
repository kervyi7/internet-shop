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
  AbstractControl,
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
import { PropertyTypes } from 'src/app/models/enums/property-types';
import {
  CategoryFiltersResponse,
  LabelValueModel,
  ProductFilters,
  PropertyFilter,
} from 'src/app/models/interfaces/filters';
import { CategoryDataService } from 'src/app/services/data/category-data.service';

//TODO: fix any
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
    InputTextModule
  ],
})
export class FiltersListComponent implements OnInit {
  @Input() public categoryName: string;
  public filterForm: FormGroup;
  public filters: CategoryFiltersResponse;

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
    return this.filterForm.get('range') as FormControl<number[]>;
  }

  @Output() public filterApplied = new EventEmitter<ProductFilters>();

  constructor(
    private fb: FormBuilder,
    private categoryDataService: CategoryDataService,
    private cd: ChangeDetectorRef
  ) {}

  public ngOnInit(): void {
    this.loadFilters();
  }

  public loadFilters(): void {
    this.categoryDataService
      .getCategoryFilters(this.categoryName)
      .subscribe((filters) => {
        this.filters = filters;
        this.filterForm = this.fb.group({
          brandsGroup: this.fb.group({
            brands: [[]],
          }),
          typesGroup: this.fb.group({
            types: [[]],
          }),
          range: [[this.filters.minPrice, this.filters.maxPrice]],
          properties: this.fb.array(
            this.filters.properties.map((p) => this.createPropertyControl(p))
          ),
        });
        this.cd.detectChanges();
      });
  }

  public createPropertyControl(p: PropertyFilter): FormGroup {
    switch (p.type) {
      case PropertyTypes.string:
      case PropertyTypes.number:
      case PropertyTypes.bool:
        return this.fb.group({
          name: [p.name],
          type: [p.type],
          values: [[]],
        });
      case PropertyTypes.date:
        return this.fb.group({
          name: [p.name],
          type: [p.type],
          from: [null],
          to: [null],
        });
      default:
        console.warn('Unknown property type', p.type + '' + p.name);
        return this.fb.group({
          name: [p.name],
          type: [p.type ?? 0],
          values: [[]],
        });
    }
  }

  public onCheckboxChange(event: Event, index: number): void {
    const checkbox = event.target as HTMLInputElement;
    const control = this.properties.at(index).get('values') as FormControl;
    const selected = control.value as any[];

    if (checkbox.checked) {
      control.setValue([...selected, checkbox.value]);
    } else {
      control.setValue(selected.filter((v) => v !== checkbox.value));
    }
  }

  public getPropertyOptions(index: number): LabelValueModel[] {
    return this.filters.properties[index].values.map((v) => ({
      label: String(v),
      value: v,
    }));
  }

  public getValuesControl(index: number): FormControl {
    return this.properties.at(index).get('values') as FormControl;
  }

  public isMultiSelect(prop: AbstractControl): boolean {
    const type = prop.get('type')?.value;
    return ['string', 'number', 'bool'].includes(type);
  }

  public isDate(prop: AbstractControl): boolean {
    return prop.get('type')?.value === 'date';
  }

  public onPriceInputChange(event: Event, index: number): void {
    debugger;
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
    this.cd.detectChanges();
  }

  public applyFilters(): void {
    const formValue = this.filterForm.value;
    const [priceFrom, priceTo] = formValue.range || [
      this.filters.minPrice,
      this.filters.maxPrice,
    ];
    const request: ProductFilters = {
      brandIds: ((formValue.brands as any[]) || [])
        .map((b) => (typeof b === 'object' ? b.id : b))
        .filter((b) => !!b),
      typeIds: ((formValue.types as any[]) || [])
        .map((t) => (typeof t === 'object' ? t.id : t))
        .filter((t) => !!t),

      priceFrom,
      priceTo,

      properties: ((formValue.properties as any[]) || [])
        .map((propForm, i) => {
          if (!propForm) return null;
          const p = this.filters.properties[i];
          if (!p) return null;

          switch (p.type) {
            case PropertyTypes.string:
            case PropertyTypes.number:
            case PropertyTypes.bool:
              return (propForm.values || []).length
                ? { name: p.name, type: p.type, values: propForm.values }
                : null;

            case PropertyTypes.date:
              const vals = [];
              if (propForm.from) vals.push(propForm.from);
              if (propForm.to) vals.push(propForm.to);
              return vals.length
                ? { name: p.name, type: p.type, values: vals }
                : null;

            default:
              return null;
          }
        })
        .filter((p) => p != null),
    };

    this.filterApplied.emit(request);
  }

  public resetFilters(): void {
    if (!this.filters) return;

    this.filterForm.reset({
      brands: [],
      types: [],
      range: [this.filters.minPrice, this.filters.maxPrice],
      properties: this.filters.properties.map((p) => {
        if (p.type === PropertyTypes.date) {
          return {
            name: p.name,
            type: p.type,
            from: null as any,
            to: null as any,
          };
        } else {
          return { name: p.name, type: p.type, values: [] as any };
        }
      }),
    });

    this.filterApplied.emit({
      brandIds: [],
      typeIds: [],
      priceFrom: this.filters.minPrice,
      priceTo: this.filters.maxPrice,
      properties: [],
    });

    this.cd.detectChanges();
  }
}
