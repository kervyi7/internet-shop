import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountedWidgetComponent } from './discounted-widget.component';

describe('DiscountedWidgetComponent', () => {
  let component: DiscountedWidgetComponent;
  let fixture: ComponentFixture<DiscountedWidgetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DiscountedWidgetComponent]
    });
    fixture = TestBed.createComponent(DiscountedWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
