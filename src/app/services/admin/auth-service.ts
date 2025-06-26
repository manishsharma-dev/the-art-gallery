import { inject, Injectable } from '@angular/core';
import { ConfigService } from '../config-service';
import { HttpClient } from '@angular/common/http';
import { LoginModel, LoginResponse } from '../../shared/models/login.model';
import { Observable } from 'rxjs';
import { responseToken } from '../../shared/interceptors/auth-interceptor';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
private config: ConfigService = inject(ConfigService);
private http: HttpClient = inject(HttpClient);
readonly apiUrl: string = this.config.apiUrl;


  /**
   *
   * @param request Login request model containing email and password
   * @description This method sends a POST request to the server to log in a user.
   * It expects a `LoginModel` object containing the user's email and password.
   * @returns  An Observable of `LoginResponse` which contains the status, message, and user data upon successful login.
   */
  login(request: LoginModel): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}auth/login`,
       request,
      {
       withCredentials: true
      });
  }

  refreshToken(): Observable<responseToken>{
    return this.http.post<responseToken>(`${this.apiUrl}auth/refresh-token`,
        {},
        { withCredentials: true }
      );
  }

  logout(){
    return this.http.post(`${this.apiUrl}auth/logout`,{},
      {
       withCredentials: true
      }
    );
  }
}
