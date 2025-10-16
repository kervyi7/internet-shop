import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Editor } from 'primeng/editor';
import { Util } from 'src/app/common/util';
import {
  InfoPage
} from 'src/app/models/interfaces/info-pages';
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
  public contactForm!: FormGroup;

  constructor(
    private infoPageDataService: InfoPageDataService,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef
  ) {}

  public ngOnInit(): void {
    this.loadPages();
    this.createContactForm();
    this.loadContacts();
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

  public cancelEditPage(): void {
    this.editMode = false;
    this.selectedPage = null;
    this.editedHtml = '';
  }

  public savePage(): void {
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

  public saveContacts(): void {
    if (this.contactForm.invalid) {
      Util.markAllAsDirty(this.contactForm);
    }
    this.infoPageDataService
      .updateContacts(this.contactForm.value)
      .subscribe(() => {
        alert('Contacts saved successfully!');
      });
  }

  private createContactForm(): void {
    this.contactForm = this.fb.group({
      email: ['', [Validators.email]],
      phone: [''],
      address: [''],
      instagram: [''],
      github: [''],
      facebook: [''],
      discord: [''],
      linkedin: [''],
      pinterest: [''],
      reddit: [''],
      telegram: [''],
      youtube: [''],
      twitch: [''],
      twitter: [''],
    });
  }

  private loadPages(): void {
    this.infoPageDataService.getAll().subscribe((p) => {
      this.pages = p;
      this.cd.detectChanges();
    });
  }

  private loadContacts(): void {
    this.infoPageDataService.getContacts().subscribe((data) => {
      this.contactForm.patchValue(data);
      this.cd.detectChanges();
    });
  }
}
