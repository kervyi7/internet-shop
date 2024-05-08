import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BaseCompleteComponent } from '../../components/base/base-complete.component';

@Component({
  selector: 'shop-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent extends BaseCompleteComponent {

  constructor(
    private _router: Router) {
    super();
  }

  public openCategories() {
    this._router.navigate(['/admin/categories']);
  }

  public openProducts() {
    this._router.navigate(['/admin/products']);
  }
}
