import { Component, OnInit } from '@angular/core';
import { Product } from 'src/Productos/Product';
import { ProductsService } from 'src/Productos/products.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  productList: Product[];
  productMonitorList: Product[];
  filtroMonitor: Product[];
  filtro: Product[];
  busqueda = '';
  listMode: boolean;
  listaParaMonitorear: number[];
  productSubscription = new Subscription();

  constructor(private productService: ProductsService, private router: Router) {
    this.productList = this.productService.getProductos();
    this.filtro = this.productList;
    this.productMonitorList = this.productService.getMonitor().map((id) => {
      return productService.getProductById(id);
    });
    this.filtroMonitor = this.productMonitorList;
    this.listaParaMonitorear = [];
    this.listMode = this.router.url.includes('/product');

    this.productService.productSubject.subscribe((data) => {
      console.log('Observando productos: ' + data);
      this.productList = data;
      this.filtro = this.productList;
    });

    this.productService.monitorSubject.subscribe((data) => {
      console.log('Observando monitor' + data);
      this.productMonitorList = data.map(id => productService.getProductById(id));
      this.filtroMonitor = this.productMonitorList;
    });
   }

  ngOnInit(): void {
  }

  buscar() {
    this.filtro = this.productList.filter((prod) => prod.nombre.toUpperCase().includes(this.busqueda.toUpperCase()));
  }

  buscarEnMonitoreo() {
    this.filtroMonitor = this.productMonitorList.filter((prod) => prod.nombre.toUpperCase().includes(this.busqueda.toUpperCase()));
  }

  agregarAPorMonitorear(uid: number): void {
    const existIndex = this.listaParaMonitorear.findIndex((id) => id === uid);
    if (existIndex < 0) {
      this.listaParaMonitorear.push(uid);
    } else {
      this.listaParaMonitorear.splice(existIndex, 1);
    }
    console.log(this.listaParaMonitorear);
  }

  monitorear(): void {
    this.productService.addToMonitor(this.listaParaMonitorear);
  }

  eliminarProducto(uid: number): void {
    this.productService.deleteProduct(uid);
  }

  eliminarMonitor(uid: number): void {
    this.productService.deleteMonitor(uid);
  }
}
