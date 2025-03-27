import {AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
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
export class AdminPanelComponent implements OnInit, AfterViewInit {
  isShowUsersTable: boolean = true;
  userStatisticaList: UserStatistica[];
  selectedUserEmail: String = "";
  user: UserStatistica | null = null;

  constructor(private adminPanelService: AdminPanelService
    , private cdr: ChangeDetectorRef) {
    this.userStatisticaList = [];
  }

  ngOnInit() {
    this.adminPanelService.getAllUsersStatistica();
  }

  ngAfterViewInit() {
    this.isShowUsersTable = true;
    this.adminPanelService.currentListUsersStatistica.subscribe({
      next: (userStatistica: UserStatistica[]) => {
        this.userStatisticaList = userStatistica;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Ошибка при получении данных пользователя:', err);
      }
    })
  }

  setUserEmail(selectedUserEmail: String) {
    this.selectedUserEmail = selectedUserEmail;
  }

  getDataUser(selectedUserEmail: String) {
    if (selectedUserEmail) {
      this.isShowUsersTable = false;
      for (let user of this.userStatisticaList) {
        if (selectedUserEmail == user.email) {
          this.user = user;
        }
      }
    }
  }

  back() {
    this.isShowUsersTable = true;
  }

}
