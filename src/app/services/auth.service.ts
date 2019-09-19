import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authState: boolean;

  constructor( private cookieService: CookieService,
               private httpClient: HttpClient ) { }

  login(username: string, password: string): Promise<void> {
    return this.httpClient.post<{token: string}>('http://localhost:8080/login', {username, password})
    .toPromise()
    .then( res => {
      this.cookieService.set('access_token', res.token);
      this.cookieService.set('roles', JSON.parse(atob(res.token.split('.')[1])).auth);
    });
  }

  async register(username: string, password: string): Promise<void> {
    return this.httpClient.post<{access_token: string}>('http://localhost:8080/register', {username, password})
    .toPromise()
    .then(res => {});
  }

  logout(): void {
    this.cookieService.deleteAll();
  }

  isAdmin(): boolean {
    if (this.cookieService.get('roles') ===  'ROLE_ADMIN') {
      return true;
    } else {
      return false;
    }
  }

  public get loggedIn(): boolean {
    return (this.cookieService.get('access_token') !==  null
    && this.cookieService.get('access_token') !== '');
  }

}
