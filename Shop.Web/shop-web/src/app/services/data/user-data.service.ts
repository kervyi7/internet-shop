import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  User,
  UpdateUser,
  ChangePassword,
} from 'src/app/models/interfaces/user';
import { BaseDataService } from './base-data.service';
import { AppConfigService } from '../app-config.service';

@Injectable({ providedIn: 'root' })
export class UserDataService extends BaseDataService {
  public baseUrl = 'user';

  constructor(
    public readonly http: HttpClient,
    private _appConfigService: AppConfigService
  ) {
    super(_appConfigService);
  }

  public getUser(id: string): Observable<User> {
    return this.http.get<User>(this.getUrl(id), this.defaultHttpOptions);
  }

  public updateUser(id: string, model: UpdateUser): Observable<void> {
    return this.http.put<void>(this.getUrl(id), model, this.defaultHttpOptions);
  }

  public changePassword(model: ChangePassword): Observable<void> {
    return this.http.post<void>(
      this.getUrl('change-password'),
      model,
      this.defaultHttpOptions
    );
  }
}
