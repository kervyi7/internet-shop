import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultLoadingStateComponent } from './default-loading-state.component';

describe('DefaultLoadingStateComponent', () => {
  let component: DefaultLoadingStateComponent;
  let fixture: ComponentFixture<DefaultLoadingStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DefaultLoadingStateComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(DefaultLoadingStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
