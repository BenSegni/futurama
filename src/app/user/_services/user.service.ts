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
  constructor(private globalService: GlobalService) {
    super();
  }

  public getUserDetails(): Observable<User> {
    return this.globalService
      .get<User>(this.endpoint())
      .pipe(this.updateState(UserState.User));
  }

  private endpoint(): string {
    let uri: string = ApiConfig.user;

    return uri;
  }
}
