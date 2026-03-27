import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoConfigComponent } from './info-config.component';

describe('InfoConfigComponent', () => {
  let component: InfoConfigComponent;
  let fixture: ComponentFixture<InfoConfigComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfoConfigComponent]
    });
    fixture = TestBed.createComponent(InfoConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
