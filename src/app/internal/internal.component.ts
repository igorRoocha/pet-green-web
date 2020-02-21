import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../components/sidebar/sidebar.service';

@Component({
  selector: 'app-internal',
  templateUrl: './internal.component.html',
  styleUrls: ['./internal.component.scss']
})
export class InternalComponent implements OnInit {

  constructor(public sidebarservice: SidebarService) { }

  ngOnInit() {

  }

  toggleSidebar() {
    this.sidebarservice.setSidebarState(!this.sidebarservice.getSidebarState());
  }

  getSideBarState() {
    return this.sidebarservice.getSidebarState();
  }
}

