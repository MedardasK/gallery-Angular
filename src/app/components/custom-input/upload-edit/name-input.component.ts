import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-name-input',
  template: '<mat-form-field><input required matInput minlength="5" maxlength="30" placeholder="Email" [(ngModel)]="value">' +
   '<span matPrefix><i class="material-icons">mail_outline</i></span> </mat-form-field>',
  providers: [
    { provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NameInputComponent),
      multi: true }
  ]
})

export class NameInputComponent implements ControlValueAccessor {
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
  setDisabledState(isDisabled: boolean): void {
    // const div = this.textarea.nativeElement;
    // const action = isDisabled ? 'addClass' : 'removeClass';
    // this.renderer[action](div, 'disabled');
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
