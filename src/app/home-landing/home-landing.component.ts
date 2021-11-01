import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  InitialLoggedInUserState,
  LoggedInUserState,
  UserState,
} from '../user/_enums/user-state';
import { User } from '../user/_models/user';
import { UserService } from '../user/_services/user.service';
import { SubscriptionDirective } from '../_common/_helpers/subscription.directive';

@Component({
  selector: 'app-home-landing',
  templateUrl: './home-landing.component.html',
  styleUrls: ['./home-landing.component.scss'],
})
export class HomeLandingComponent
  extends SubscriptionDirective
  implements OnInit
{
  public userDetail: User;

  constructor(public userService: UserService) {
    super();
  }

  public ngOnInit(): void {
    this.loadUserDetails();
    this.assignUser();
  }

  private assignUser(): void {
    this.subscribe(
      this.userService.get<User>(UserState.User),
      (user: User) => {
        this.userDetail = user;
        //once dispatch has returned successful, set state from api call
        this.userService.set(LoggedInUserState, this.userDetail);
        this.userService.set(InitialLoggedInUserState, this.userDetail);
      },
      (errors: HttpErrorResponse) => {
        console.log('An Error has occurred', errors.message);
      }
    );
  }

  /**
   * dispatch call for data
   * in this example, we make use of just one
   * api request for the user data
   */
  private loadUserDetails(): void {
    this.dispatchTo(this.userService.getUserDetails());
  }
}
