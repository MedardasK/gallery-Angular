import { RegisterComponent } from './../../dialogs/register/register.component';
import { AuthService } from './../../services/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private auth: AuthService,
              private router: Router,
              private snackBar: MatSnackBar,
              private dialog: MatDialog) { }

  submitValues(): void {
    if (this.email === '' || this.password === '') {
          return ;
    }
    this.auth.login(this.email, this.password)
    .then(
      () => {
      this.router.navigate(['']);
      this.snackBar.open('You have successfully logged in!', '', {
        duration: 3000
      });
    })
    .catch(() => {
      this.snackBar.open('Email or password incorrect!', '', {
        duration: 3000
      });
    });
  }

  openDialogRegister(): void {
    this.dialog.open(RegisterComponent);
  }

}
