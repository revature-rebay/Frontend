import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { FeaturedCardComponent } from './components/featured-card/featured-card.component';
import { CartComponent } from './components/cart/cart.component';
import { CartItemComponent } from './components/cart-item/cart-item.component';
import { CartPanelComponent } from './components/cart-panel/cart-panel.component';
import { CartPanelContentComponent } from './components/cart-panel-content/cart-panel-content.component';
import { HeaderComponent } from './components/header/header.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProductPageComponent } from './components/product-page/product-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    FeaturedCardComponent,
    CartComponent,
    CartItemComponent,
    CartPanelComponent,
    CartPanelContentComponent,
    HeaderComponent,
    NavbarComponent,
    ProductPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }