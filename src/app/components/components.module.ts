import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DirectiveModule } from '../directive/directive.module';
import { UtilModule } from '../util/util.module';
import { RouterModule } from '@angular/router';
import { MODULE_COMPONENTS, MODULE_SERVICES_COMPONENTS,  } from './components.route';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        DirectiveModule,
        ReactiveFormsModule,
        PerfectScrollbarModule,
        UtilModule,
        HttpModule,
        RouterModule.forChild([]),
        ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'})
    ],
    exports: [
        MODULE_COMPONENTS
    ],
    declarations: [
        MODULE_COMPONENTS
    ],
    providers: [
        MODULE_COMPONENTS,
        MODULE_SERVICES_COMPONENTS
    ]
})

export class ComponentsModule {}
