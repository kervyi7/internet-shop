import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { BaseDataService } from "./base-data.service";
import { AppConfigService } from "../app-config.service";
import { ICategory } from "../../models/interfaces/category";

@Injectable({
  providedIn: 'root'
})
export class AdminCategoryDataService extends BaseDataService {
  public baseUrl = 'category';
  public readonly categories: ICategory[] = [
    { id: 1, code: 'telephones', name: 'Telephones', avatar: '' },
    { id: 2, code: 'computers', name: 'Computers', avatar: '' },
    { id: 3, code: 'sport', name: 'Sport', avatar: '' },
    { id: 4, code: 'music', name: 'Music', avatar: '' },
    { id: 5, code: '1346', name: 'Zoo', avatar: '' }
  ];

  constructor(public readonly http: HttpClient,
    appConfigService: AppConfigService) {
    super(appConfigService);
  }

  public getAll(): Observable<ICategory[]> {
    const obs = new Observable<ICategory[]>((sub) => {
      sub.next(this.categories);
      sub.complete();
    });
    return obs;
  }

  public getById(id: number): Observable<ICategory> {
    const obs = new Observable<ICategory>((sub) => {
      const item = this.categories.find(x => x.id === id);
      if (!item) {
        sub.error('not found');
        sub.complete();
      } else {
        sub.next(item);
        sub.complete()
      }
    });
    return obs;
  }
}
