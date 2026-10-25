import { HttpClient } from '@angular/common/http'
import { Injectable, inject, signal } from '@angular/core'
import { Observable } from 'rxjs'
import { environment } from '../../../environments/environment'
import { LoginRequest, RegistrationRequest, UserResponse } from './auth.schema'

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly baseUrl = environment.baseUrl
  private readonly http = inject(HttpClient)
  private readonly STORAGE_KEY = 'auth_user_data'

  private readonly _refreshToken = signal('')
  public readonly refreshToken = this._refreshToken.asReadonly()

  public registration$(payload: RegistrationRequest): Observable<UserResponse> {
    return this.http.post<UserResponse>(
      `${this.baseUrl}auth/registration`,
      payload,
    )
  }

  public login$(payload: LoginRequest): Observable<UserResponse> {
    return this.http.post<UserResponse>(`${this.baseUrl}auth/login`, payload)
  }

  public getAccessToken$(refreshToken: string) {
    return this.http.post(
      `${this.baseUrl}auth/refresh_token${refreshToken}`,
      null,
    )
  }

  public persistAuth(authState: any) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(authState))
  }
}
