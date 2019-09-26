import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authState: boolean;

  constructor(private cookieService: CookieService,
              private httpClient: HttpClient) { }

  async login(username: string, password: string): Promise<void> {
    return this.httpClient.post<{ token: string }>('http://localhost:8080/login', { username, password })
      .toPromise()
      .then(res => {
        this.cookieService.set('access_token', res.token);
      });
  }

  async register(username: string, password: string): Promise<void> {
    return this.httpClient.post<{ access_token: string }>('http://localhost:8080/register', { username, password })
      .toPromise()
      .then(res => { });
  }

  logout(): void {
    this.cookieService.deleteAll();
  }

  isAdmin(): boolean {
    let role = atob(this.cookieService.get('access_token').split('.')[1]);
    role = role.substring(35, 45);
    console.log(role);

    if (role === 'ROLE_ADMIN') {
      return true;
    } else {
      return false;
    }
  }

  public get loggedIn(): boolean {
    return (this.cookieService.get('access_token') !== null
      && this.cookieService.get('access_token') !== '');
  }

}
