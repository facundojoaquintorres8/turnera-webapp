import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { FooterComponent } from './layout/footer/footer.component';
import { PrivateLayoutComponent } from './layout/private/private-layout.component';
import { PublicLayoutComponent } from './layout/public/public-layout.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './security/token-interceptor';
import { ToastComponent } from './component/toast/toast.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import localeEsAr from '@angular/common/locales/es-AR';
import { registerLocaleData } from '@angular/common';
import { HasPermissionDirective } from './security/has-permission.directive';
import { PermissionModule } from './security/permission.module';

const APP_CONTAINERS = [
  PrivateLayoutComponent,
  PublicLayoutComponent
];

registerLocaleData(localeEsAr, 'es');

@NgModule({
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    NavbarComponent,
    FooterComponent,
    ToastComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    PermissionModule,
  ],
  exports: [ToastComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    { provide: LOCALE_ID, useValue: 'es' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
