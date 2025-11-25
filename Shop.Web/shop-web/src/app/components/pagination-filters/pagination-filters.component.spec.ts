import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationFiltersComponent } from './pagination-filters.component';

describe('PaginationFiltersComponent', () => {
  let component: PaginationFiltersComponent;
  let fixture: ComponentFixture<PaginationFiltersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaginationFiltersComponent]
    });
    fixture = TestBed.createComponent(PaginationFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
