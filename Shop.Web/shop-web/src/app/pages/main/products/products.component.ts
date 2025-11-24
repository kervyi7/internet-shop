import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { ProductDataService } from '../../../services/data/product-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from '../../../models/interfaces/product';
import { BaseCompleteComponent } from '../../../components/base/base-complete.component';
import { MenuItem } from 'primeng/api';
import { takeUntil } from 'rxjs';
import { IPageData } from '../../../models/interfaces/page-data';
import { PaginatorState } from 'primeng/paginator';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import {
  ProductFilters,
  ProductRequest,
} from 'src/app/models/interfaces/filters';
import { IGetModelsRequest } from 'src/app/models/interfaces/get-models-request';
import { ScreenSizes } from 'src/app/models/enums/screen-sizes';
import { ScreenService } from 'src/app/services/screen.service';
import { Routes } from 'src/app/models/enums/routes';

@Component({
  selector: 'shop-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('openClose', [
      state(
        'open',
        style({
          left: '0',
        })
      ),
      state(
        'closed',
        style({
          left: '-320px',
        })
      ),
      transition('open <=> closed', [animate('0.25s')]),
    ]),
  ],
})
export class ProductsComponent extends BaseCompleteComponent implements OnInit {
  private _filters: ProductFilters;
  public isMobile: boolean = false;
  public category: string;
  public products: IProduct[];
  public isFiltersOpen = false;
  public breadcrumbItems: MenuItem[];
  public pagination: IGetModelsRequest = {
    skip: 0,
    count: 10,
    sortBy: 'date_desc',
  };
  public total = 0;
  public isRowsView: boolean = false;
  public countOptions = [
    { label: 10, value: 10 },
    { label: 20, value: 20 },
    { label: 30, value: 30 },
    { label: 40, value: 40 },
    { label: 50, value: 50 },
  ];
  public sortBy = [
    { label: 'Price: High to Low', value: 'price_desc' },
    { label: 'Price: Low to High', value: 'price_asc' },
    { label: 'Date: Oldest First', value: 'date_asc' },
    { label: 'Date: Newest First', value: 'date_desc' },
  ];

  constructor(
    private _productDataService: ProductDataService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _cd: ChangeDetectorRef,
    private _screenService: ScreenService
  ) {
    super();
  }

  public ngOnInit(): void { //Inicjalizacja komponentu
    this.category = this._activatedRoute.snapshot.paramMap.get('category')!; // Pobranie kategorii z parametrów ścieżki
    if (!this.category) {
      this._router.navigate([Routes.notFound]); // Jeśli kategoria nie istnieje, przekierowanie na stronę błędu 404
    }
    this.breadcrumbItems = [
      { label: this.category, routerLink: `/${this.category}` },
    ]; // Inicjalizacja ścieżki nawigacyjnej (breadcrumb)
    this.loadProductList(); // Wczytanie listy produktów dla danej kategorii
    this.isMobile = this._screenService.isMobile(); // Sprawdzenie, czy użytkownik korzysta z urządzenia mobilnego
    this._screenService.screenSize$.subscribe((size) => {  // Subskrypcja zmian rozmiaru ekranu
      this.isMobile = size === ScreenSizes.Mobile;
      this._cd.detectChanges(); // Ręczne odświeżenie widoku (strategia OnPush)
    });
  }

  public changeProductsView(): void { // Przełączenie sposobu prezentacji produktów (siatka ↔ lista)
    this.isRowsView = !this.isRowsView;
  }

  public onCountChange(): void { // Zmiana liczby produktów wyświetlanych na stronie — resetuje paginację i ładuje dane od początku
    this.pagination.skip = 0;
    this.loadProductList();
  }

  public changeFiltersMenuState(): void { // Otwieranie / zamykanie panelu filtrów produktów
    this.isFiltersOpen = !this.isFiltersOpen;
  }

  public onPageChange(event: PaginatorState): void { // Obsługa zmiany strony w komponencie paginacji
    this.pagination = {
      skip: event.first,
      count: event.rows,
    };
    this.loadProductList();
  }

  public onSortingChange(): void { // Zmiana sposobu sortowania — np. według ceny lub nazwy produktu
    this.pagination.skip = 0;
    this.loadProductList();
  }
  
  public updateFilters(filters: ProductFilters): void { // Aktualizacja zestawu filtrów i ponowne załadowanie danych
    this._filters = filters;
    this.loadProductList();
    this.changeFiltersMenuState();
  }
  
  private loadProductList(): void { // Metoda prywatna odpowiedzialna za pobranie danych z serwisu API.
    const params: ProductRequest = { ...this.pagination, ...this._filters, };
    // Asynchroniczne pobranie listy produktów z API według kategorii
    this._productDataService
      .getByCategory(this.category, params)
      .pipe(takeUntil(this.__unsubscribe$)) // zakończenie subskrypcji przy zniszczeniu komponentu
      .subscribe((data: IPageData<IProduct[]>) => {
        this.total = data.count; // Przypisanie danych z odpowiedzi do właściwości komponentu
        this.products = data.data;
        this._cd.detectChanges(); // Ręczne odświeżenie widoku (strategia OnPush)
      });
  }
}
