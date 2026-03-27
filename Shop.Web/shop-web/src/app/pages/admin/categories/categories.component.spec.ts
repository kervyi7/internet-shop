import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoriesComponent } from './categories.component';
import { AdminCategoryDataService } from '../../../services/data/admin/admin-category-data.service';
import { of } from 'rxjs';
import { ChangeDetectorRef, NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { localizationMock } from '../../../models/interfaces/localization/localization';
import { AppConfigService } from '../../../services/app-config.service';

describe('CategoriesComponent', () => {
  let component: CategoriesComponent;
  let fixture: ComponentFixture<CategoriesComponent>;
  const adminCategoryDataService = { getAll: () => of([]) };

  const appConfigService = { localization: localizationMock };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoriesComponent],
      providers: [
        { provide: AdminCategoryDataService, useValue: adminCategoryDataService },
        { provide: Router, useValue: {} }, 
        { provide: AppConfigService, useValue: appConfigService },
        { provide: ChangeDetectorRef, useValue: {} }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(CategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
