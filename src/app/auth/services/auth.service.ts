import { computed, inject, Injectable, signal } from '@angular/core';
import { enviroments } from '../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of, tap } from 'rxjs';
import { AuthStatus, LoginResponse, User } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseURL: string = enviroments.baseURL
  private http = inject( HttpClient )

  private _curretUser = signal<User | null>(null)
  private _authStatus = signal<AuthStatus>(AuthStatus.checking)

  public currentUser = computed(() => this._curretUser())
  public authStatus  = computed(() => this._authStatus())

  constructor() { }

  public login( email: string, password: string ): Observable<boolean> {

    const url = `${ this.baseURL }/auth/login`
    const body = {
      email,
      password
    }


    return this.http.post<LoginResponse>(url, body)
      .pipe(
        tap( ({ user, token }) => {
          this._curretUser.set( user );
          this._authStatus.set( AuthStatus.authenticated );
          localStorage.setItem( 'token', token );

          console.log({ user, token })
        }),
        map(() => true)
      )


    return of( true )
  }



}
