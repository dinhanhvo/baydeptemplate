import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  newFdMenu: MenuItem[] = [];

  attrs: [];
  filters: [];
  joins: [];

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.newFdMenu = [
      {
        label: 'New object from database',
        command: () => {
          this.onNewFdFromDb();
        }
      },
      {
        label: 'New custom object',
        command: () => {
          this.onNewCustomFd();
        }
      }
    ];
    console.log('menu', this.newFdMenu);
  }

  onNewFdFromDb() {
    console.log('New folder from db');
  }

  onNewCustomFd() {
    console.log('New custom folder');
  }

  onFolderSelect(folder: any) {
    if (folder != null) {
      //Folder is selected - navigate to edit properties
      this.router.navigate([folder.id], {relativeTo: this.route});
    } else {
      //Folder is deselected
      this.router.navigate(['../'], {relativeTo: this.route});
    }
  }
}
