import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppStoreService, AppStore } from './app-store.service';

/**
  * This is the base class for all internal API call services
  * 
  * @example Example of usage the BaseService class:
  * 
  * @Injectable({providedIn: 'root'})
  * export class SampleService {
  *   constructor(private baseService: BaseService) {}
  *   deleteSample(sampleId: number): Observable<any> {
  *     let url = CommonFunc.prepareUrl('/samples/:sampleId', { sampleId });
  *     return this.baseService.deleteData(url).pipe(tap(resp => {}, err => {}));
  *   }
  * }
  * ...
  * 
  * export class SampleConsumer {
  *   constructor(private sampleService: SampleService) {}
  *   private deleteSample() {
  *    let id = 123454321;
  *    this.sampleService.deleteSample(id).subscribe(
  *      resp => {
  *        if (resp.errors.length > 0) {
  *          console.log('Delete resource errors', resp.errors);
  *        } else {
  *          console.log('Successful deleted resource');
  *          }
  *        },
  *      err => {
  *        console.log('Failed to delete resource', err);
  *      }
  *    );
  *   }
  * }  
  * 
  */
 
@Injectable({
  providedIn: 'root'
})
export class BaseService {
  defaultOptions: Object = {};

  constructor(private http: HttpClient, private appStore: AppStoreService) {
    this.defaultOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  }

  /**
   * REST API request to perform DELETE action
   * @param url - Relative path
   * @param options - Optional parameter
   * @return an `Observable` object of DELETE response. 
   */
  public deleteData(url: string, options?: Object): Observable<any> {
    return this.http.delete<any>(this.getUrlWithToken(url), this.getRestOptions(options));
  }

  /**
   * REST API request to perform GET action
   * @param url - Relative path
   * @param options - Optional parameter
   * @return an `Observable` object of GET response. 
   */
  public getData(url: string, options?: Object): Observable<any> {
    return this.http.get<any>(this.getUrlWithToken(url), this.getRestOptions(options));
  }

  /**
   * REST API request to perform POST action
   * @param url - Relative path
   * @param body - JSON format data
   * @param options - Optional parameter
   * @return an `Observable` object of POST response. 
   */
  public postData(url: string, body: any, options?: Object): Observable<any> {
    return this.http.post<any>(this.getUrlWithToken(url), body, this.getRestOptions(options));
  }

  /**
   * REST API request to perform PUT action
   * @param url - Relative path
   * @param body - JSON format data
   * @param options - Optional parameter
   * @return an `Observable` object of PUT response. 
   */
  public putData(url: string, body: any, options?: Object): Observable<any> {
    return this.http.put<any>(this.getUrlWithToken(url), body, this.getRestOptions(options));
  }

  /**
   * @param url - Relative path
   * @return absolute path with token. 
   */
  public getUrlWithToken(url: string): string {
    let res: string = this.appStore.getData(AppStore.PROFILE, {}).api + url + '?' + this.paramToken();
    return res;
  }

  /**
   * @param dType - File type
   * @param dRef - File reference
   * @return absolute path with token. 
   */
  public getDownloadUrl(dType: string, dRef: string): string {
    let url: string = '/download?type=' + dType + '&file=' + dRef;
    let res: string = this.appStore.getData(AppStore.PROFILE, {}).api + url + '&' + this.paramToken();
    return res;
  }

  private paramToken(): string {
    let token = this.appStore.getAuth()['token'];
    return `token=${token}`;
  }

  private getRestOptions(options?: Object): Object {
    let opts = this.defaultOptions;
    if (options != null && typeof options != 'undefined') {
      opts = {...opts, ...options};
    }
    return opts;
  }

}
