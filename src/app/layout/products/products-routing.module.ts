import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { ProductsComponent } from './products.component';
// import { ProductDetailsComponent } from './product-details/product-details.component';

const routes: Routes = [
  {
    // path: '',
    // component: ProductsComponent,
    // children: [
    //   { path: '', redirectTo: 'products', pathMatch: 'prefix' },
    //   { path: 'products', component: ProductsComponent },
    //   { path: ':id', component: ProductDetailsComponent }
    // ]
    // path: '',
    // component: ProductsComponent,
    // children: [
    //   { path: '', redirectTo: 'products', pathMatch: 'prefix' },
    //   { path: 'productsdetail', component: ProductDetailsComponent, 
    //     children: [
    //       { path: '/:id', component: ProductDetailsComponent }
    //     ]
    //   }
    // ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
