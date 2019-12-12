import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { FoldersComponent } from './folders.component';
import { HomeComponent } from './home/home.component';
import { FolderPropertiesComponent } from './folder-properties/folder-properties.component';

const routes: Route[] = [
  {
    path: '',
    component: FoldersComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'prefix' },
      { path: 'home', component: HomeComponent, 
        children: [
          { path: ':id', component: FolderPropertiesComponent }
        ]
      }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FoldersRoutingModule {}
