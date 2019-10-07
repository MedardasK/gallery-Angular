import { UsersService } from './../../services/users.service';
import { Component } from '@angular/core';
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
  policy = false;

  constructor(public dialogRef: MatDialogRef<RegisterComponent>,
              private usersService: UsersService,
              private snackBar: MatSnackBar) { }

  onSubmit(): void {
    this.usersService.register(this.email, this.password)
      .then(() => {
        this.snackBar.open('Successfully registered! You can login now', '', {
          duration: 3000
        });
      }).catch(() => {
        this.snackBar.open('This email is already taken', '', {
          duration: 3000
        });
      }
      );
    return this.dialogRef.close();
  }

  cancel(): void {
    return this.dialogRef.close();
  }

}
