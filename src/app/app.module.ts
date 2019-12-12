import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LanguageTranslationModule } from './shared/modules/language-translation/language-translation.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './shared/guard';
import { AppConfigService } from './app-config.service';
import { AppStoreService, AppStore } from './shared/services/app-store.service';
import { LoginService } from './shared/services/login.service';

let initConfig = (config: AppConfigService, store: AppStoreService) => async () => {
  console.log('calling config.load');
  let cf = await config.load();
  // console.log('loaded config', cf);
  let profiles: any[] = cf.profiles;
  let defPf = profiles.find(pf => pf.default);
  // console.log('default profile', defPf);
  if (defPf) {
    store.setData(AppStore.PROFILE, defPf);
  }
};

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LanguageTranslationModule,
    AppRoutingModule
  ],
  declarations: [AppComponent],
  providers: [
    AuthGuard,
    AppConfigService,
    AppStoreService,
    {
      provide: LoginService,
      useClass: LoginService,
      deps: [HttpClient, AppStoreService]
    },
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: initConfig,
      deps: [AppConfigService, AppStoreService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
