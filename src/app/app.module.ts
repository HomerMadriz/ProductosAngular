import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductMainComponent } from '../Productos/product-main/product-main.component';
import { HomeComponent } from '../home/home.component';
import { NotFoundComponent } from '../not-found/not-found.component';
import { HeaderComponent } from '../header/header.component';
import { ProductListComponent } from '../Productos/product-main/product-list/product-list.component';
import { ProductComponent } from '../Productos/product-main/product-list/product/product.component';
import { ProductDetailComponent } from '../Productos/product-main/product-detail/product-detail.component';
import { ProductEditComponent } from '../Productos/product-main/product-edit/product-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductMainComponent,
    HomeComponent,
    NotFoundComponent,
    HeaderComponent,
    ProductListComponent,
    ProductComponent,
    ProductDetailComponent,
    ProductEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
