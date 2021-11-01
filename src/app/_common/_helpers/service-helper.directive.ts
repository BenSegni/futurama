import { Directive } from '@angular/core';
import { StateManagerDirective } from './state-manager.directive';

@Directive({
  selector: '[appServiceHelper]',
})
export class ServiceHelperDirective extends StateManagerDirective {
  //not much in here, but very useful to progressive enhance
  //e.g error handling and query params can be called from here
  // and set within our services
  
  constructor() {
    super();
  }
}
