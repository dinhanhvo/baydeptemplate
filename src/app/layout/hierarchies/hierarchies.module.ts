import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HierarchiesComponent } from './hierarchies.component';
import { HomeComponent } from './home/home.component';
import { HierarchiesRoutingModule } from './hierarchies-routing.module';

@NgModule({
  imports: [CommonModule, HierarchiesRoutingModule],
  declarations: [HierarchiesComponent, HomeComponent]
})
export class HierarchiesModule {}
