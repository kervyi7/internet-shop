import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges } from '@angular/core';
import { IPropertiesGroup, IProperty, IPropertyTemplate } from '../../models/interfaces/property';
import { BaseCompleteComponent } from '../base/base-complete.component';

@Component({
  selector: 'shop-property-filters',
  templateUrl: './property-filters.component.html',
  styleUrls: ['./property-filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PropertyFiltersComponent extends BaseCompleteComponent implements OnChanges {
  @Input() public template: IPropertyTemplate;
  @Input() public properties: IProperty[];
  public groups: IPropertiesGroup[] = [];

  constructor(private _cd: ChangeDetectorRef) {
    super();
  }

  public ngOnChanges(): void {
    if (!this.template) {
      return;
    }
    if (!this.template.extension || !this.template.extension.propertiesGroups) {
      this.template.extension = {
        propertiesGroups: []
      }
      return;
    }
    for (let group of this.template.extension.propertiesGroups) {
      const newGroup: IPropertiesGroup = {
        name: group.name,
        code: group.code,
        propertyCodes: group.propertyCodes,
        properties: this.properties.filter((x) => group.propertyCodes.includes(x.code))
      };
      this.groups.push(newGroup);
    }
    this._cd.detectChanges();
  }
}
