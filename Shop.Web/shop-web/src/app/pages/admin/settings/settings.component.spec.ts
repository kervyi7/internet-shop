import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsComponent } from './settings.component';
import { ChangeDetectorRef, NO_ERRORS_SCHEMA } from '@angular/core';
import { AppConfigService } from '../../../services/app-config.service';
import { localizationMock } from '../../../models/interfaces/localization/localization';

describe('SettingsComponent', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;
  const appConfigService = { localization: localizationMock };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SettingsComponent],
      providers: [
        { provide: ChangeDetectorRef, useValue: {} },
        { provide: AppConfigService, useValue: appConfigService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
