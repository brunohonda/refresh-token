import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, switchMap, throwError } from 'rxjs';

import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private readonly router: Router,
    private readonly userService: UserService,
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('token') ?? '';
    const requestClone = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

    return next.handle(requestClone)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          if (err.status == 401) {
            return this.handle401(next, request)
          }

          if (err.status == 403) {
            return this.handle403(next, request)
          }

          return throwError(() => err);
        })
      );
  }


  private handle401(next: HttpHandler, request: HttpRequest<unknown>): Observable<HttpEvent<any>> {
    return this.userService
      .refreshToken()
      .pipe(
        switchMap(({ token }) => next.handle(request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        })))
      );
  }

  private handle403(next: HttpHandler, request: HttpRequest<unknown>): Observable<HttpEvent<any>> {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh-token');
    this.router.navigate(['/login']);
    return throwError(() => new Error('Forbidden'));
  }
}
