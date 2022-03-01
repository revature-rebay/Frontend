import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartDetailPageComponent } from './components/cart-detail-page/cart-detail-page.component'; 
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { ProductPageComponent } from './components/product-page/product-page.component';
import { HeaderComponent } from './components/header/header.component';

const routes: Routes = [{
  path: 'main',
  component: MainComponent
}, {
  path: 'login',
  component: LoginComponent
}, 
{
  path: 'cart',
  component: HeaderComponent
}, {
  path: 'product_page',
  component: ProductPageComponent
}, 
{
  path: 'cart_detail_page', 
  component: CartDetailPageComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
