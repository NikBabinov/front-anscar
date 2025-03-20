import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserStatisticaService} from '../../service/user-statistica/user-statistica.service';
import {UserStatistica} from '../../model/user-statistical.model';
import {AuthService} from '../../service/auth/auth.service';
import {TEXT_CONSTANTS} from '../../constants/text-constants';
import { ChangeDetectorRef } from '@angular/core';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-user-statistical',
  imports: [
    NgIf
  ],
  templateUrl: './user-statistica.component.html',
  standalone: true,
  styleUrl: './user-statistica.component.scss'
})
export class UserStatisticaComponent implements AfterViewInit, OnInit {
  @ViewChild('field_Level_Label') fieldLevelLabel!: ElementRef;
  @ViewChild('field_Level_out') fieldLevelOut!: ElementRef;

  @ViewChild('field_total_count_solution_task_label') fieldTotalCountSolutionTaskLabel!: ElementRef;
  @ViewChild('field_total_count_solution_task_out') fieldTotalCountSolutionTaskOut!: ElementRef;

  @ViewChild('field_completed_task_first_time_label') fieldCompletedTaskFirstTimeLabel!: ElementRef;
  @ViewChild('field_completed_task_first_time_out') fieldCompletedTaskFirstTimeOut!: ElementRef;

  isLoadingDataFromServer: boolean = false;

  constructor(private http: HttpClient,
              private userStatisticalService: UserStatisticaService,
              private authService: AuthService,
              private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      const userData = this.authService.getUserData();
      this.userStatisticalService.getUserStatistical(userData?.email);
    }
  }


  ngAfterViewInit(): void {
    this.userStatisticalService.currentUser.subscribe({
      next: (userStatistica: UserStatistica) => {
        if (this.fieldLevelLabel && this.fieldLevelOut) {
          this.fieldLevelLabel.nativeElement.textContent = TEXT_CONSTANTS.LEVEL;
          this.fieldLevelOut.nativeElement.textContent = userStatistica.level;

          this.fieldTotalCountSolutionTaskLabel.nativeElement.textContent = TEXT_CONSTANTS.COUNT_SOLUTION_TASK;
          this.fieldTotalCountSolutionTaskOut.nativeElement.textContent = userStatistica.countSolutionTask;

          this.fieldCompletedTaskFirstTimeLabel.nativeElement.textContent = TEXT_CONSTANTS.COMPLETED_TASK_FIRST_TIME;
          this.fieldCompletedTaskFirstTimeOut.nativeElement.textContent = userStatistica.solutionTaskFirstTime;
        }

        if(userStatistica.email !==''){
          this.isLoadingDataFromServer = true;
        }
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Ошибка при получении данных пользователя:', err);
      }
    });
  }

  protected readonly TEXT_CONSTANTS = TEXT_CONSTANTS;
}
