import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { NotesService } from './notes.service';
import { AuthService } from './auth.service';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { tap } from 'rxjs/operators';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {
  constructor(
    private injector: Injector,
    public notesService: NotesService,
    private router: Router
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authService = this.injector.get(AuthService);

    request = request.clone({
      setHeaders: {
        'Content-Type': 'application/json',
        token: `${authService.getoken()}`,
      },
    });
    this.notesService.userToken = request.headers.get('token');

    return next.handle(request).pipe(
      tap(
        () => {},
        (err: any) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status !== 401) {
              return;
            }
            localStorage.clear();
            this.router.navigate(['/signin']);
          }
        }
      )
    );
  }
}
