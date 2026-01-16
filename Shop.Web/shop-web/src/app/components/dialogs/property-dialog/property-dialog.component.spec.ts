import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { IGetModelsRequest } from '../../../models/interfaces/get-models-request';
import { of } from 'rxjs';
import { localizationMock } from '../../../models/interfaces/localization/localization';
import { PropertyDialogComponent } from './property-dialog.component';
import { AdminProductDataService } from '../../../services/data/admin-product-data.service';
import { NotificationService } from '../../../services/notification.service';
import { AppConfigService } from '../../../services/app-config.service';

describe('PropertyDialogComponent', () => {
  let component: PropertyDialogComponent;
  let fixture: ComponentFixture<PropertyDialogComponent>;
  const adminProductService = { getAll: (params: IGetModelsRequest) => of([]) };
  const appConfigService = { localization: localizationMock };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PropertyDialogComponent],
      providers: [
        { provide: AdminProductDataService, useValue: adminProductService },
        { provide: DynamicDialogRef, useValue: {} },
        { provide: DynamicDialogConfig, useValue: { data: {id: 2} } },
        { provide: AppConfigService, useValue: appConfigService },
        { provide: NotificationService, useValue: {} }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(PropertyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
