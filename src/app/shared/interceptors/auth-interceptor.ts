// auth.interceptor.ts
import {
  HttpEvent,
  HttpHandlerFn,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { inject, Injector } from '@angular/core';
import { Observable, throwError, switchMap, catchError, BehaviorSubject, filter, take } from 'rxjs';
import { AuthService } from '../../services/admin/auth-service';
import { Router } from '@angular/router';

  let isRefreshing = false;
  const refreshTokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  export function AuthInterceptor (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('token');
    const injector: Injector = inject(Injector);
    const authService: AuthService = inject(AuthService);
    const router: Router = inject(Router);
    let authReq = req;
    if (token) {
      authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    return next(authReq).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401) {
            return handle401Error(injector, authReq, next, authService,router);
          } else if (error.status === 403) {
            authService.logout().pipe(take(1)).subscribe({
               next: (response) => {
                  console.log(response);
                  sessionStorage.clear();
                  localStorage.clear();
                  router.navigate(['/admin/auth/login']);
               }
               , error: (error: HttpErrorResponse) => {
                  console.log(error);
               }
            })
          }
        }
        return throwError(() => error);
      })
    );

  }

  function handle401Error(injector: Injector,
    req: HttpRequest<unknown>,
    next: HttpHandlerFn,
    authService : AuthService,
    router: Router): Observable<HttpEvent<unknown>> {

    if (!isRefreshing) {
      isRefreshing = true;
      refreshTokenSubject.next(null);
      return authService.refreshToken().pipe(
        switchMap((res : responseToken ) => {
          const newToken = res.accessToken;
          sessionStorage.setItem('accessToken', newToken);
          refreshTokenSubject.next(newToken);
          isRefreshing = false;
          return next(addToken(req, newToken));
        }),
        catchError((err) => {
          isRefreshing = false;
          authService.logout().pipe(take(1)).subscribe({
               next: (response) => {
                  console.log(response);
                  sessionStorage.clear();
                  localStorage.clear();
                  router.navigate(['/admin/auth/login']);
               }
               , error: (error: HttpErrorResponse) => {
                  console.log(error);
               }
            });
          return throwError(() => err);
        })
      );
    } else {
      return refreshTokenSubject.pipe(
        filter((token): token is string => token != null),
        take(1),
        switchMap((token) => next(addToken(req, token)))
      );
    }
  }

  function addToken(req: HttpRequest<unknown>, token: string): HttpRequest<unknown> {
    return req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }


  export interface responseToken{
    accessToken :string
  }
