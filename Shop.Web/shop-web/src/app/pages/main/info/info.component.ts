import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InfoPage } from 'src/app/models/interfaces/info-pages';
import { InfoPageDataService } from 'src/app/services/data/info-pages-data.service';

@Component({
  selector: 'shop-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoComponent implements OnInit {
  public page: InfoPage | null = null;

  constructor(
    private infoPageDataService: InfoPageDataService,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef
  ) {}

  public ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const key = params.get('key');
      if (!key) return;

      this.infoPageDataService.getByKey(key).subscribe((p) => {
        this.page = p;
        this.cd.detectChanges();
      });
    });
  }
}
