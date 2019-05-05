import {NgModule} from '@angular/core';
import {UtilService} from './util.service';
import {AuthGuard} from './auth.guard';

@NgModule({
  declarations: [],
  exports: [],
  providers: [
    UtilService,
    AuthGuard
  ]
})
export class UtilModule {}
