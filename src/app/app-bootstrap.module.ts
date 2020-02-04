import { NgModule } from '@angular/core';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

@NgModule({
    imports: [
        TabsModule.forRoot(),
        BsDropdownModule.forRoot(),
        ModalModule.forRoot(),
        TooltipModule.forRoot()
    ],
    exports: [
        TabsModule,
        BsDropdownModule,
        ModalModule,
        TooltipModule
    ]
  })
export class AppBotstrapModule { }
