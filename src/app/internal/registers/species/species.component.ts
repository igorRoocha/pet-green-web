import { NewSpeciesComponent } from './../../../components/registers/modal/new-species/new-species.component';
import { UtilService } from './../../../util/util.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Component, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'species',
  templateUrl: './species.component.html',
  styleUrls: ['./species.component.scss']
})
export class SpeciesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
}
