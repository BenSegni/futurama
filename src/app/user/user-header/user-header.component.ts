import { Component, OnInit } from '@angular/core';
import { UserDetailsDirective } from 'src/app/_common/_helpers/user-details.directive';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.scss'],
})
export class UserHeaderComponent
  extends UserDetailsDirective
  implements OnInit
{
  constructor(userService: UserService) {
    super(userService);
  }

  public ngOnInit(): void {
    this.assignUserState();
  }
}
