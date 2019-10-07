import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-email-input',
  templateUrl: './email-input.component.html',
  styleUrls: ['./icon-style.component.scss'],
  providers: [
    { provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EmailInputComponent),
      multi: true }
  ]
})

export class EmailInputComponent implements ControlValueAccessor {
  val = '';
  writeValue(value: any): void {
    this.value = value;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  constructor() { }

  onChange: any = () => { };
  onTouch: any = () => { };
  set value(val) {
    this.val = val;
    this.onChange(val);
    this.onTouch(val);
  }
}
