import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {UserStatistica} from '../../model/user-statistical.model';


@Injectable({
  providedIn: 'root'
})
export class UserStatisticaService {
  private defaultUserStatistical:UserStatistica = {
    name: '',
    email: '',
    level: 0,
    countSolutionTask: 0,
    solutionTaskFirstTime: 0
  }

  private currentStatisticalUser: BehaviorSubject<UserStatistica>;
  public currentUser: Observable<UserStatistica>;


  constructor(private http: HttpClient) {
    this.currentStatisticalUser = new BehaviorSubject<UserStatistica>(this.defaultUserStatistical);
    this.currentUser = this.currentStatisticalUser.asObservable();
  }

  getUserStatistical(email: string | undefined) {
    const params = new HttpParams().set('email', email || '');
    return this.http.get<UserStatistica>(`${environment.apiUrl}/user/statistica`, { params })
      .subscribe({
        next: (data) => this.currentStatisticalUser.next(data),
        error: (err) => console.error(err)
      });
  }



}
