import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { ProductDetailsPageComponent } from './components/product-details-page/product-details-page.component';
import { SalesItemComponent } from './components/sales-item/sales-item.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { RedirectComponent } from './components/redirect/redirect.component';

const routes: Routes = [{
  path: 'main',
  component: MainComponent
}, {
  path: 'login',
  component: LoginComponent
}, {
  path: 'product_details_page/:productId',
  component: ProductDetailsPageComponent
},{
  path: 'sales',
  component:SalesItemComponent
},{
  path: 'add_product',
  component: AddProductComponent
},{
  path: 'search_results',
  component:SearchResultsComponent
}, {
  path: 'redirect',
  component:RedirectComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
