import { Component, OnInit } from '@angular/core';
import { UserDetailsDirective } from 'src/app/_common/_helpers/user-details.directive';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent extends UserDetailsDirective implements OnInit {
  constructor(userService: UserService) {
    super(userService);
  }

  public ngOnInit(): void {
    this.assignUser();
  }

  
}
