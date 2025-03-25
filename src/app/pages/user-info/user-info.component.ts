import { Component,OnInit } from '@angular/core';
import {TextFormConstants} from '../../constants/text-form-constant';
import{UserService} from '../../service/user/user.service';
import{AuthService} from '../../service/auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-info',
  imports: [],
  templateUrl: './user-info.component.html',
  standalone: true,
  styleUrl: './user-info.component.scss'
})
export class UserInfoComponent implements OnInit {
  protected readonly TEXT_CONSTANTS_FORM = TextFormConstants;
  currentUserName: string | undefined = undefined;
  currentUserEmail: string | undefined = undefined;

  constructor(private userService: UserService,
              private authService: AuthService,
              private _router: Router) {}

  ngOnInit(){
    this.currentUserName = this.userService.getCurrentUserName();
    this.currentUserEmail = this.userService.getCurrentUserEmail();
  }

  logOut():void{
    this.authService.logout();
  }

}
