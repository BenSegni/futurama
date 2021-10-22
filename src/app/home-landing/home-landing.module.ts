import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeLandingComponent } from './home-landing.component';
import { HomeNavigationComponent } from './home-navigation/home-navigation.component';
import { RouterModule } from '@angular/router';
import { UserModule } from '../user/user.module';
import { HomeVideoComponent } from './home-video/home-video.component';
import { SafePipe } from '../_common/_helpers/_pipes/safe.pipe';

@NgModule({
  declarations: [
    HomeLandingComponent,
    HomeNavigationComponent,
    HomeVideoComponent,
    SafePipe,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomeLandingComponent,
        children: [
          {
            path: '',
            redirectTo: 'video',
            pathMatch: 'full',
          },
          {
            path: 'video',
            component: HomeVideoComponent,
          },
          {
            path: 'update',
            loadChildren: () =>
              import('../user/user-update/user-update.module').then(
                (m) => m.UserUpdateModule
              ),
          },
        ],
      },
    ]),
    UserModule,
  ],
})
export class HomeLandingModule {}
