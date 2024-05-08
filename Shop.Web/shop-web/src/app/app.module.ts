import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { AppConfigService } from './services/app-config.service';

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
    HttpClientModule
  ],
  providers: [MessageService,
    {
      provide: APP_INITIALIZER,
      useFactory: init,
      deps: [AppConfigService],
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
