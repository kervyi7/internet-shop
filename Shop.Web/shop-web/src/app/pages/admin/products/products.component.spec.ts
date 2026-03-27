import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductsComponent } from './products.component';
import { ChangeDetectorRef, NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { AppConfigService } from '../../../services/app-config.service';
import { AdminProductDataService } from '../../../services/data/admin/admin-product-data.service';
import { localizationMock } from '../../../models/interfaces/localization/localization';
import { of } from 'rxjs';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  const adminProductDataService = { getAll: () => of([]) };
  const appConfigService = { localization: localizationMock };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductsComponent],
      providers: [
        { provide: AdminProductDataService, useValue: adminProductDataService },
        { provide: ChangeDetectorRef, useValue: {} },
        { provide: Router, useValue: {} },
        { provide: AppConfigService, useValue: appConfigService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});