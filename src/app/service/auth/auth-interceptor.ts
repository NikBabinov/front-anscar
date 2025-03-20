import {HttpInterceptorFn} from '@angular/common/http';
import {HttpRequest, HttpHandlerFn, HttpEvent} from '@angular/common/http';
import {Observable, catchError} from 'rxjs';
import {Router} from '@angular/router';
import {inject} from '@angular/core';

export const authInterceptor:
  HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {

  const router: Router = inject(Router);

  const getTokenFromCookies = (): string | null => {
    const cookies: string[] = document.cookie.split(';');
    for (const cookie of cookies) {
      const [name, value] = cookie.trim().split('=');
      if (name === 'token') {
        return decodeURIComponent(value);
      }
    }
    return null;
  };

  const token: string | null = getTokenFromCookies();

  const clonedRequest:HttpRequest<any> = token
    ? req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    })
    : req;

  return next(clonedRequest).pipe(
    catchError(error => {
      if (error.status === 403) {
        router.navigate(['/authorization']);
      }
      throw error;
    })
  );
};
