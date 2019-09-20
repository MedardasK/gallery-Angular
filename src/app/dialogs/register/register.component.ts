import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from './../../models/user.model';
import { MustMatch } from '../../helpers/must-match.validator';
import { AuthService } from './../../services/auth.service';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  credentials: FormGroup;
  userCredentials: IUser;

  constructor(public dialogRef: MatDialogRef<RegisterComponent>,
              private fb: FormBuilder,
              private auth: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.createForm();
  }

  private createForm(): void {
    this.credentials = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      policy: [false, Validators.requiredTrue]
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  submitValues() {
    this.userCredentials = this.credentials.value;
    if (this.credentials.invalid) {
      return;
    }
    this.auth.register(this.userCredentials.username, this.userCredentials.password);
    this.dialogRef.close();
  }

  cancel() {
    this.credentials.reset();
    this.dialogRef.close();
  }

}
