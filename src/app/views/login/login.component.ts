import { IUser } from './../../models/user.model';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Router} from '@angular/router';

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
              private router: Router) { }

  ngOnInit() {
    this.createForm();
  }

  private createForm(): void {
    this.credentials = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      policy: [false, Validators.requiredTrue]
    });
  }

  submitValues() {
    this.userCredentials = this.credentials.value;
    console.log(this.userCredentials);
    this.auth.login(this.userCredentials.username, this.userCredentials.password);
    // jei praeina login
    // redirect i front
    this.router.navigate(['']);
  }

}
