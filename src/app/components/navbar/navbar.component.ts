import { Component, OnInit, Input } from '@angular/core';
import { SidebarService } from '../sidebar/sidebar.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Input() external = false;

  constructor(private sidebarservice: SidebarService) { }

  ngOnInit() {
  }

  public toggleSidebar() {
    this.sidebarservice.setSidebarState(!this.sidebarservice.getSidebarState());
  }

  public redirect(route) {
    if (!external) {
      window.location.href = route;
    }
  }
}
