import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { TranslateService } from '@ngx-translate/core';

import { SelectItem } from 'primeng/api';
import { environment as env } from '../../environments/environment';
import { AppConfigService } from '../app-config.service';
import { AppStoreService, AppStore } from '../shared/services/app-store.service';
import { LoginService } from '../shared/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
  @Input() username = '';
  @Input() password = '';

  logo: string = env.contextPath + '/assets/images/logo-transparent.png';

  processing = false;
  errors = [];

  siLangs: SelectItem[];
  profiles: any[] = [];
  selProfile: any;
  selLang: string;
  browserLang: string;
  reload: boolean = true;

  constructor(
    public router: Router,
    private trans: TranslateService,
    private appConf: AppConfigService,
    private appStore: AppStoreService,
    private loginSvc: LoginService
  ) {
    this.browserLang = this.trans.getBrowserLang().match(/en|fr|ur|es|it|fa|de/) ? this.trans.getBrowserLang() : 'en';
    this.trans.addLangs(['en', 'fr', 'ur', 'es', 'it', 'fa', 'de']);
    this.trans.setDefaultLang('en');
  }

  ngOnInit() {
    this.init();
  }

  onLangChanged(event) {
    this.appStore.setData(AppStore.LANG, this.selLang);
    this.init();
  }

  onSubmitLogin() {
    console.log('Send login request to server: ', this.username, "*".repeat(this.password.length), this.selLang);
    if (this.username.trim().length === 0 || this.password.length === 0) {
      this.errors = ['Username and password must not be empty.'];
      return;
    }
    this.processing = true;
    this.appStore.setData(AppStore.PROFILE, this.selProfile);
    this.loginSvc.login(this.username, this.password, this.selLang).subscribe(
      data => {
        this.processing = false;
        //console.log('receive login response', data);
        if (data.errors.length > 0) {
          console.log('Failed to login', data.errors);
          this.errors = data.errors.map((it, index) => {
            return it.userMessage;
          });
          console.log('errors', this.errors);
        } else {
          localStorage.setItem('isLoggedin', 'true');
          this.appStore.login(this.username, data.data.token, this.selLang, this.selProfile);
          console.log('current session token', this.appStore.getAuth()['token']);
          this.router.navigate(['/']);
        }
      },
      error => {
        this.processing = false;
        this.errors = ['Internal network error: ' + error.message];
        console.log('Internal network error', error);
      }
    );
  }

  private init() {
    //init translation
    let lang = this.appStore.getData(AppStore.LANG, null);
    if (lang === null) {
      lang = sessionStorage.getItem('lang');
    }
    if (lang === null) {
      lang = this.browserLang;
    }
    sessionStorage.setItem('lang', lang);
    this.trans.use(lang);
    this.selLang = lang;
    let langs = this.appConf.getConfig('langs');
    this.siLangs = [];
    langs.map(lang => {
      this.trans.get('lang.' + lang).subscribe(val => {
        let si: SelectItem = {
          label: val,
          value: lang
        };
        this.siLangs = [...this.siLangs, si];
      });
    });
    let servers = this.appConf.getConfig('profiles');
    this.profiles = [...servers];
    this.selProfile = null;
    for (let pf of this.profiles) {
      if (pf.default) {
        this.selProfile = pf;
        break;
      }
    }
    if (!this.selProfile && this.profiles.length > 0) {
      this.selProfile = this.profiles[0];
    }
    this.appStore.initProfile(this.selProfile);
    this.reload = false;
  }

  onChangeProfile() {
    this.appStore.initProfile(this.selProfile);
    this.reload = true;
    setTimeout(() => {
      this.reload = false;
    }, 1);
  }
  
}
