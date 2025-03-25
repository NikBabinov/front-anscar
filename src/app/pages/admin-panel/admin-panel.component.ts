import {Component, OnInit} from '@angular/core';
import {AdminPanelService} from '../../service/admin-panel/admin-panel.service';

@Component({
  selector: 'app-admin-panel',
  imports: [],
  templateUrl: './admin-panel.component.html',
  standalone: true,
  styleUrl: './admin-panel.component.scss'
})
export class AdminPanelComponent implements OnInit {

  constructor(private adminPanelService: AdminPanelService) {
  }

  ngOnInit() {
    this.adminPanelService.getAll();
  }

}
