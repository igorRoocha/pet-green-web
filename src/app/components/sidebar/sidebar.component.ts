import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { SidebarService } from './sidebar.service';


@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [
    trigger('slide', [
      state('up', style({ height: 0 })),
      state('down', style({ height: '*' })),
      transition('up <=> down', animate(200))
    ])
  ]
})
export class SidebarComponent implements OnInit {
  menus: any = [];

  constructor(public sidebarservice: SidebarService) {
    this.menus = sidebarservice.getMenuList();
  }

  ngOnInit() {
  }

  getSideBarState() {
    return this.sidebarservice.getSidebarState();
  }

  toggle(currentMenu) {

    if (currentMenu.type === 'dropdown') {
      this.menus.forEach(element => {
        // Menus
        if (element === currentMenu) {
          currentMenu.active = !currentMenu.active;
        } else if (currentMenu.submenus) {
          element.active = false;
        }

        // Submenus
        if (element.submenus) {
          element.submenus.forEach(submenu => {
            if (submenu === currentMenu) {
              currentMenu.active = !currentMenu.active;
            }
          });
        }
      });
    }
  }

  redirect(currentMenu) {
    if (currentMenu.path) {
      window.location.href = currentMenu.path;
    }
  }

  getState(currentMenu) {

    if (currentMenu.active) {
      return 'down';
    } else {
      return 'up';
    }
  }

  hasBackgroundImage() {
    return this.sidebarservice.hasBackgroundImage;
  }

}
