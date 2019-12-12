import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { CommonAdminService } from 'src/app/shared/services/common-admin.service';
import { Subscription, Subject, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { CommonFunc } from 'src/app/shared/utils';

interface SearchData {
  qBaId: string;
  qFolderNameKey: string;
  qResultCount: number;
  tableFirst?: number;
  tableSortField?: string;
  tableSortOrder?: number;
}

/**
 * This is a component for search and select a folder.
 * Input parameter rowsLimit should be tailored to page design.
 * Optionally folderNameKey & folderBAId can be used for initial search.
 * Event onFolderChange() is provided to track folder selection.
 *
 * @example <caption>HTML template:</caption>
 *  <app-list-folders
 *    [rowsLimit]="10"
 *    [folderNameKey]="'fe'"
 *    [folderBAId]="5603101"
 *    (onFolderChange)="onFolderSelect($event)">
 *  </app-list-folders>
 *
 * @example <caption>Type Script:</caption>
 *  onFolderSelect(folder: any) {
 *    if (folder != null) {
 *      console.log('Selected folder id:', folder.id);
 *    } else {
 *      console.log('Folder selection is empty.');
 *    }
 *  }
 */
@Component({
  selector: 'app-list-folders',
  templateUrl: './list-folders.component.html',
  styleUrls: ['./list-folders.component.scss']
})
export class ListFoldersComponent implements OnInit, OnDestroy {
  /** Rows per page*/
  @Input() rowsLimit: number = 10;
  /** Folder name input parameter*/
  @Input() folderNameKey: string = null;
  /** Business area ID input parameter*/
  @Input() folderBAId: number = null;

  /** Event when folder (table row) is selected/unselected.
   * @param output - Reference to selected folder object. Value is null when selection is empty.
   */
  @Output() onFolderChange: EventEmitter<any> = new EventEmitter();

  // Visual component properties
  optionsBAs = [];
  tableCols = [
    { field: 'name', header: 'Folder Name', width: '60%' },
    { field: 'developerKey', header: 'Developer Key', width: '40%' }
  ];
  tableData = [];

  // Visual binding variables
  searchData: SearchData = { qBaId: null, qFolderNameKey: null, qResultCount: 0 };
  selectedFolder: any = null;
  isSearching: boolean = false;

  // Asynchonous search worker
  private searchWorker = new Subject<SearchData>();
  // Used to cancel all subscriptions
  private subscriptions: Subscription[] = [];

  constructor(private adminService: CommonAdminService) {}

  ngOnInit() {
    this.loadBusinessAreas();
    this.initSearchObserver();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }

  onClearSearchName() {
    this.searchData.qFolderNameKey = null;
    this.onSearchFolders();
  }

  onSearchFolders() {
    // Only reset to first page - parameters are binded to visual controls
    this.searchData.tableFirst = 0;
    // Should clone the data before execute
    this.searchWorker.next({ ...this.searchData });
  }

  onRowSelect(event) {
    this.onFolderChange.emit(this.selectedFolder);
  }

  onRowUnselect(event) {
    this.onFolderChange.emit(null);
  }

  /** Lazy loading a list with business area names and Ids*/
  private loadBusinessAreas() {
    this.adminService.getBas().subscribe(
      resp => {
        if (resp.errors.length > 0) {
          console.log('ListFoldersComponent: Loading business areas errors', resp.errors);
        } else {
          let listBAs = [];
          if (resp.data.list != null) {
            listBAs = [...resp.data.list];
          } else {
            console.log('ListFoldersComponent: Business areas list is missing in response');
          }
          // Prepare dropdown list options
          this.optionsBAs = [];
          for (let index = 0; index < listBAs.length; index++) {
            this.optionsBAs.push({ label: listBAs[index].name, value: String(listBAs[index].id) });
          }
          // Apply component input parameters
          if (this.folderBAId != null && this.searchData.qBaId == null) {
            let ba = this.optionsBAs.find(elm => {
              return elm.value === this.folderBAId.toString();
            });
            this.searchData.qBaId = ba.value;
          }
          if (this.folderNameKey != null) {
            this.searchData.qFolderNameKey = this.folderNameKey;
          } else if (this.searchData.qBaId == null) {
            // To avoid initial huge search
            if (this.optionsBAs.length > 0) {
              this.searchData.qBaId = this.optionsBAs[0].value;
            }
          }
          // Execute search worker
          this.onSearchFolders();
        }
      },
      err => {
        console.log('ListFoldersComponent: Failed to load business areas', err);
      }
    );
  }

  /** Initialize an asynchronous, 0.5 sec. delayed search observer. */
  initSearchObserver() {
    let subscrWorker = this.searchWorker
      .pipe(
        // wait 500ms after each keystroke before considering to search
        debounceTime(500),
        // ignore if it is the same as previous
        distinctUntilChanged((x: SearchData, y: SearchData) => JSON.stringify(x) === JSON.stringify(y)),
        // switch (previous will be canceled) to new search observable each time the criteria is changed
        switchMap((data: SearchData) => {
          return of(data);
        })
      )
      .subscribe(data => {
        // The first subscription is the worker and he should stay active
        while (this.subscriptions.length > 1) {
          this.subscriptions.pop().unsubscribe();
        }
        // Initiate search
        this.processSearch(data);
      });
    this.subscriptions.push(subscrWorker);
  }

  /** Folders asynchronous API search*/
  processSearch(data: SearchData) {
    let apiQuery = {
      filter: '',
      offset: 0,
      limit: this.rowsLimit,
      lang: sessionStorage.getItem('lang'),
      sort: '+name'
    };
    // Fill in given search parameters. In RSQL AND is substituted width ';' (',' was OR)
    if (data.qBaId != null) {
      apiQuery.filter = 'baId==' + data.qBaId;
    }
    if (data.qFolderNameKey != null && data.qFolderNameKey.length > 0) {
      if (apiQuery.filter.length > 0) {
        apiQuery.filter += ';';
      }
      //Because RSQL not support combination between OR+AND, the virtual column is used
      apiQuery.filter += 'folderNameKey=="*' + data.qFolderNameKey + '*"';
    }

    // Optional parameter from visualization control
    if (!CommonFunc.isEmpty(data.tableFirst)) {
      apiQuery.offset = data.tableFirst;
    }
    if (!CommonFunc.isEmpty(data.tableSortField)) {
      if (data.tableSortOrder == -1) {
        apiQuery.sort = '-';
      } else {
        apiQuery.sort = '+';
      }
      apiQuery.sort += data.tableSortField;
    }

    // Send API request
    // console.log("Search folders request", JSON.stringify(apiQuery));
    this.isSearching = true;
    let subscrRest = this.adminService.getFolders(apiQuery).subscribe(
      resp => {
        this.isSearching = false;
        if (resp.errors.length > 0) {
          this.searchData.qResultCount = 0;
          console.log('ListFoldersComponent: Loading folders errors', resp.errors);
        } else {
          // console.log("Received API response", resp.data);
          if (resp.data.list != null) {
            this.searchData.qResultCount = resp.data.count;
            this.tableData = [...resp.data.list];
            // Clear selected folder
            if (this.selectedFolder != null) {
              this.selectedFolder = null;
              this.onRowUnselect(null);
            }
          } else {
            this.searchData.qResultCount = 0;
            this.tableData = [];
            console.log('ListFoldersComponent: Folders list is missing in response');
          }
        }
      },
      err => {
        this.isSearching = false;
        console.log('ListFoldersComponent: Failed to load a folders', err);
      }
    );

    // Store subscription in a stack
    this.subscriptions.push(subscrRest);
  }

  onLazyLoad(event: LazyLoadEvent) {
    this.searchData.tableFirst = event.first;
    this.searchData.tableSortField = event.sortField;
    this.searchData.tableSortOrder = event.sortOrder;
    // Use direct or deferred search
    if (!CommonFunc.isEmpty(this.searchData.tableFirst)) {
      this.processSearch({ ...this.searchData });
    } else {
      this.searchWorker.next({ ...this.searchData });
    }
  }
}
