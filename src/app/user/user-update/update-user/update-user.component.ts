import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { User } from 'src/app/user/_models/user';
import { UserService } from 'src/app/user/_services/user.service';
import { UserDetailsDirective } from 'src/app/_common/_helpers/user-details.directive';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss'],
})
export class UpdateUserComponent
  extends UserDetailsDirective
  implements OnInit, OnDestroy
{
  public userDetail: User; //define userDetail to update state
  public initialUserDetail: User;
  public userForm: FormGroup;
  private persistUserState: boolean;

  constructor(
    userService: UserService,
    private fb: FormBuilder,
    private router: Router
  ) {
    super(userService);

    //listen for user browser refresh and ensure that we can persist state
    //form values
    this.monitorBrowserRefresh();
  }

  public ngOnInit(): void {
    this.assignOriginalUserState();
    this.assignUserState();
    this.createForm();
    this.maintainUserFormState();
  }

  private createForm(): void {    
    this.userForm = this.fb.group({
      firstName: [null, Validators.required],
      middleNames: [null, Validators.required],
      surName: [null, Validators.required],
      address: [null, Validators.required],
      avatar: [null, Validators.required],
      jobRole: [null, Validators.required],
      highlightReel: [null, Validators.required],
    });

    //take user data and update form with data values
    if (this.userDetail) this.userForm.patchValue(this.userDetail);
  }

  private monitorBrowserRefresh(): void {
    this.router.events
      .pipe(
        filter(
          (response): response is NavigationEnd =>
            response instanceof NavigationEnd
        )
      )
      .subscribe((event) => {
        this.persistUserState =
          event.id === 1 && event.url === event.urlAfterRedirects;
      });
  }

  private maintainUserFormState(): void {
    if (this.persistUserState) {
      //give the component time to obtain
      //user state and then create form to populate fields
      setTimeout(() => {
        this.createForm();
      }, 100);
    }
  }

  public onSubmit(form: FormGroup): void {
    if (!form.valid) return;

    this.userDetail = form.value;

    //update state of the user by using directive method
    this.setLoggedUser();
  }

  public cancel(): void {
    this.userForm.patchValue(this.userDetail);

    this.router.navigate(['video']);
  }
}
