import { Injectable } from '@angular/core';
import {UserStatistica} from '../../model/user-statistical.model';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminPanelService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<UserStatistica>(`${environment.apiUrl}/user/adminPanel`,{withCredentials: true})
      .subscribe({
        error: (err) => console.error(err)
      });
  }
}
