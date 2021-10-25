import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeLandingComponent } from './home-landing.component';
import { HomeNavigationComponent } from './home-navigation/home-navigation.component';
import { RouterModule } from '@angular/router';
import { UserModule } from '../user/user.module';
import { HomeVideoComponent } from './home-video/home-video.component';
import { SafePipe } from '../_common/_helpers/_pipes/safe.pipe';
import { RoutePaths } from '../_common/_enum/routes.enum';

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
        path: RoutePaths.Home,
        component: HomeLandingComponent,
        children: [
          {
            path: RoutePaths.Home,
            redirectTo: RoutePaths.Video,
            pathMatch: 'full',
          },
          {
            path: RoutePaths.Video,
            component: HomeVideoComponent,
          },
          {
            path: RoutePaths.Update,
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
