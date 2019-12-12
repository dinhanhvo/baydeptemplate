import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { CommonAdminService } from 'src/app/shared/services/common-admin.service';
import { Subscription } from 'rxjs';
import { CommonFunc } from 'src/app/shared/utils';
import { TranslateService } from '@ngx-translate/core';
import { MessageService, ConfirmationService } from 'primeng/api';

/**
 * This is a component for editing a folder properties.
 * It is subscribed to changes of routing parameter "id".
 * Parameter "id" must be an identifier of existing folder.
 *
 * @example <caption>Routing definition:</caption>
 *    children: [
 *      { path: ':id', component: FolderPropertiesComponent }
 *    ]
 *
 * @example <caption>Type Script navigation:</caption>
 *  onFolderSelect(folder: any) {
 *    if (folder != null) {
 *      this.router.navigate([folder.id], {relativeTo: this.route});
 *    } else {
 *      this.router.navigate(['../'], {relativeTo: this.route});
 *    }
 *  }
 */
@Component({
  selector: 'app-folder-properties',
  templateUrl: './folder-properties.component.html',
  styleUrls: ['./folder-properties.component.scss']
})
export class FolderPropertiesComponent implements OnInit, OnDestroy {
  // Routing parameters
  paramsId: string = null;
  // Visual binding variables
  isWorking: boolean = false;
  folderProps: any = {};
  // Information for translations
  sessionLang: string;
  translations: any = {};
  languages = [
    { label: 'English', value: 'en' },
    { label: 'French', value: 'fr' },
    { label: 'German', value: 'de' },
    { label: 'Spanish', value: 'es' }
  ];
  notYesNo = [{ label: 'Yes', value: 'false' }, { label: 'No', value: 'true' }];

  subscription: Subscription = null;

  constructor(
    private route: ActivatedRoute,
    private admin: CommonAdminService,
    private translate: TranslateService,
    private message: MessageService,
    private confirmation: ConfirmationService
  ) {
    this.initInputs(true);
  }

  /** On initialization the component is being subscribed for parameter changes */
  ngOnInit() {
    this.subscription = this.route.params.subscribe((params: Params) => {
      this.initInputs(false);
      this.paramsId = params['id'];
      if (CommonFunc.isEmpty(this.paramsId)) {
        console.log('Missing routing parameter "id"');
      } else {
        this.load(+this.paramsId);
      }
    });
  }

  /** On destroing the subscription is ended */
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  /** Store a translation information */
  private setTranslation(lang: string, key: string, value: string) {
    if (this.folderProps.translations != null) {
      let trans = this.folderProps.translations.find(elm => {
        return elm.lang === lang && elm.key === key;
      });
      if (!CommonFunc.isEmpty(trans)) {
        trans.value = value;
      } else {
        this.folderProps.translations.push({ lang: lang, key: key, value: value });
      }
    }
  }

  /** Find and return a translation information */
  private getTranslation(lang: string, key: string): string {
    let trans = null;
    if (this.folderProps.translations != null) {
      trans = this.folderProps.translations.find(elm => {
        return elm.lang === lang && elm.key === key;
      });
    }
    if (!CommonFunc.isEmpty(trans) && !CommonFunc.isEmpty(trans.value)) {
      return trans.value;
    } else {
      return null;
    }
  }

  /** The parameter is used to cache a language */
  private initInputs(full: boolean) {
    this.folderProps = {};
    if (full) {
      this.paramsId = null;
      this.sessionLang = sessionStorage.getItem('lang');
    }
    this.translations = {};
    for (let entry of this.languages) {
      this.translations[entry.value] = { name: null, description: null };
    }
  }

  /** Lazy loading of folder */
  private load(folderId: number) {
    this.isWorking = true;
    this.admin.getFolderProps(folderId).subscribe(
      resp => {
        this.isWorking = false;
        if (resp.errors.length > 0) {
          console.log('Loading object errors', resp.errors);
          this.showError(resp.errors[0]);
        } else {
          if (resp.data.object != null) {
            this.folderProps = { ...resp.data.object };
          } else {
            console.log('Object is missing in response');
          }
          // This is an array of translations
          if (this.folderProps.translations != null) {
            for (let entry of this.languages) {
              this.translations[entry.value] = {
                name: this.getTranslation(entry.value, 'fd.name'),
                description: this.getTranslation(entry.value, 'fd.description')
              };
            }
          }
        }
      },
      err => {
        this.isWorking = false;
        console.log('Failed to load an object', err);
      }
    );
  }

  /** Save folder properties in database */
  private save() {
    if (this.folderProps.translations == null || this.isWorking) {
      this.message.add({
        severity: 'warn',
        summary: this.translate.instant('There are communication problems'),
        life: 3000
      });
      return;
    }
    this.isWorking = true;
    this.admin.updateFolderProps(this.folderProps).subscribe(
      resp => {
        this.isWorking = false;
        if (resp.errors.length > 0) {
          console.log('Saving object errors', resp.errors);
          this.showError(resp.errors[0]);
        } else {
          if (resp.data.object != null) {
            this.folderProps = { ...resp.data.object };
          } else {
            console.log('Object is missing in response');
          }
          // This is an array of translations
          if (this.folderProps.translations != null) {
            for (let entry of this.languages) {
              this.translations[entry.value] = {
                name: this.getTranslation(entry.value, 'fd.name'),
                description: this.getTranslation(entry.value, 'fd.description')
              };
            }
          }
          this.showInfo(this.translate.instant('Folder properties and translations are updated.'));
        }
      },
      err => {
        this.isWorking = false;
        console.log('Failed to save an object', err);
        this.showError(err);
      }
    );
  }

  /** Confirm saving in database */
  onSave() {
    // Update translations
    for (let entry of this.languages) {
      this.setTranslation(entry.value, 'fd.name', this.translations[entry.value].name);
      this.setTranslation(entry.value, 'fd.description', this.translations[entry.value].description);
    }

    let msg = this.translate.instant('Are you sure that you want to save folder properties in database?');
    this.confirmation.confirm({
      message: msg,
      accept: () => {
        if (!CommonFunc.isEmpty(this.paramsId)) {
          this.save();
        }
      }
    });
  }

  /** Cancel editing / Refresh a folder information */
  onCancel() {
    this.initInputs(false);
    if (!CommonFunc.isEmpty(this.paramsId)) {
      this.load(+this.paramsId);
    }
  }

  private showError(err) {
    this.message.add({ severity: 'error', summary: this.admin.errorMessage(err), life: 5000 });
  }

  private showInfo(detail, summary: string = 'Information') {
    this.message.add({ severity: 'info', summary: summary, detail: detail, life: 2000 });
  }
}
