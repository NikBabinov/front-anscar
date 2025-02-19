import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { UserModel } from '../../model/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserSubject: BehaviorSubject<UserModel | null>;
  public currentUser: Observable<UserModel | null>;

  constructor(private http: HttpClient) {
    const storedUser = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<UserModel | null>(storedUser ? JSON.parse(storedUser) : null);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): UserModel | null {
    return this.currentUserSubject.value;
  }

  register(user: UserModel): Observable<UserModel> {
    return this.http.post<UserModel>(`${environment.apiUrl}/api/auth/register`, user);
  }

  login(user: UserModel): Observable<UserModel> {
    return this.http.post<UserModel>(`${environment.apiUrl}/api/auth/login`, user)
      .pipe(map(user => {
        if (user && user.token) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }
        return user;
      }));
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  recoverUser(user: UserModel): Observable<UserModel> {
    return this.http.post<UserModel>(`${environment.apiUrl}/api/auth/recovery`, user);
  }

  checkUniqName(username: string): Observable<boolean> {
    return this.http.get<boolean>(`${environment.apiUrl}/api/auth/check-username?username=${username}`);
  }
}
