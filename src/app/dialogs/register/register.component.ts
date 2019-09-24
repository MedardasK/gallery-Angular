import { Component, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUser } from './../../models/user.model';
import { MustMatch } from '../../helpers/must-match.validator';
import { AuthService } from './../../services/auth.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnDestroy {

 model: any = {};

  userCredentials: IUser;

  constructor(public dialogRef: MatDialogRef<RegisterComponent>,
              private auth: AuthService,
              private snackBar: MatSnackBar) { }

  // private createForm(): void {
  //   this.credentials = this.fb.group({
  //     username: ['', [Validators.required, Validators.email]],
  //     password: ['', [Validators.required, Validators.minLength(6)]],
  //     confirmPassword: ['', [Validators.required]],
  //     policy: [false, Validators.requiredTrue]
  //   }, {
  //     validator: MustMatch('password', 'confirmPassword')
  //   });
  // }

  onSubmit(form: NgForm): void {
    console.log(form.value.username);
    console.log(form.value.password);
    console.log(form.value.confirmPassword);
    }

  // submitValues(): void {
  //   this.userCredentials = this.credentials.value;
  //   if (this.credentials.invalid) {
  //     return;
  //   }
  //   this.auth.register(this.userCredentials.username, this.userCredentials.password)
  //   .then(() => {
  //     this.snackBar.open('Successfully registered! You can login now', '', {
  //       duration: 3000
  //     });
  //   }).catch(() =>  {
  //     this.snackBar.open('This email is already taken', '', {
  //       duration: 3000
  //     });
  //   }
  //   );
  //   return this.dialogRef.close();
  // }

  cancel(): void {
    this.registerForm.reset();
    return this.dialogRef.close();
  }

  ngOnDestroy(): void {
  }

}
