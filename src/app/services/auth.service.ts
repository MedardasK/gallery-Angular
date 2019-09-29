import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private cookieService: CookieService,
              private httpClient: HttpClient) { }

  async login(username: string, password: string): Promise<void> {
    return this.httpClient.post<{ token: string }>('http://localhost:8080/login', { username, password })
      .toPromise()
      .then(res => {
        this.cookieService.set('access_token', res.token);
      });
  }

  async refresh_token(cookie: string, username: string): Promise<void> {
    return this.httpClient.post<{ token: string }>('http://localhost:8080/refresh-token', { cookie, username })
    .toPromise()
    .then(res => {
      this.cookieService.set('access_token', res.token);
    });
  }

  logout(): void {
    this.cookieService.deleteAll();
  }

  public get loggedIn(): boolean {
    const cookie = this.cookieService.get('access_token');
    if (cookie !== null && cookie !== '') {
      const currentTimeSeconds = new Date().getTime() / 1000;
      const cookieExpirationTimeSeconds = JSON.parse(atob(cookie.split('.')[1])).exp;
      if (currentTimeSeconds + 300 < cookieExpirationTimeSeconds) {
        return true;
      } else if (currentTimeSeconds < cookieExpirationTimeSeconds) {
        const username = JSON.parse(atob(cookie.split('.')[1])).sub;
        this.refresh_token(cookie, username);
        return true;
      } else {
        this.cookieService.deleteAll();
        return false;
      }
    } else {
      return false;
    }
  }

}
