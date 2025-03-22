import {Injectable} from '@angular/core';
import {UserModel} from '../../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user: UserModel | null = null;

  constructor() {
  }

  private loadUserFromLocalStorage(): void {
    const currentUser = localStorage.getItem('user');
    this.user = currentUser ? JSON.parse(currentUser) as UserModel : null;
  }

  getCurrentUserName(): string | undefined {
    if (!this.user) {
      this.loadUserFromLocalStorage();
    }
    return this.user?.name;
  }

  getCurrentUserEmail(): string | undefined {
    if (!this.user) {
      this.loadUserFromLocalStorage();
    }
    return this.user?.email;
  }
}
