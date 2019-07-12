import { Component, OnInit, Input } from '@angular/core';
import { SidebarService } from '../sidebar/sidebar.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Input() external = false;
  public home;

  constructor(private sidebarservice: SidebarService) { }

  ngOnInit() {
    this.home = this.external ? 'login' : 'app/home';
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
