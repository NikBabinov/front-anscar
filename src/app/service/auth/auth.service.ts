import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {UserModel} from '../../model/user.model';
import {AuthResponse} from '../../model/auth-response.model';

@Injectable({providedIn: 'root'})
export class AuthService {
  private currentUserSubject: BehaviorSubject<UserModel | null>;
  public currentUser: Observable<UserModel | null>;

  constructor(private http: HttpClient) {
    const user: UserModel | null = this.getUserFromCookies();
    this.currentUserSubject = new BehaviorSubject<UserModel | null>(user);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  register(user: UserModel): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.apiUrl}/auth/register`, user, {withCredentials: true})
      .pipe(map(response => {
        if (response) {
          this.setUserToCookies(response.user);
          this.currentUserSubject.next(response.user);
        }
        return response;
      }));
  }

  login(user: UserModel): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.apiUrl}/auth/login`, user, {withCredentials: true})
      .pipe(map(response => {
        if (response) {
          this.setUserToCookies(response.user);
          this.currentUserSubject.next(response.user);
        }
        return response;
      }));
  }

  logout(): void {
    this.removeUserFromCookies();
    this.currentUserSubject.next(null);
  }

  recoverUser(user: UserModel): Observable<UserModel> {
    return this.http.post<UserModel>(`${environment.apiUrl}/auth/recovery`, user, {withCredentials: true});
  }

  isAuthenticated(): boolean {
    return !!this.getTokenFromCookies();
  }

  // method to work in cookies

  private getTokenFromCookies(): string | null {
    const cookies: string[] = document.cookie.split(';');
    for (const cookie of cookies) {
      const [name, value] = cookie.trim().split('=');
      if (name === 'token') {
        return value;
      }
    }
    return null;
  }

  private setUserToCookies(user: UserModel): void {
    const userString: string = encodeURIComponent(JSON.stringify(user));
    document.cookie = `user=${userString}; path=/; SameSite=Strict`;
  }

  private getUserFromCookies(): UserModel | null {
    const cookies: string[] = document.cookie.split(';');
    for (const cookie of cookies) {
      const [name, value] = cookie.trim().split('=');
      if (name === 'user') {
        return JSON.parse(decodeURIComponent(value)) as UserModel;
      }
    }
    return null;
  }

  private removeUserFromCookies(): void {
    document.cookie = 'user=; path=/; Max-Age=0; SameSite=Strict';
    document.cookie = 'token=; path=/; Max-Age=0; SameSite=Strict';
  }
}
