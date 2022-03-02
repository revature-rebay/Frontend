import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { FeaturedCardComponent } from './components/featured-card/featured-card.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SalesItemComponent } from './components/sales-item/sales-item.component';
import { ProductDetailsPageComponent } from './components/product-details-page/product-details-page.component';
import { PasswordStrengthMeterModule, } from 'angular-password-strength-meter';
import { SearchResultsComponent } from './components/search-results/search-results.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    FeaturedCardComponent,
    NavbarComponent,
    SalesItemComponent,
    ProductDetailsPageComponent,
    SearchResultsComponent,
    
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    PasswordStrengthMeterModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }