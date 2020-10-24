import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  baseURL = 'https://notedatabase.herokuapp.com/';
  userToken = '';
  constructor(private httpClient: HttpClient) {}

  getUserNote(): Observable<any> {
    return this.httpClient.get(this.baseURL + 'usernotes');
  }
  addNote(data): Observable<any> {
    return this.httpClient.post(this.baseURL + 'addnote', data);
  }
  deleteNote(data): Observable<any> {
    return this.httpClient.delete(this.baseURL + `deletenote/${data}`);
  }
  getNoteByID(id): Observable<any> {
    return this.httpClient.get(this.baseURL + `notedetails/${id}`);
  }
  editNote(id, data): Observable<any> {
    return this.httpClient.patch(this.baseURL + `updatenote/${id}`, data);
  }
}
