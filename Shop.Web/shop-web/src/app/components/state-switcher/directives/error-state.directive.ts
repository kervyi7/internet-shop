import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[appErrorState]'
})
export class ErrorStateDirective {
  constructor(public templateRef: TemplateRef<unknown>) {}
}
