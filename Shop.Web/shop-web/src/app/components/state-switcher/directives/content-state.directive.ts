import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[appContentState]'
})
export class ContentStateDirective {
  constructor(public templateRef: TemplateRef<unknown>) {}
}
