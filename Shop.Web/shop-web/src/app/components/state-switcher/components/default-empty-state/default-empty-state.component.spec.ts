import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslateMockPipe } from '@app/testmock/pipes/translate-pipe';
import { DefaultEmptyStateComponent } from './default-empty-state.component';

describe('DefaultEmptyStateComponent', () => {
  let component: DefaultEmptyStateComponent;
  let fixture: ComponentFixture<DefaultEmptyStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DefaultEmptyStateComponent],
      declarations: [TranslateMockPipe]
    }).compileComponents();

    fixture = TestBed.createComponent(DefaultEmptyStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
