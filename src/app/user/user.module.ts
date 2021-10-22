import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user/user.component';
import { UserHeaderComponent } from './user-header/user-header.component';

@NgModule({
  declarations: [UserComponent, UserHeaderComponent],
  imports: [CommonModule],
  exports: [UserComponent],
})
export class UserModule {}
