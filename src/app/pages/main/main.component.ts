import {Component, OnInit} from '@angular/core';
import {TEXT_CONSTANTS} from '../../constants/text-constants';
import {TextFormConstants} from "../../constants/text-form-constant";
import {Router} from "@angular/router";
import {AuthService} from '../../service/auth/auth.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-main',
  imports: [
    NgIf
  ],
  templateUrl: './main.component.html',
  standalone: true,
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit {

  public welcomeMessage = TEXT_CONSTANTS.WELCOME_MESSAGE;
  protected readonly TEXT_CONSTANTS_FORM = TextFormConstants;
  isAuthenticated: boolean = false;
  role: String | null = null;


  constructor(private route: Router, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
    this.role = this.authService.getRoleUser();
  }

  redirectToStatisticalUser() {
    this.route.navigate(['/user-statistica']).then();
  }
}
