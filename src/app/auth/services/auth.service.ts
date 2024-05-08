import { computed, inject, Injectable, signal } from '@angular/core';
import { enviroments } from '../../../environments/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { AuthStatus, CheckTokenResponse, LoginResponse, User } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly baseURL: string = enviroments.baseURL;
  private http = inject(HttpClient);

  private _curretUser = signal<User | null>(null);
  private _authStatus = signal<AuthStatus>(AuthStatus.checking);

  public currentUser = computed(() => this._curretUser());
  public authStatus = computed(() => this._authStatus());

  constructor() {
    this.checkAuthStatus().subscribe();
  }

  private setAuthentication(user: User, token: string): boolean {
    this._curretUser.set(user);
    this._authStatus.set(AuthStatus.authenticated);
    localStorage.setItem('token', token);

    return true
  }

  public login(email: string, password: string): Observable<boolean> {
    const url = `${this.baseURL}/auth/login`;
    const body = {
      email,
      password,
    };

    return this.http.post<LoginResponse>(url, body).pipe(
      map(({ user, token }) => this.setAuthentication(user, token)),
      catchError((err) => throwError(() => err.error.message))
    );
  }

  public checkAuthStatus(): Observable<boolean> {
    const url = `${this.baseURL}/auth/check-token`;
    const token = localStorage.getItem('token');

    if (!token) return of(false);

    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)

    return this.http.get<CheckTokenResponse>(url, { headers }).pipe(
      map(({ user, token }) => this.setAuthentication(user, token)),
      catchError(() => {

        this._authStatus.set(AuthStatus.notAuthenticated);

        return of(false)
      })
    )
  }
}
