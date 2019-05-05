import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import localePT from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UtilModule } from '../util/util.module';
import { DirectiveModule } from '../directive/directive.module';
import { RouterModule } from '@angular/router';
import { MODULE_COMPONENTS_INTERNAL, MODULE_SERVICES_INTERNAL } from './internal.route';
import { ComponentsModule } from '../components/components.module';
import { HttpModule } from '@angular/http';

registerLocaleData(localePT);

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        UtilModule,
        HttpModule,
        ComponentsModule,
        PerfectScrollbarModule,
        DirectiveModule,
        RouterModule.forChild([]),
        ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' })
    ],
    exports: [
        MODULE_COMPONENTS_INTERNAL
    ],
    declarations: [
        MODULE_COMPONENTS_INTERNAL,
    ],
    entryComponents: [
        MODULE_COMPONENTS_INTERNAL,
    ],
    providers: [
        { provide: LOCALE_ID, useValue: 'pt' },
        MODULE_SERVICES_INTERNAL
    ]
})

export class InternalModule { }
