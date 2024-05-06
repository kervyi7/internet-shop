import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'shop-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {

  constructor(
    private _router: Router) {
  }

  public openCategories() {
    this._router.navigate(['/admin/categories']);
  }

  public openProducts() {
    this._router.navigate(['/admin/products']);
  }
}
