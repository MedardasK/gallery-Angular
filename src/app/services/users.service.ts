import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private cookieService: CookieService,
              private httpClient: HttpClient) { }

  async register(username: string, password: string): Promise<void> {
    return this.httpClient.post<{ access_token: string }>('http://localhost:8080/register', { username, password })
      .toPromise()
      .then(() => { });
  }

  isAdmin(): boolean {
    const role = JSON.parse(atob(this.cookieService.get('access_token').split('.')[1])).auth;

    if (role === 'ROLE_ADMIN') {
      return true;
    } else {
      return false;
    }
  }
}
