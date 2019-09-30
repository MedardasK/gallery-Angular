import { RegisterComponent } from './../../dialogs/register/register.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService,
         UsersService } from '../../services/';

import { PolicyInputComponent,
         EmailInputComponent,
         PasswordInputComponent,
         ConfirmPasswordInputComponent } from 'src/app/components/custom-input/register-login';
// import {  MustMatchDirective } from './directives';

import { LoginRoutingModule } from './login-routing.module';
import { MaterialModule } from '../../material.module';
import { LoginComponent } from '..';

@NgModule({
  declarations: [
    RegisterComponent,
    EmailInputComponent,
    PasswordInputComponent,
    ConfirmPasswordInputComponent,
    PolicyInputComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    LoginRoutingModule
  ],
  providers: [AuthService, UsersService],
  entryComponents: [RegisterComponent]
})
export class LoginModule { }
