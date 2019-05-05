import { HttpModule } from '@angular/http';
import { registerLocaleData } from '@angular/common';
import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { UtilModule } from '../util/util.module';
import { DirectiveModule } from '../directive/directive.module';
import { MODULE_COMPONENTS_EXTERNAL, MODULE_SERVICES_EXTERNAL } from './external.route';
import localePT from '@angular/common/locales/pt';
import { ComponentsModule } from '../components/components.module';

registerLocaleData(localePT);

@NgModule({
    imports: [
      BrowserModule,
      BrowserAnimationsModule,
      RouterModule.forChild([]),
      ReactiveFormsModule,
      UtilModule,
      HttpModule,
      DirectiveModule,
      ComponentsModule
    ],
    exports: [
        MODULE_COMPONENTS_EXTERNAL
    ],
    declarations: [
        MODULE_COMPONENTS_EXTERNAL,
    ],
    providers: [
        {provide: LOCALE_ID, useValue: 'pt'},
        MODULE_SERVICES_EXTERNAL
    ]
})

export class ExternalModule {}
