import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PanelModule } from 'primeng/panel';
import { TabViewModule } from 'primeng/tabview';

import { LovsComponent } from './lovs.component';
import { HomeComponent } from './home/home.component';
import { LovsRoutingModule } from './lovs-routing.module';

@NgModule({
  imports: [CommonModule, LovsRoutingModule, PanelModule, TabViewModule],
  declarations: [LovsComponent, HomeComponent]
})
export class LovsModule {}
