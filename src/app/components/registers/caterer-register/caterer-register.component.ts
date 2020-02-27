import { Router } from '@angular/router';
import { UtilService } from './../../../util/util.service';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'caterer-register',
  templateUrl: './caterer-register.component.html',
  styleUrls: ['./caterer-register.component.scss']
})
export class CatererRegisterComponent implements OnInit {
  public caterers: any = [];
  public caterersPagination: any = [];

  constructor(private router: Router,
              @Inject(UtilService) private utilService: UtilService) { }

  ngOnInit() {
  }

  public goTo(route: string) {
    this.utilService.goTo(this.router, route);
  }
}
