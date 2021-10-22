import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user/_services/user.service';
import { UserDetailsDirective } from 'src/app/_common/_helpers/user-details.directive';

@Component({
  selector: 'app-home-video',
  templateUrl: './home-video.component.html',
  styleUrls: ['./home-video.component.scss'],
})
export class HomeVideoComponent extends UserDetailsDirective implements OnInit {
  constructor(userService: UserService) {
    super(userService);
  }

  public ngOnInit(): void {
    //get user details with this one method
    this.assignUserState();
  }
}
