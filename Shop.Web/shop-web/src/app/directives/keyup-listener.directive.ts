import { Directive, EventEmitter, HostListener, Input, Output } from "@angular/core";

@Directive({ selector: '[KeyupListener]', standalone: true })

export class KeyupListenerDirective {
  @Input()
  public hotkeyCode: number = 13;
  @Output()
  public hotkey: EventEmitter<void> = new EventEmitter();

  @HostListener('window:keyup', ['$event'])
  public keyEvent(event: KeyboardEvent): void {
    if (this.isHotKey(event)) {
      this.hotkey.next();
    }
  }

  private isHotKey(event: KeyboardEvent): boolean {
    return event.keyCode === this.hotkeyCode;
  }
}