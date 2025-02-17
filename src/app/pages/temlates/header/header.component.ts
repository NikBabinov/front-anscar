import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router, RouterLink} from '@angular/router';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    NgIf
  ],
  templateUrl: './header.component.html',
  standalone: true,
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  isShowAuthorizationButton: boolean = false;

  constructor(private _router: Router) {
  }

  ngOnInit(): void {
    this._router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isShowAuthorizationButton = event.url !== '/authorization';
      }
    });
  }

  openAuthorizationForm(): void {
    this._router.navigate(['/authorization']).then(
      (success) => {

      },
      (error) => {
        //   TODO add logger fail routing
      }
    );
  }


}
