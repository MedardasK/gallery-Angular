import { RegisterComponent } from './../../dialogs/register/register.component';
import { IUser } from './../../models/user.model';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  credentials: FormGroup;
  userCredentials: IUser;

  constructor(private fb: FormBuilder,
              private auth: AuthService,
              private router: Router,
              private snackBar: MatSnackBar,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.createForm();
  }

  private createForm(): void {
    this.credentials = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  submitValues(): void {
    this.userCredentials = this.credentials.value;
    this.auth.login(this.userCredentials.username, this.userCredentials.password)
    .catch(error => {
      console.log(error);
      this.snackBar.open('Email or password incorrect!', '', {
        duration: 3000
      });
    }).then();
    this.router.navigate(['']);
  }

  openDialogRegister(): void {
    this.dialog.open(RegisterComponent);
  }

}
