import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subject, Subscription, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { CommonAdminService } from 'src/app/shared/services/common-admin.service';
import { JsonPipe } from '@angular/common';
import { CommonFunc } from 'src/app/shared/utils';
import { LazyLoadEvent } from 'primeng/api';

interface SearchData {
  baNameKey: string;
  qResultCount: number;
  tableFirst?: number;
  tableSortField?: string;
  tableSortOrder?: number;
}

@Component({
  selector: 'app-list-bas',
  templateUrl: './list-bas.component.html',
  styleUrls: ['./list-bas.component.scss']
})
export class ListBasComponent implements OnInit, OnDestroy {

  /** Rows per page*/
  @Input() rowsLimit: number = 10;
  basName: String = '';

  // Asynchonous search worker
  private searchWorker = new Subject<SearchData>();

  // Used to cancel all subscriptions
  private subscriptions: Subscription[] = [];
  isSearching: boolean;
  searchData: SearchData = { baNameKey: null, qResultCount: 0 };


  tableCols = [
    { field: 'name', header: 'Buisness area', width: '60%' },
    { field: 'developerKey', header: 'Developer Key', width: '40%' }
  ];

  tableData = [];

  constructor(private adminService: CommonAdminService ) {

  }

  ngOnInit() {
    this.initSearchObserver();
   //this.processSearch(this.searchData);
  }


  onClearSearch() {
    this.searchData.baNameKey = '';
    this.onSearch();
  }

  onSearch() {
    this.searchData.tableFirst = 0;
        // Should clone the data before execute
        this.searchWorker.next({ ...this.searchData });
  }

    /** Initialize an asynchronous, 0.5 sec. delayed search observer. */
    initSearchObserver() {
      // tslint:disable-next-line:prefer-const
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
      filter: 'baNameKey=="*' + data.baNameKey + '*"',
      offset: 0,
      limit: this.rowsLimit,
      lang: sessionStorage.getItem('lang'),
      sort: '+name'
    };
    if(CommonFunc.isEmpty(data.baNameKey)){
      apiQuery.filter = '';
    }

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
    let subscrRest = this.adminService.getBas(apiQuery).subscribe(
      resp => {
        this.isSearching = false;
        if (resp.errors.length > 0) {
          console.log('Loading folders errors', resp.errors);
        } else {
          // console.log("Received API response", resp.data);
          if (resp.data.list != null) {
            console.log(resp.data.list);
            this.searchData.qResultCount = resp.data.count;
            this.tableData = [...resp.data.list];
          } else {
            console.log(resp.data + 'list is missing in response');
            this.searchData.qResultCount = 0;
            this.tableData = [];
          }
        }
      },
      err => {
        this.isSearching = false;
        console.log('Failed to load a BAS', err);
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


  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }


}
