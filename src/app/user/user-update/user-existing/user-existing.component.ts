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

  ngOnInit(): void {
    this.assignOriginalUserState();
  }

}
