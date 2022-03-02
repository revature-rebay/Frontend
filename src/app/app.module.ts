import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { CartDetailPageComponent } from './components/cart-detail-page/cart-detail-page.component';
import { CartDetailPageItemComponent } from './components/cart-detail-page-item/cart-detail-page-item.component';
import { SalesItemComponent } from './components/sales-item/sales-item.component';
import { ProductDetailsPageComponent } from './components/product-details-page/product-details-page.component';
import { PasswordStrengthMeterModule } from 'angular-password-strength-meter';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { CheckoutComponent } from './components/checkout/checkout.component';


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
    CartDetailPageComponent,
    CartDetailPageItemComponent,
    SalesItemComponent,
    ProductDetailsPageComponent,
    SearchResultsComponent, 
    CheckoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    PasswordStrengthMeterModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }