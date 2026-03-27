import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritesButtonComponent } from './favorites-button.component';

describe('FavoritesButtonComponent', () => {
  let component: FavoritesButtonComponent;
  let fixture: ComponentFixture<FavoritesButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FavoritesButtonComponent]
    });
    fixture = TestBed.createComponent(FavoritesButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
