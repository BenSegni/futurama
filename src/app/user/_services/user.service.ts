import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiConfig } from 'src/app/_common/_global_services/api.enum';
import { GlobalService } from 'src/app/_common/_global_services/global.service';
import { ServiceHelperDirective } from 'src/app/_common/_helpers/service-helper.directive';
import { UserState } from '../_enums/user-state';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService extends ServiceHelperDirective {
  /**
   *
   * @param globalService handles httpClient and CRUD api calls GET, PUT, POST, DELETE
   * this extends subscription directive which in turn extends state manager directive
   */
  constructor(private globalService: GlobalService) {
    super();
  }

  /**
   *
   * @returns observable from endpoint
   * this can be extended further to make use of
   * mappers
   */

  public getUserDetails(): Observable<User> {
    return this.globalService
      .get<User>(this.endpoint())
      .pipe(
        this.updateState(UserState.User),
        // this.updateState(UserState.initialUserState)
      );
  }

  /**
   *
   * @returns a string path using the api config e.g http:localhost:4200 + the unique endpoint
   */

  private endpoint(): string {
    let uri: string = ApiConfig.user;

    return uri;
  }
}
