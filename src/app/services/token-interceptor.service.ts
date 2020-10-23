import { NotesService } from './notes.service';
// tslint:disable: typedef
import { AuthService } from './auth.service';
import { HttpHeaders, HttpInterceptor } from '@angular/common/http';
import { Injectable, Injector, OnInit } from '@angular/core';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor, OnInit {
  mtoken;

  constructor(private injector: Injector, public notesService: NotesService) {}

  intercept(req, next) {
    const authService = this.injector.get(AuthService);
    const tokenizedReq = req.clone({
      setHeaders: {
        token: `${authService.getoken()}`,
      },
    });
    this.notesService.userToken = tokenizedReq.headers.get('token');
    return next.handle(tokenizedReq);
  }
  // tslint:disable-next-line: contextual-lifecycle
  ngOnInit(): void {}
}
