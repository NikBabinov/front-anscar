import {Injectable} from '@angular/core';
import {UserStatistica} from '../../model/user-statistical.model';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminPanelService {

  private listUsersStatisticaSubject: BehaviorSubject<UserStatistica[]>;
  public currentListUsersStatistica: Observable<UserStatistica[]>;

  constructor(private http: HttpClient) {
    this.listUsersStatisticaSubject = new BehaviorSubject<UserStatistica[]>([]);
    this.currentListUsersStatistica = this.listUsersStatisticaSubject.asObservable();
  }

  getAllUsersStatistica() {
    return this.http.get<UserStatistica[]>(`${environment.apiUrl}/user/adminPanel`, {withCredentials: true})
      .subscribe({
        next: (data) => this.listUsersStatisticaSubject.next(data),
        error: (err) => console.error(err)
      })
  }
}
