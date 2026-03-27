import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImageStorageDialogComponent } from './image-storage-dialog.component';
import { AdminImageDataService } from '../../../services/data/admin/admin-image-data.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfirmationService } from 'primeng/api';
import { ChangeDetectorRef, NO_ERRORS_SCHEMA } from '@angular/core';
import { IGetModelsRequest } from '../../../models/interfaces/get-models-request';
import { of } from 'rxjs';
import { AppConfigService } from '../../../services/app-config.service';
import { localizationMock } from '../../../models/interfaces/localization/localization';

describe('ImageStorageDialogComponent', () => {
  let component: ImageStorageDialogComponent;
  let fixture: ComponentFixture<ImageStorageDialogComponent>;
  const adminImageDataService = { getAll: (params: IGetModelsRequest) => of([]) };
  const appConfigService = { localization: localizationMock };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImageStorageDialogComponent],
      providers: [
        { provide: AdminImageDataService, useValue: adminImageDataService },
        { provide: DynamicDialogRef, useValue: {} },
        { provide: DialogService, useValue: {} },
        { provide: AppConfigService, useValue: appConfigService },
        { provide: ConfirmationService, useValue: {} },
        { provide: ChangeDetectorRef, useValue: {} }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(ImageStorageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
