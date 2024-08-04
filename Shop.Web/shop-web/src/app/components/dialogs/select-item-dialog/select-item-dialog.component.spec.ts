import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectItemDialogComponent } from './select-item-dialog.component';
import { BrandDataService } from '../../../services/data/admin/admin-brand-data.service';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { TypeDataService } from '../../../services/data/admin/admin-type-data.service';
import { localizationMock } from '../../../models/interfaces/localization/localization';
import { AppConfigService } from '../../../services/app-config.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('SelectItemDialogComponent', () => {
  let component: SelectItemDialogComponent;
  let fixture: ComponentFixture<SelectItemDialogComponent>;
  const appConfigService = { localization: localizationMock };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectItemDialogComponent],
      providers: [
        { provide: BrandDataService, useValue: {} },
        { provide: DynamicDialogRef, useValue: {} },
        { provide: DynamicDialogConfig, useValue: { data: { items: null } } },
        { provide: TypeDataService, useValue: {} },
        { provide: AppConfigService, useValue: appConfigService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(SelectItemDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});