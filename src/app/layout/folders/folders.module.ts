import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { FoldersRoutingModule } from './folders-routing.module';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';

import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { TabViewModule } from 'primeng/tabview';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TableModule } from 'primeng/table';
import { AccordionModule } from 'primeng/accordion';

import { FoldersComponent } from './folders.component';
import { HomeComponent } from './home/home.component';
import { ListFoldersComponent } from './list-folders/list-folders.component';
import { FolderPropertiesComponent } from './folder-properties/folder-properties.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    FoldersRoutingModule,
    ConfirmDialogModule,
    ToastModule,
    ButtonModule,
    PanelModule,
    TabViewModule,
    InputTextModule,
    InputTextareaModule,
    DropdownModule,
    ProgressSpinnerModule,
    TableModule,
    AccordionModule
  ],
  declarations: [FoldersComponent, HomeComponent, ListFoldersComponent, FolderPropertiesComponent],
  providers: [MessageService, ConfirmationService]
})
export class FoldersModule {}
