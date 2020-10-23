import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseURL = 'https://notedatabase.herokuapp.com/';

  constructor(private httpClient: HttpClient, private router: Router) {}

  signUp(data: any): Observable<any> {
    return this.httpClient.post(this.baseURL + 'signup', data);
  }
  signIn(data: any): Observable<any> {
    return this.httpClient.post(this.baseURL + 'signin', data);
  }
  signOut(data: any): Observable<any> {
    return this.httpClient.get(this.baseURL + 'logout', data);
  }
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
  getoken() {
    return localStorage.getItem('token');
  }
}
