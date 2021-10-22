import { Component, OnInit } from '@angular/core';
import { UserDetailsDirective } from 'src/app/_common/_helpers/user-details.directive';
import { UserService } from '../../_services/user.service';

@Component({
  selector: 'app-user-existing',
  templateUrl: './user-existing.component.html',
  styleUrls: ['./user-existing.component.scss']
})
export class UserExistingComponent extends UserDetailsDirective implements OnInit {

  constructor(userService: UserService) {
    super(userService);
  }

  /**
   * this component is in place to indicate
   * how we can set multiple states of the same data
   * we can persist with initial state, but set other state
   * types to manipulate in the DOM
   */

  ngOnInit(): void {
    this.assignOriginalUserState();
  }

}
