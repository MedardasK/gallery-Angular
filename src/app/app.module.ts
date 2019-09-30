import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtModule } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';
import { FooterComponent } from './components';
import { MaterialModule } from './material.module';

@NgModule({
    declarations: [
        AppComponent,
        FooterComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
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
              whitelistedDomains: ['localhost:8080'],
              blacklistedRoutes: ['localhost:8080/login']
            }
          })
    ],
    providers: [CookieService],
    bootstrap: [AppComponent],
    entryComponents: []
})
export class AppModule { }
