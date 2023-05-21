import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginApi = 'http://25.6.194.168:8080/api/auth/signin';
  readonly TOKEN_NAME = 'auth';

  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this._isLoggedIn$.asObservable();

  get token(): any {
    return localStorage.getItem(this.TOKEN_NAME);
  }

  constructor(private http: HttpClient) {
    this._isLoggedIn$.next(!!this.token);
  }

  login(username: string, password: string) {
    return this.http.post(this.loginApi, { username, password }).pipe(
      tap((response: any) => {
        localStorage.setItem(this.TOKEN_NAME, response.accessToken);
        localStorage.setItem('username', response.user.username);
        localStorage.setItem('name', response.user.name);
        localStorage.setItem('role', JSON.parse(atob(response.accessToken.split('.')[1])).role[0].name);
        this._isLoggedIn$.next(true);
      })
    )
  }
}
