import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageStorageDialogComponent } from './image-storage-dialog.component';

describe('ImageStorageDialogComponent', () => {
  let component: ImageStorageDialogComponent;
  let fixture: ComponentFixture<ImageStorageDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImageStorageDialogComponent]
    });
    fixture = TestBed.createComponent(ImageStorageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
