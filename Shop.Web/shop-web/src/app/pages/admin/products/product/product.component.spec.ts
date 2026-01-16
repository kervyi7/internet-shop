import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ProductComponent } from './product.component';
import { ChangeDetectorRef, NO_ERRORS_SCHEMA } from '@angular/core';
import { TypeDataService } from '../../../../services/data/admin-type-data.service';
import { AdminProductDataService } from '../../../../services/data/admin-product-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { NotificationService } from '../../../../services/notification.service';
import { AdminCategoryDataService } from '../../../../services/data/admin-category-data.service';
import { of } from 'rxjs';
import { AppConfigService } from '../../../../services/app-config.service';
import { localizationMock } from '../../../../models/interfaces/localization/localization';
import { HttpClient } from '@angular/common/http';
import { BrandDataService } from '../../../../services/data/admin-brand-data.service';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;
  const adminCategoryDataService = { getAll: () => of([]) };
  const appConfigService = { localization: localizationMock };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductComponent],
      providers: [
        { provide: AdminCategoryDataService, useValue: adminCategoryDataService },
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: (key: string): any => null } } } },
        { provide: NotificationService, useValue: {} },
        { provide: HttpClient, useValue: {} },
        { provide: DialogService, useValue: {} },
        { provide: Router, useValue: {} },
        { provide: AppConfigService, useValue: appConfigService },
        { provide: AdminProductDataService, useValue: {} },
        { provide: TypeDataService, useValue: {} },
        { provide: BrandDataService, useValue: {} },
        { provide: ChangeDetectorRef, useValue: {} }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getCategories, does not call getAll if collection not empty', fakeAsync(() => {
    const service = fixture.debugElement.injector.get(AdminCategoryDataService);
    component.categories.push({ id: 2, code: 'test', name: 'name' });
    spyOn(service, 'getAll').and.returnValue(of([]));
    component.getCategories();
    tick();
    expect(adminCategoryDataService.getAll).toHaveBeenCalledTimes(0);
  }));

  it('getCategories call getAll if collection empty', fakeAsync(() => {
    const service = fixture.debugElement.injector.get(AdminCategoryDataService);
    component.categories = [];
    spyOn(service, 'getAll').and.returnValue(of([]));
    component.getCategories();
    tick();
    expect(service.getAll).toHaveBeenCalledTimes(1);
  }));
});
