import {HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
  const clonedRequest: HttpRequest<any> = req.clone({
    withCredentials: true // Cookies автоматически добавляются в запрос
  });

  return next(clonedRequest);
};
