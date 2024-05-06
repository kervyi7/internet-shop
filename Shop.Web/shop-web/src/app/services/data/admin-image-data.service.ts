import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { BaseDataService } from "./base-data.service";
import { AppConfigService } from "../app-config.service";
import { IImage } from "../../models/interfaces/image";

@Injectable({
  providedIn: 'root'
})
export class AdminImageDataService extends BaseDataService {
  public baseUrl = 'adminImage';

  constructor(public readonly http: HttpClient,
    appConfigService: AppConfigService) {
    super(appConfigService);
  }

  public getAll(): Observable<IImage[]> {
    return this.http.get<IImage[]>(this.getUrl(), this.defaultHttpOptions);
  }

  public create(category: IImage): Observable<void> {
    return this.http.post<void>(this.getUrl(), category, this.defaultHttpOptions);
  }

  public edit(image: IImage): Observable<IImage> {
    return this.http.put<IImage>(this.getUrl(), image, this.defaultHttpOptions);
  }

  public delete(id: number): Observable<void> {
    return this.http.delete<void>(this.getUrlById(id), this.defaultHttpOptions);
  }
}
