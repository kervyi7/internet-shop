import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from '../../services/auth.service';
import { AuthDataService } from '../../services/data/auth-data.service';
import { AppConfigService } from '../../services/app-config.service';
import { localizationMock } from '../../models/interfaces/localization/localization';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  const appConfigService = { localization: localizationMock };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [
        { provide: AuthDataService, useValue: {} },
        { provide: AuthService, useValue: {} },
        { provide: AppConfigService, useValue: appConfigService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});