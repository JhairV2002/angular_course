import { APP_INITIALIZER, ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PipesComponent } from './pipes/pipes.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LifeCycleComponent } from './life-cycle/life-cycle.component';
import { ContainerComponent } from './container/container.component';
import { APP_CONFIG, APP_SERVICE_CONFIG } from './AppConfig/appconfig.service';
import { RequestInterceptor } from './request.interceptor';
import { InitService } from './init.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppNavComponent } from './app-nav/app-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { NotfoundComponent } from './notfound/notfound.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { HoveredDirective } from './hovered.directive';
import { EmailValidatorDirective } from './emailvalidator/email-validator.directive';
import { DirectivesModule } from './directives/directives.module';
import { HeaderModule } from './header/header.module';
import { EmployeeModule } from './employee/employee.module';
import { RouteConfigToken } from './services/routeConfig.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { GloblalErrorHandle } from './errorhandler.service';

const initFactory = (initService: InitService) => {
  return () => initService.init();
};

@NgModule({
  declarations: [
    AppComponent,
    PipesComponent,
    LifeCycleComponent,
    ContainerComponent,
    AppNavComponent,
    NotfoundComponent,
    LoginComponent,
    HoveredDirective,
    EmailValidatorDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    FormsModule,
    DirectivesModule,
    HeaderModule,
    EmployeeModule,
    MatSnackBarModule,
  ],
  providers: [
    {
      provide: APP_SERVICE_CONFIG,
      useValue: APP_CONFIG,
    },
    {
      provide: RouteConfigToken,
      useValue: { title: 'home' },
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
    {
      provide: ErrorHandler,
      useClass: GloblalErrorHandle,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
