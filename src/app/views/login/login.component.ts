import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  credentials: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.createForm();
  }

  private createForm(): void {
    this.credentials = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(12), Validators.pattern('^[0-9 ()+-]+$')]],
      // password: ['', Validators.required, Validators.minLength(9)],
      policy: [false, Validators.requiredTrue]
    });
  }

  submitValues() {
    console.log(this.credentials.value);
  }

}
