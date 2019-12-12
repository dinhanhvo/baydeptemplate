import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { HierarchiesComponent } from './hierarchies.component';
import { HomeComponent } from './home/home.component';

const routes: Route[] = [
  {
    path: '',
    component: HierarchiesComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'prefix' },
      {
        path: 'home',
        component: HomeComponent
      }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HierarchiesRoutingModule {}
