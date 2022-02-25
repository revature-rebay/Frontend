import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { ProductPageComponent } from './components/product-page/product-page.component';

const routes: Routes = [{
  path: 'main',
  component: MainComponent
}, {
  path: 'login',
  component: LoginComponent
}, {
  path: 'product_page',
  component: ProductPageComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
