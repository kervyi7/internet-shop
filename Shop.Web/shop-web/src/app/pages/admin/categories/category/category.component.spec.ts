import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoryComponent } from './category.component';
import { of } from 'rxjs';
import { localizationMock } from '../../../../models/interfaces/localization/localization';
import { ChangeDetectorRef, NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { AppConfigService } from '../../../../services/app-config.service';
import { AdminCategoryDataService } from '../../../../services/data/admin/admin-category-data.service';
import { NotificationService } from '../../../../services/notification.service';

describe('CategoryComponent', () => {
  let component: CategoryComponent;
  let fixture: ComponentFixture<CategoryComponent>;
  const adminCategoryDataService = { getAll: () => of([]) };
  const appConfigService = { localization: localizationMock };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoryComponent],
      providers: [
        { provide: AdminCategoryDataService, useValue: adminCategoryDataService },
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: (key: string): any => null } } } },
        { provide: DialogService, useValue: {} },
        { provide: Router, useValue: {} },
        { provide: AppConfigService, useValue: appConfigService },
        { provide: NotificationService, useValue: {} },
        { provide: ChangeDetectorRef, useValue: {} }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(CategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

