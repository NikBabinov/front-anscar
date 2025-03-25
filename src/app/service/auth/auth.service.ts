import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {UserModel} from '../../model/user.model';
import {AuthResponse} from '../../model/auth-response.model';
import {Router} from '@angular/router';

@Injectable({providedIn: 'root'})
export class AuthService {
  private currentUserSubject: BehaviorSubject<UserModel | null>;
  public currentUser: Observable<UserModel | null>;

  constructor(private http: HttpClient,private _router: Router) {
    const user: UserModel | null = this.getUserFromLocalStorage();
    this.currentUserSubject = new BehaviorSubject<UserModel | null>(user);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  register(user: UserModel): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.apiUrl}/auth/register`, user, {withCredentials: true})
      .pipe(map(response => {
        if (response) {
          this.setUserToLocalStorage(response.user);
          this.currentUserSubject.next(response.user);
        }
        return response;
      }));
  }

  login(user: UserModel): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.apiUrl}/auth/login`, user, {withCredentials: true})
      .pipe(map(response => {
        if (response) {
          this.setUserToLocalStorage(response.user);
          this.currentUserSubject.next(response.user);
        }
        return response;
      }));
  }

  logout(): void {
    this.http.post(`${environment.apiUrl}/logout`, {withCredentials: true}).subscribe({
      next: (response: any) => {
        this.removeUserFromCookies(); // "Logout successful"
        this.currentUserSubject.next(null); // Очистите токен из хранилища
        this._router.navigate(['/']); // Перенаправление на страницу входа
      },
      error: (err) => {
        console.error('Error during logout:', err);
      }
    });
  }


  recoverUser(user: UserModel): Observable<UserModel> {
    return this.http.post<UserModel>(`${environment.apiUrl}/auth/recovery`, user, {withCredentials: true});
  }

  isAuthenticated(): boolean {
    return !!this.getUserData();
  }


  getRoleUser(): String | null {
    const userFromLocalStorage: UserModel | null = this.getUserFromLocalStorage();
    return userFromLocalStorage ? userFromLocalStorage?.role : null;
  }

  getUserData() {
    const userFromLocalStorage: UserModel | null = this.getUserFromLocalStorage();
    return userFromLocalStorage ? userFromLocalStorage : null;
  }

  // method to work in cookies


  private setUserToLocalStorage(user: UserModel): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  private getUserFromLocalStorage(): UserModel | null {
    const userString = localStorage.getItem('user');
    if (userString) {
      try {
        return JSON.parse(userString) as UserModel;
      } catch (error) {
        console.error('Error parsing user from localStorage:', error);
        return null;
      }
    }
    return null;
  }


  private removeUserFromCookies(): void {
    localStorage.removeItem('user')
  }
}
