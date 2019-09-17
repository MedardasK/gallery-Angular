import { RegisterComponent } from './../../dialogs/register/register.component';
import { IUser } from './../../models/user.model';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

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
    .catch(() => {this.router.navigate(['/login']); } );
    this.router.navigate(['']);
  }

  openDialogRegister(): void {
    this.dialog.open(RegisterComponent);
  }

}
