import { AppBotstrapModule } from './../app-bootstrap.module';
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
import { TagInputModule } from 'ngx-chips';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { UiSwitchModule } from 'ngx-ui-switch';

@NgModule({
    imports: [
        NgxDropzoneModule,
        TagInputModule,
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        DirectiveModule,
        ReactiveFormsModule,
        PerfectScrollbarModule,
        AppBotstrapModule,
        UtilModule,
        HttpModule,
        UiSwitchModule,
        RouterModule.forChild([]),
        ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'})
    ],
    exports: [
        MODULE_COMPONENTS
    ],
    declarations: [
        MODULE_COMPONENTS,
    ],
    entryComponents: [
        MODULE_COMPONENTS
    ],
    providers: [
        MODULE_COMPONENTS,
        MODULE_SERVICES_COMPONENTS
    ]
})

export class ComponentsModule {}
