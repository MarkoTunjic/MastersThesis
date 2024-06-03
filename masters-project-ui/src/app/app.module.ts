import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { HttpClientModule } from '@angular/common/http';
import { ApiModule, BASE_PATH, Configuration } from '@api';
import { ToastrModule } from 'ngx-toastr';
import { environment } from '../environments/environment';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxsModule.forRoot([]),
    NgxsReduxDevtoolsPluginModule,
    NgxsLoggerPluginModule,
    HttpClientModule,
    ToastrModule.forRoot({
      enableHtml: false,
      disableTimeOut: true,
      positionClass: 'toast-bottom-center',
      closeButton: true
    }),
    ApiModule.forRoot(()=>new Configuration({basePath: environment.basePath}))
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
