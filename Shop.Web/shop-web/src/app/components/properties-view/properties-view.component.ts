import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {
  IPropertyTemplate,
  IProperty,
  IPropertiesGroup,
} from 'src/app/models/interfaces/property';

@Component({
  selector: 'shop-properties-view',
  templateUrl: './properties-view.component.html',
  styleUrls: ['./properties-view.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class PropertiesViewComponent implements OnInit {
  @Input() public template: IPropertyTemplate;
  @Input() public properties: IProperty[] = [];

  public groups: IPropertiesGroup[] = [];

  public ngOnInit(): void {
    if (!this.template?.extension?.propertiesGroups) return;

    for (let group of this.template.extension.propertiesGroups) {
      const newGroup: IPropertiesGroup = {
        name: group.name,
        code: group.code,
        propertyCodes: group.propertyCodes,
        properties: this.properties.filter((p) =>
          group.propertyCodes.includes(p.code)
        ),
      };
      this.groups.push(newGroup);
    }
  }
}
