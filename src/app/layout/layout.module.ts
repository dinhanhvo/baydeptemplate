import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';

import { HomepageComponent } from './homepage/homepage.component';
import { HomeHeaderComponent } from './components/home-header/home-header.component';
import { HomeFooterComponent } from './components/home-footer/home-footer.component';
import { HomeCarouselComponent } from './components/home-carousel/home-carousel.component';
import { ProductsComponent } from './products/products.component';

@NgModule({
  imports: [CommonModule, LayoutRoutingModule, TranslateModule, NgbDropdownModule],
  declarations: [LayoutComponent, SidebarComponent, HeaderComponent, HomepageComponent, HomeHeaderComponent, HomeFooterComponent, HomeCarouselComponent, ProductsComponent]
})
export class LayoutModule {}
