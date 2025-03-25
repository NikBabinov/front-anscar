import {AfterViewInit, Component, OnInit} from '@angular/core';
import {AdminPanelService} from '../../service/admin-panel/admin-panel.service';
import {UserStatistica} from '../../model/user-statistical.model';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-admin-panel',
  imports: [
    NgIf,
    NgForOf
  ],
  templateUrl: './admin-panel.component.html',
  standalone: true,
  styleUrl: './admin-panel.component.scss'
})
export class AdminPanelComponent implements OnInit,AfterViewInit {
  userStatisticaList : UserStatistica[] = [];

  constructor(private adminPanelService: AdminPanelService) {
  }

  ngOnInit() {
    console.log("init admin service");
    this.adminPanelService.getAllUsersStatistica();
  }

  ngAfterViewInit(){
    this.adminPanelService.currentListUsersStatistica.subscribe({
      next : (userStatistica:UserStatistica[]) =>{
        this.userStatisticaList = userStatistica;
      },
      error: (err) => {
        console.error('Ошибка при получении данных пользователя:', err);
      }
    })
  }

}
