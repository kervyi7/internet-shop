import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefButtonComponent } from './def-button.component';

describe('QwpButtonComponent', () => {
  let component: DefButtonComponent;
  let fixture: ComponentFixture<DefButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DefButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
