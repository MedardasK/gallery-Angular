import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-confirm-password-input',
  template: '<mat-form-field>' +
            '<input required matInput minlength="6" maxlength="20" type="password"' +
            'name="confirmPassword" placeholder="Confirm Password" [(ngModel)]="value">' +
            '<span matPrefix><i class="material-icons">visibility</i></span></mat-form-field>',
  providers: [
    { provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ConfirmPasswordInputComponent),
      multi: true }
  ]
})

export class ConfirmPasswordInputComponent implements ControlValueAccessor {
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
