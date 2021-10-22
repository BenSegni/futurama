import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormLabelComponent } from './form-label/form-label.component';

@NgModule({
  declarations: [FormLabelComponent],
  imports: [CommonModule],
  exports: [FormLabelComponent],
})
export class SharedElementsModule {}
