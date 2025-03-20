import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { AuthService } from '../../../service/auth/auth.service';
import { UserService } from '../../../service/user/user.service';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    NgIf
  ],
  templateUrl: './header.component.html',
  standalone: true,
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isShowAuthorizationButton: boolean = false;
  isShowUserName: boolean = false;
  currentUserName?: string;

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateButtonStates(event.url);
      }
    });
    this.updateButtonStates(this.router.url);
  }

  private updateButtonStates(url: string): void {
    const isAuthenticated = this.authService.isAuthenticated();
    this.isShowAuthorizationButton = !isAuthenticated && url !== '/authorization';
    this.isShowUserName = isAuthenticated && url !== '/authorization';
    if (isAuthenticated && this.isShowUserName) {
      this.initCurrentUserName();
    }
  }

  private initCurrentUserName(): void {
    this.currentUserName = this.userService.getCurrentUserName();
  }

  openAuthorizationForm(): void {
    this.router.navigate(['/authorization']).then(
      success => {
        // Handle success
      },
      error => {
        console.error('Navigation to authorization failed', error);
      }
    );
  }

  openUserInfo(): void {
    this.router.navigate(['/user-info']).then(
      success => {
        // Handle success
      },
      error => {
        console.error('Navigation to user-info failed', error);
      }
    );
  }
}
