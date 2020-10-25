import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  baseURL = 'https://notedatabase.herokuapp.com/';
  name: Subject<string> = new Subject();
  constructor(private httpClient: HttpClient) {}
  user(): Observable<any> {
    return this.httpClient.get(`${this.baseURL}getuser`);
  }
  broadcastLoginChange(text: string) {
    this.name.next(text);
  }
  changeName(data): Observable<any> {
    return this.httpClient.patch(`${this.baseURL}updateuser`, data);
  }
}
