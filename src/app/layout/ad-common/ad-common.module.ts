import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdFoldersComponent } from './ad-folders/ad-folders.component';
import { AdItemsComponent } from './ad-items/ad-items.component';

@NgModule({
  imports: [CommonModule],
  declarations: [AdFoldersComponent, AdItemsComponent],
  exports: [AdFoldersComponent, AdItemsComponent]
})
export class AdCommonModule {}
