import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutePaths } from './_common/_enum/routes.enum';

const routes: Routes = [
  {
    path: RoutePaths.Home,
    loadChildren: () =>
      import('./home-landing/home-landing.module').then(
        (m) => m.HomeLandingModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
