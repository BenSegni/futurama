import { Component, OnInit } from '@angular/core';
import { UserDetailsDirective } from 'src/app/_common/_helpers/user-details.directive';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent extends UserDetailsDirective implements OnInit {

  /**
   * @param userService pass this into the constructor in order to access
   * full functionality of the user details directive
   */
  constructor(userService: UserService) {
    super(userService);
  }

  /**
   * call this.assignUser() to obtain user details
   * we just need this data for display purposes,
   * but where you require altering the state, save User interface
   * as a component variable
   */
  public ngOnInit(): void {
    this.assignUserState();
  }

  
}
