import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RoomsComponent } from './rooms/rooms.component';
import { DirectivesComponent } from './directives/directives.component';
import { PipesComponent } from './pipes/pipes.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LifeCycleComponent } from './life-cycle/life-cycle.component';
import { RoomsListComponent } from './rooms-list/rooms-list.component';
import { HeaderComponent } from './header/header.component';
import { ContainerComponent } from './container/container.component';
import { EmployeeComponent } from './employee/employee.component';
import { APP_CONFIG, APP_SERVICE_CONFIG } from './AppConfig/appconfig.service';
import { RequestInterceptor } from './request.interceptor';
import { InitService } from './init.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const initFactory = (initService: InitService) => {
  return () => initService.init();
};

@NgModule({
  declarations: [
    AppComponent,
    RoomsComponent,
    DirectivesComponent,
    PipesComponent,
    LifeCycleComponent,
    RoomsListComponent,
    HeaderComponent,
    ContainerComponent,
    EmployeeComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, NgbModule, HttpClientModule, BrowserAnimationsModule],
  providers: [
    {
      provide: APP_SERVICE_CONFIG,
      useValue: APP_CONFIG,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initFactory,
      deps: [InitService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
