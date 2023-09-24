import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  registerUser(data: any): Observable<any> {
    return this.http.post('http://localhost:3000/users', data);
  }

  login(data: any): Observable<{ token: string; refreshToken: string; }> {
    return this.http
      .post<{ token: string; refreshToken: string; }>('http://localhost:3000/users/login', data)
      .pipe(
        tap(({ token, refreshToken }) => {
          localStorage.setItem('token', token);
          localStorage.setItem('refresh-token', token);
        }),
      );
  }

  refreshToken(): Observable<{ token: string; }> {
    return this.http
      .post<{ token: string; }>('http://localhost:3000/users/refresh-token', {}, { withCredentials: true })
      .pipe(
        tap(({ token }) => localStorage.setItem('token', token)),
      );
  }

  listUsers(): Observable<any> {
    return this.http.get('http://localhost:3000/users');
  }
}
