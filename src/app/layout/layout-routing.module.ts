import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ProductsComponent } from './products/products.component';
import {ProductDetailsComponent} from './products/product-details/product-details.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'prefix' },
      { path: 'bas', loadChildren: () => import('./bas/bas.module').then(m => m.BasModule) },
      {
        path: 'home',
        component: HomepageComponent
      },
      {
        path: 'products',
        component: ProductsComponent
        // loadChildren: () => import('./products/products.module').then(m => m.ProductsModule)
      },
      {
        path: 'productsdetail',
        component: ProductDetailsComponent
      },
      {
        path: 'folders',
        loadChildren: () => import('./folders/folders.module').then(m => m.FoldersModule)
      },
      {
        path: 'functions',
        loadChildren: () => import('./functions/functions.module').then(m => m.FunctionsModule)
      },
      {
        path: 'hierarchies',
        loadChildren: () => import('./hierarchies/hierarchies.module').then(m => m.HierarchiesModule)
      },
      {
        path: 'lovs',
        loadChildren: () => import('./lovs/lovs.module').then(m => m.LovsModule)
      },
      // { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
      { path: 'charts', loadChildren: () => import('./charts/charts.module').then(m => m.ChartsModule) },
      { path: 'tables', loadChildren: () => import('./tables/tables.module').then(m => m.TablesModule) },
      { path: 'forms', loadChildren: () => import('./form/form.module').then(m => m.FormModule) },
      { path: 'bs-element', loadChildren: () => import('./bs-element/bs-element.module').then(m => m.BsElementModule) },
      { path: 'grid', loadChildren: () => import('./grid/grid.module').then(m => m.GridModule) },
      {
        path: 'components',
        loadChildren: () => import('./bs-component/bs-component.module').then(m => m.BsComponentModule)
      },
      { path: 'blank-page', loadChildren: () => import('./blank-page/blank-page.module').then(m => m.BlankPageModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule {}
