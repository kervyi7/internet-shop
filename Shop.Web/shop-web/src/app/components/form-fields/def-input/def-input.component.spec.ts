import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefInputComponent } from './def-input.component';

describe('QwpInputComponent', () => {
  let component: DefInputComponent;
  let fixture: ComponentFixture<DefInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DefInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
