import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSectionsComponent } from './product-sections.component';

describe('ProductSectionsComponent', () => {
  let component: ProductSectionsComponent;
  let fixture: ComponentFixture<ProductSectionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductSectionsComponent]
    });
    fixture = TestBed.createComponent(ProductSectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
