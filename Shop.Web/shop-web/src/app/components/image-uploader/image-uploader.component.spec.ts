import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImageUploaderComponent } from './image-uploader.component';
import { AppConfigService } from '../../services/app-config.service';
import { localizationMock } from '../../models/interfaces/localization/localization';

describe('ImageUploaderComponent', () => {
  let component: ImageUploaderComponent;
  let fixture: ComponentFixture<ImageUploaderComponent>;
  const appConfigService = { localization: localizationMock };
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImageUploaderComponent],
      providers: [
        { provide: AppConfigService, useValue: appConfigService }
      ],
    });
    fixture = TestBed.createComponent(ImageUploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
