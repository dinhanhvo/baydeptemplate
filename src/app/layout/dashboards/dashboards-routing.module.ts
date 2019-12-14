import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { DashboardsComponent } from './dashboards.component';
import { HomeComponent } from './home/home.component';

const routes: Route[] = [
  {
    path: '',
    component: DashboardsComponent,
    children: [
      // { path: '', redirectTo: 'home', pathMatch: 'prefix' },
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
export class DashboardsRoutingModule {}
