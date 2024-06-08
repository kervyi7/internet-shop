import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImageEditorComponent } from './image-editor.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { localizationMock } from '../../models/interfaces/localization/localization';
import { AppConfigService } from '../../services/app-config.service';
import { NotificationService } from '../../services/notification.service';

describe('ImageEditorComponent', () => {
  let component: ImageEditorComponent;
  let fixture: ComponentFixture<ImageEditorComponent>;
  const appConfigService = { localization: localizationMock };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImageEditorComponent],
      providers: [
        { provide: DomSanitizer, useValue: {} },
        { provide: DynamicDialogRef, useValue: {} },
        { provide: DynamicDialogConfig, useValue: { data: { imageFile: null } } },
        { provide: NotificationService, useValue: {} },
        { provide: AppConfigService, useValue: appConfigService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(ImageEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});