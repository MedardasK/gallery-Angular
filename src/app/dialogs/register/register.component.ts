import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUser } from './../../models/user.model';
import { MustMatch } from '../../helpers/must-match.validator';
import { AuthService } from './../../services/auth.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

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
              private snackBar: MatSnackBar) { }

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

  submitValues(): void {
    this.userCredentials = this.credentials.value;
    if (this.credentials.invalid) {
      return;
    }
    this.auth.register(this.userCredentials.username, this.userCredentials.password)
    .then(() => {
      this.snackBar.open('Successfully registered! You can login now', '', {
        duration: 3000
      });
    }).catch(() =>  {
      this.snackBar.open('This username is already taken', '', {
        duration: 3000
      });
    }
    );
    return this.dialogRef.close();
  }

  cancel(): void {
    this.credentials.reset();
    return this.dialogRef.close();
  }

}
