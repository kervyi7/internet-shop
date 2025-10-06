import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateMockPipe } from '@app/testmock/pipes/translate-pipe';

import { DefaultErrorStateComponent } from './default-error-state.component';

describe('DefaultErrorStateComponent', () => {
  let component: DefaultErrorStateComponent;
  let fixture: ComponentFixture<DefaultErrorStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DefaultErrorStateComponent, TranslateMockPipe]
    }).compileComponents();

    fixture = TestBed.createComponent(DefaultErrorStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
