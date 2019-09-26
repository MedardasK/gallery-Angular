import { Component } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  email = '';
  password = '';
  confirmPassword = '';
  policy = '';

  constructor(public dialogRef: MatDialogRef<RegisterComponent>,
              private auth: AuthService,
              private snackBar: MatSnackBar) { }

  onSubmit(): void {
    console.log(this.email);
    console.log(this.password);
    console.log(this.confirmPassword);
    console.log(this.policy);

    // this.auth.register(this.email, this.password)
    //   .then(() => {
    //     this.snackBar.open('Successfully registered! You can login now', '', {
    //       duration: 3000
    //     });
    //   }).catch(() => {
    //     this.snackBar.open('This email is already taken', '', {
    //       duration: 3000
    //     });
    //   }
    //   );
    // return this.dialogRef.close();
  }

  cancel(): void {
    return this.dialogRef.close();
  }

}
