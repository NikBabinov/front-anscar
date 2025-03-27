import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const clonedRequest: HttpRequest<any> = req.clone({
      withCredentials: true,
    });

    return next.handle(clonedRequest).pipe(
      catchError((error) => {
        if (error.status === 403) {
          this.router.navigate(['/authorization']);
        }
        return throwError(() => error);
      })
    );
  }
}
