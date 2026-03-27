import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Editor, EditorInitEvent, EditorModule } from 'primeng/editor';
import Quill from 'quill';

@Component({
  selector: 'shop-html-editor',
  templateUrl: './html-editor.component.html',
  styleUrls: ['./html-editor.component.scss'],
  standalone: true,
  imports: [EditorModule],
})
export class HtmlEditorComponent implements OnChanges {
  @ViewChild('editorRef') editorRef!: Editor;
  @Input() public htmlContent: string = '';
  private editorInstance: Quill;
  public editedHtml = '';
  @Output() public change: EventEmitter<Quill> = new EventEmitter();

  constructor(private cd: ChangeDetectorRef) {}

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['htmlContent']) {
      this.setData();
    }
  }

  public onEditorInit(event: EditorInitEvent) {
    this.editorInstance = event?.editor;
    if (this.editedHtml) {
      this.editorInstance.root.innerHTML = this.editedHtml;
    }
  }

  public onChange(): void {
    this.change.next(this.editorInstance);
  }

  private setData(): void {
    setTimeout(() => {
      this.editedHtml = this.htmlContent || '';
      if (this.editorInstance) {
        this.editorInstance.clipboard.dangerouslyPasteHTML(this.editedHtml);
      }
      this.cd.detectChanges();
    }, 100);
  }
}
