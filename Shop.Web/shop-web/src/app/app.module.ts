import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { AppConfigService } from './services/app-config.service';
import { HttpClientInterceptor } from './services/http-client.interceptor';
import { ProgressBarModule } from 'primeng/progressbar';
import { AuthModule } from './pages/auth/auth.module';

export function init(appConfigService: AppConfigService): Function {
  return (): Promise<void> => appConfigService.load();
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ProgressBarModule,
    AuthModule  
  ],
  providers: [MessageService,
    {
      provide: APP_INITIALIZER,
      useFactory: init,
      deps: [AppConfigService],
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpClientInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
