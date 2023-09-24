import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpClient
} from '@angular/common/http';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
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
          if (err.status !== 401) {
            return throwError(() => err);
          }

          return this.userService
            .refreshToken()
            .pipe(
              switchMap(({ token }) => next.handle(request.clone({
                setHeaders: {
                  Authorization: `Bearer ${token}`
                }
              })))
            )
        })
      );
  }
}
