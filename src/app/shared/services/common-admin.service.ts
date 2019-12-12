import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CommonFunc } from '../utils';
import { TranslateService } from '@ngx-translate/core';

const API_BAS = '/bas';
const API_BA_FOLDERS = '/bas/:baId/folders';

const API_FOLDERS = '/folders';
const API_FOLDER_PROPS = '/folders/:folId/props';
const API_FOLDER_ITEMS = '/folders/:folId/items';

export interface QueryObjectsType {
  filter?: string;
  offset?: number;
  limit?: number;
  sort?: string;
}

const DEFAULT_BODY: QueryObjectsType = {
  filter: 'elementState==1',
  offset: 0,
  limit: 100,
  sort: '+name'
};

/**
  * Common shared admin API call services
  * 
  * @example  Example of usage the CommonAdminService class:
  * 
  * export class SampleConsumer {
  *   constructor(
  *     private adminService: CommonAdminService
  *   ) {}
  * 
  *   private loadBusinessAreas() {
  *   this.adminService.getBas().subscribe(
  *      resp => {
  *        if (resp.errors.length > 0) {
  *          console.log('Loading business areas errors', resp.errors);
  *        } else {
  *        let listBAs = [...resp.data.list];
  *        // Using results
  *        }
  *      },
  *      err => {
  *        console.log('Failed to load business areas', err);
  *      }
  *    );
  *   }
  * }
  */

@Injectable({
  providedIn: 'root'
})
export class CommonAdminService {
  constructor(
    private baseSvc: BaseService,
    private translate: TranslateService
  ) {
  }

  /**
   * Execute asynchronous REST request for Business Areas
   * 
   * @param body - object with search parameters
   * @returns Observable for retrieving a objects list with Business areas
   */
  public getBas(body?: any): Observable<any> {
    if (CommonFunc.isEmpty(body)) {
      body = {};
    }
    let newBody = { ...DEFAULT_BODY, ...body };
    return this.baseSvc.postData(API_BAS, newBody).pipe(tap(resp => {}, err => {}));
  }

  /**
   * Execute asynchronous REST request for Folders in business arrea
   * 
   * @param folId - folder identifier
   * @param search - object with search parameters "filter", "offset", "limit" and "sort"
   * @returns Observable for retrieving a objects list with Folders
   */
  public getBaFolders(baId: number, search?: string): Observable<any> {
    let body = {
      filter: 'elementState==1'
    };
    if (!CommonFunc.isEmpty(search)) {
      body = {
        ...body,
        filter: body.filter + ',name==*' + search + '*'
      };
    }
    let url = CommonFunc.prepareUrl(API_BA_FOLDERS, { baId });
    return this.baseSvc.postData(url, body).pipe(tap(resp => {}, err => {}));
  }

  /**
   * Execute asynchronous REST request for Folders
   * 
   * @param body - object with search parameters
   * @returns Observable for retrieving a objects list with Folders
   */
  public getFolders(body?: any): Observable<any>  {
    if (CommonFunc.isEmpty(body)) {
      body = {};
    }
    let newBody = { ...DEFAULT_BODY, ...body };
    return this.baseSvc.postData(API_FOLDERS, newBody).pipe(tap(resp => {}, err => {}));
  }

  /**
   * Execute asynchronous REST request for loading a Folder properties
   * 
   * @param folId - folder identifier
   * @returns Observable for retreiving a folder properties
   */
  public getFolderProps(folId: number): Observable<any> {
    let body = {};
    let url = CommonFunc.prepareUrl(API_FOLDER_PROPS, { folId });
    return this.baseSvc.getData(url, body).pipe(tap(resp => {}, err => {}));
  }
  

  /**
   * Execute asynchronous REST request for folder items
   * 
   * @param folId - folder identifier
   * @param search - object with additional search parameter
   * @param limit  - if parameter is ommited then the first 500 items will be retrieved
   * @returns Observable for retrieving a objects list with Folders
   */
  public getFolderItems(folId: number, search?: string, limit?: number): Observable<any> {
    let body = {};
    let filter = '';
    if (CommonFunc.isString(search)) {
      filter += 'name==*' + search + '*';
    }
    if (filter.length > 0) {
      body = {
        ...body,
        filter
      };
    }
    if (!CommonFunc.isNumber(limit)) {
      limit = 500;
    }
    body = {
      ...body,
      limit
    };
    let url = CommonFunc.prepareUrl(API_FOLDER_ITEMS, { folId });
    return this.baseSvc.postData(url, body).pipe(tap(resp => {}, err => {}));
  }


  /**
   * Execute asynchronous REST request to update a Folder properties
   * 
   * @param folderProps - folder properties and translations
   * @returns Observable for retreiving a result
   */
  public updateFolderProps(folderProps: Object): Observable<any> {
    let body = {...folderProps};
    let folId: number = folderProps["id"];
    let url = CommonFunc.prepareUrl(API_FOLDER_PROPS, { folId });
    return this.baseSvc.putData(url, body).pipe(tap(resp => {}, err => {}));
  }

  /**
   * Encode REST error and return message for displaying
   * 
   * @param err - received API error object
   * @returns Translated error message
   */
  public errorMessage(err: any):string {
    let msg:string = "";
    if (CommonFunc.isString(err)) {
      msg = err;
    } else {
      let userMsg = err.userMessage;
      if (CommonFunc.isEmpty(userMsg)) {
        userMsg = err.internalMessage;
      }
      if (CommonFunc.isEmpty(userMsg)) {
        userMsg = err;
      }
      if (CommonFunc.isString(userMsg)) {
        msg = userMsg;
      } else {
        msg = JSON.stringify(userMsg);
      }
    }
    if (err.raw) {
      msg = this.translate.instant(msg);
    }
    return msg;
  }

}
