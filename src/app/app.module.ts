import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ItemsCountPipe } from './pipes/items-count.pipe';
import { PhotoComponent,
         FooterComponent } from './components';
import { FileUploadDirective,
         MustMatchDirective } from './directives';
import { CookieService } from 'ngx-cookie-service';
import { JwtModule } from '@auth0/angular-jwt';
import { GalleryComponent,
         LoginComponent,
         PhotoUploadComponent } from './views/';

import { PhotoOneComponent,
         PhotoEditComponent,
         RegisterComponent,
         TagsCategoriesComponent,
         DeleteConfirmComponent } from './dialogs';

import { EmailInputComponent,
         PasswordInputComponent,
         ConfirmPasswordInputComponent,
         PolicyInputComponent } from './components/custom-input/register-login';
import { DescriptionInputComponent,
         NameInputComponent } from './components/custom-input/upload-edit';
import { GalleryService,
  AuthService } from './services/';

import { MaterialModule } from './material.module';


@NgModule({
    declarations: [
        AppComponent,
        GalleryComponent,
        PhotoComponent,
        PhotoOneComponent,
        ItemsCountPipe,
        PhotoUploadComponent,
        PhotoEditComponent,
        LoginComponent,
        FileUploadDirective,
        RegisterComponent,
        TagsCategoriesComponent,
        FooterComponent,
        DeleteConfirmComponent,
        MustMatchDirective,
        EmailInputComponent,
        PasswordInputComponent,
        ConfirmPasswordInputComponent,
        DescriptionInputComponent,
        NameInputComponent,
        PolicyInputComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        JwtModule.forRoot({
            config: {
              tokenGetter: function  tokenGetter() {
                function getCookie(cname: string) {
                  const name = cname + '=';
                  const decodedCookie = decodeURIComponent(document.cookie);
                  const ca = decodedCookie.split(';');
                  // tslint:disable-next-line:prefer-for-of
                  for (let i = 0; i < ca.length; i++) {
                    let c = ca[i];
                    while (c.charAt(0) === ' ') {
                      c = c.substring(1);
                    }
                    if (c.indexOf(name) === 0) {
                      return c.substring(name.length, c.length);
                    }
                  }
                  return '';
                }
                return getCookie('access_token');
                  },
              whitelistedDomains: ['http://localhost:8080'],
              blacklistedRoutes: ['http://localhost:8080/login']
            }
          })
    ],
    providers: [GalleryService, AuthService, CookieService],
    bootstrap: [AppComponent],
    entryComponents: [PhotoOneComponent, PhotoComponent, PhotoEditComponent, RegisterComponent,
                      TagsCategoriesComponent, DeleteConfirmComponent]
})
export class AppModule { }
