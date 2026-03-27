import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[appLoadingState]'
})
export class LoadingStateDirective {
  constructor(public templateRef: TemplateRef<unknown>) {}
}
