import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from 'src/home/home.component';
import { ProductMainComponent } from 'src/Productos/product-main/product-main.component';
import { ProductListComponent } from 'src/Productos/product-main/product-list/product-list.component';
import { ProductDetailComponent } from 'src/Productos/product-main/product-detail/product-detail.component';
import { ProductEditComponent } from 'src/Productos/product-main/product-edit/product-edit.component';


const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'product', component: ProductMainComponent,
    children: [
      {path: '', component: ProductListComponent},
      {path: 'new', component: ProductEditComponent},
      {path: ':id', component: ProductDetailComponent},
      {path: ':id/edit', component: ProductEditComponent}
    ]},
  {path: 'monitoreo', component: ProductMainComponent,
    children: [
      {path: '', component: ProductListComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
