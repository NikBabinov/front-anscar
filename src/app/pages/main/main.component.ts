import { Component } from '@angular/core';
import {TEXT_CONSTANTS} from '../../constants/text-constants';

@Component({
  selector: 'app-main',
  imports: [],
  templateUrl: './main.component.html',
  standalone: true,
  styleUrl: './main.component.scss'
})
export class MainComponent {
  public welcomeMessage = TEXT_CONSTANTS.WELCOME_MESSAGE;
}
