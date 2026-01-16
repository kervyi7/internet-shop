import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DefInputComponent } from './def-input.component';
import { FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('DefInputComponent', () => {
  let component: DefInputComponent;
  let fixture: ComponentFixture<DefInputComponent>;
  const group = new UntypedFormGroup({
    userName: new FormControl({ value: '', disabled: true }, Validators.required),
    password: new FormControl({ value: '', disabled: true }, Validators.required),
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DefInputComponent],
      schemas: [NO_ERRORS_SCHEMA]
    });

    fixture = TestBed.createComponent(DefInputComponent);
    component = fixture.componentInstance;
    component.group = group;
    component.fieldCode = 'userName';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
