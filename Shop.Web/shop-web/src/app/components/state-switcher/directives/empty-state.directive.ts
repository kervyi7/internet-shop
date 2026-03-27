import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[appEmptyState]'
})
export class EmptyStateDirective {
  constructor(public templateRef: TemplateRef<unknown>) {}
}
