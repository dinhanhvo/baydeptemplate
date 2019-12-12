import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { BasRoutingModule } from './bas-routing.module';
import { AdCommonModule } from '../ad-common/ad-common.module';

import { BasComponent } from './bas.component';
import { HomeComponent } from './home/home.component';
import { ListBasComponent } from './list-bas/list-bas.component';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { TabViewModule } from 'primeng/tabview';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';



@NgModule({
  imports: [CommonModule,
    BasRoutingModule,
    PanelModule,
    TabViewModule,
    AdCommonModule,
    TranslateModule,
    CommonModule,
    FormsModule,
    TranslateModule,
    ButtonModule,
    PanelModule,
    TabViewModule,
    InputTextModule,
    DropdownModule,
    ProgressSpinnerModule,
    TableModule],
  declarations: [BasComponent, HomeComponent, ListBasComponent]
})
export class BasModule {}
