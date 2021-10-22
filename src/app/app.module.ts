import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceHelperDirective } from './_common/_helpers/service-helper.directive';
import { StateManagerDirective } from './_common/_helpers/state-manager.directive';
import { SubscriptionDirective } from './_common/_helpers/subscription.directive';
import { UserDetailsDirective } from './_common/_helpers/user-details.directive';

@NgModule({
  declarations: [
    AppComponent,
    ServiceHelperDirective,
    StateManagerDirective,
    SubscriptionDirective,
    UserDetailsDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
