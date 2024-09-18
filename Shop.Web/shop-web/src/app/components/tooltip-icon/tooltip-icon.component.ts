import { Component, Input } from '@angular/core';

@Component({
  selector: 'shop-tooltip-icon',
  templateUrl: './tooltip-icon.component.html',
  styleUrls: ['./tooltip-icon.component.scss']
})
export class TooltipIconComponent {
  @Input() text: string;
}
