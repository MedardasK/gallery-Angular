import { GalleryService,
         AuthService } from './services/';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ItemsCountPipe } from './pipes/items-count.pipe';
import { FlexLayoutModule } from '@angular/flex-layout';
import { GalleryComponent,
         LoginComponent,
         PhotoUploadComponent } from './views/';
import { PhotoOneComponent,
         PhotoEditComponent,
         RegisterComponent } from './dialogs';
import { PhotoComponent } from './components';
import { FileUploadDirective } from './directives/file-upload.directive';
import { MatCardModule,
         MatFormFieldModule,
         MatSelectModule,
         MatProgressSpinnerModule,
         MatChipsModule,
         MatButtonModule,
         MatIconModule,
         MatDialogModule,
         MatCheckboxModule,
         MatInputModule,
         MatToolbarModule } from '@angular/material';
import { CookieService } from 'ngx-cookie-service';
import { JwtModule } from '@auth0/angular-jwt';


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
        RegisterComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatIconModule,
        MatDialogModule,
        MatCheckboxModule,
        MatCardModule,
        MatFormFieldModule,
        MatSelectModule,
        FormsModule,
        ReactiveFormsModule,
        MatProgressSpinnerModule,
        MatChipsModule,
        MatButtonModule,
        MatInputModule,
        MatToolbarModule,
        FlexLayoutModule,
        JwtModule.forRoot({
            config: {
              tokenGetter: function  tokenGetter() {
                function getCookie(cname) {
                  const name = cname + '=';
                  const decodedCookie = decodeURIComponent(document.cookie);
                  const ca = decodedCookie.split(';');
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
              whitelistedDomains: ['localhost:8080'],
              blacklistedRoutes: ['http://localhost:8080/login']
            }
          })
    ],
    providers: [GalleryService, AuthService, CookieService],
    bootstrap: [AppComponent],
    entryComponents: [PhotoOneComponent, PhotoComponent, PhotoEditComponent, RegisterComponent]
})
export class AppModule { }