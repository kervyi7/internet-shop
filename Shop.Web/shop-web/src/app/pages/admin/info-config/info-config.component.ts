import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Editor } from 'primeng/editor';
import { InfoPage } from 'src/app/models/interfaces/info-pages';
import { InfoPageDataService } from 'src/app/services/data/info-pages-data.service';

@Component({
  selector: 'shop-info-config',
  templateUrl: './info-config.component.html',
  styleUrls: ['./info-config.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoConfigComponent implements OnInit {
  @ViewChild('editorRef') editorRef!: Editor;
  private editorInstance: any;

  public pages: InfoPage[] = [];
  public editMode = false;
  public editedHtml = '';
  public selectedPage: InfoPage | null = null;

  constructor(
    private infoPageDataService: InfoPageDataService,
    private cd: ChangeDetectorRef
  ) {}

  public ngOnInit(): void {
    this.infoPageDataService.getAll().subscribe((p) => {
      this.pages = p;
      this.cd.detectChanges();
    });
  }

  public onEditorInit(event: any) {
    this.editorInstance = event?.editor;
    if (this.editedHtml) {
      this.editorInstance.root.innerHTML = this.editedHtml;
    }
  }

  public edit(page: InfoPage): void {
    this.selectedPage = page;
    this.editMode = true;

    setTimeout(() => {
      this.editedHtml = page.htmlContent || '';
      if (this.editorInstance) {
        this.editorInstance.clipboard.dangerouslyPasteHTML(this.editedHtml);
      }
      this.cd.detectChanges();
    }, 100);
  }

  public cancel(): void {
    this.editMode = false;
    this.selectedPage = null;
    this.editedHtml = '';
  }

  public save(): void {
    if (!this.selectedPage || !this.editorInstance) return;
    const htmlContent = this.editorInstance.root.innerHTML;
    const updated: InfoPage = {
      ...this.selectedPage,
      htmlContent: htmlContent,
    };
    this.infoPageDataService.update(updated).subscribe((updatedPage) => {
      this.selectedPage!.htmlContent = updatedPage.htmlContent;
      this.editMode = false;
      this.selectedPage = null;
      this.cd.detectChanges();
    });
  }
}
