import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UpdateUserComponent } from './update-user/update-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedElementsModule } from 'src/app/_shared/shared-elements/shared-elements.module';
import { UserExistingComponent } from './user-existing/user-existing.component';
import { RoutePaths } from 'src/app/_common/_enum/routes.enum';

//setting this as a module was not necessary, 
//but just wanted to make a point of how we are able 
//to share state across a range of areas on the app

@NgModule({
  declarations: [UpdateUserComponent, UserExistingComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: RoutePaths.Home,
        component: UpdateUserComponent,
      },
    ]),
    FormsModule,
    ReactiveFormsModule,
    SharedElementsModule
  ],
})
export class UserUpdateModule {}
