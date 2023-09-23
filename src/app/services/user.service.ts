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

  login(data: any) {
    return this.http
      .post<{ token: string; }>('http://localhost:3000/users/login', data)
      .pipe(
        tap(({ token }) => localStorage.setItem('token', token)),
      );
  }
}
