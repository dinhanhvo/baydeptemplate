import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FunctionsRoutingModule } from './functions-routing.module';

import { PanelModule } from 'primeng/panel';
import { TabViewModule } from 'primeng/tabview';

import { FunctionsComponent } from './functions.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  imports: [CommonModule, FunctionsRoutingModule, PanelModule, TabViewModule],
  declarations: [FunctionsComponent, HomeComponent]
})
export class FunctionsModule {}
