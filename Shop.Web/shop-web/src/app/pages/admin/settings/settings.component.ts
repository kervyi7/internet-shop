import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BaseCompleteComponent } from '../../../components/base/base-complete.component';
import { Languages } from '../../../models/enums/languages';
import { AppConfigService } from '../../../services/app-config.service';

@Component({
  selector: 'shop-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsComponent extends BaseCompleteComponent implements OnInit {
  public languages: string[] = [];
  public selectedLanguages: string = 'en';

  constructor(private _appConfigService: AppConfigService,
    private _cd: ChangeDetectorRef) {
    super();
  }
  public ngOnInit(): void {
    this.languages = Object.values(Languages);
    if (!localStorage.getItem('language')) {
      this.setDefaultLanguage();
    }
    this.selectedLanguages = localStorage.getItem('language') || Languages.En;
  }

  public save(): void {
    this.setDefaultLanguage();
    this._appConfigService.load();
    this._cd.detectChanges();
  }

  private setDefaultLanguage(): void {
    localStorage.setItem('language', this.selectedLanguages);
  }
}
