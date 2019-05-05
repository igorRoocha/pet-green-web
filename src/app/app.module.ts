import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { ComponentsComponent } from './components/components.component';
import { InternalComponent } from './internal/internal.component';
import { ExternalComponent } from './external/external.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ExternalModule } from './external/external.module';
import { InternalModule } from './internal/internal.module';
import { ComponentsModule } from './components/components.module';
import { DirectiveModule } from './directive/directive.module';
import { routing } from './app.route';
import { Http, XHRBackend, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { httpFactory } from './util/http.factory';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  declarations: [
    AppComponent,
    ComponentsComponent,
    InternalComponent,
    ExternalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonModule,
    ReactiveFormsModule,
    routing,
    PerfectScrollbarModule,
    ExternalModule,
    InternalModule,
    ComponentsModule,
    HttpClientModule,
    DirectiveModule,
  ],
  providers: [{
    provide: PERFECT_SCROLLBAR_CONFIG, useFactory: httpFactory, deps: [XHRBackend, RequestOptions, Router],
    useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
