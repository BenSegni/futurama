import { Component, Input, OnInit } from '@angular/core';
import { FormLabel } from '../_models/form-label';

@Component({
  selector: 'app-form-label',
  templateUrl: './form-label.component.html',
  styleUrls: ['./form-label.component.scss'],
})
export class FormLabelComponent implements OnInit {
  //just a small helper component to reduce duplication of code. 
  //Pass it the label and validation.
  
  @Input() public config: FormLabel;

  constructor() {}

  ngOnInit(): void {}
}
