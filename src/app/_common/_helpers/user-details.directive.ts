import { Directive } from '@angular/core';
import { skipWhile } from 'rxjs/operators';
import { LoggedInUserState } from 'src/app/user/_enums/user-state';
import { User } from 'src/app/user/_models/user';
import { UserService } from 'src/app/user/_services/user.service';
import { SubscriptionDirective } from './subscription.directive';

@Directive({
  selector: '[appUserDetails]',
})
export class UserDetailsDirective extends SubscriptionDirective {
  public userDetail: User;

  constructor(private userService: UserService) {
    super();
  }

  /**
   * this method may be used in many different components, 
   * so extending your component class to this directive 
   * will make for less writing of code to listen for user state
   */

  public assignUser(): void {
    this.subscribe(
      this.userService
        .get<User>(LoggedInUserState)
        .pipe(skipWhile((user) => user === undefined || user === null)),
      (user: User) => {
        this.userDetail = user;
      }
    );
  }

  /**
   * as user service is private, but want to make use of setting LoggedUserState
   * we can call this where the component class has been extended to this directive
   */

  public setLoggedUser():void {
    this.userService.set(LoggedInUserState, this.userDetail);
  }
}
