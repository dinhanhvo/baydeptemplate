import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PanelModule } from 'primeng/panel';
import { TabViewModule } from 'primeng/tabview';

import { DashboardsComponent } from './dashboards.component';
import { HomeComponent } from './home/home.component';
import { DashboardsRoutingModule } from './dashboards-routing.module';

@NgModule({
  imports: [CommonModule, DashboardsRoutingModule, PanelModule, TabViewModule],
  declarations: [DashboardsComponent, HomeComponent]
})
export class DashboardsModule {}
