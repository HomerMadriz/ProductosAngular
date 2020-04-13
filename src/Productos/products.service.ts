import { Injectable } from '@angular/core';
import { Product, Especificacion } from './Product';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  products: Product[];
  monitoreo: number[];
  uid = 100;

  productSubject = new Subject<Product[]>();
  monitorSubject = new Subject<number[]>();

  constructor() {
    this.products = [
      new Product(this.uid++, 'Smartphone', 'LG', 'QuadCore 3GHZ', 12018.5, 5, [new Especificacion('RAM', '4', 'GB')]),
      new Product(this.uid++, 'Smartwatch', 'SONY', '3GB RAM', 4999.9, 0, [new Especificacion('Material', 'Gold', '14k')]),
      new Product(this.uid++, 'SmartTV', 'SONY', '52", Conexión WIFI', 8999.9, 3, [new Especificacion('RAM', '4', 'GB')])
    ];

    this.monitoreo = [];

    this.productSubject.next(this.getProductos());
    this.monitorSubject.next(this.getMonitor());
   }

   getProductos(): Product[] {
     return this.products.slice();
   }

   getProductById(id: number): Product {
    return this.products.find((prod) => prod.uid === id);
   }

   updateProduct(producto: Product): void {
     const productPos: number = this.products.findIndex((prod) => prod.uid = producto.uid);
     this.products.splice(productPos, 1, producto);
   }

   deleteProduct(id: number): void {
    const productPos: number = this.products.findIndex((prod) => prod.uid === id);
    const monitorPos: number = this.monitoreo.findIndex((prod) => prod === id);
    if (monitorPos !== -1) {
      this.monitoreo.splice(monitorPos, 1);
    }
    this.products.splice(productPos, 1);
    console.log(this.products);
    this.productSubject.next(this.getProductos());
   }

   addProduct(newProduct: Product): void {
     this.products.push(newProduct);
   }

   addToMonitor(ids: number[]): void {
    ids.forEach((id) => {
      const monitorPos: number = this.monitoreo.findIndex((prod) => prod === id);
      if (monitorPos === -1) {
        this.monitoreo.push(id);
      }
    });
   }

   getMonitor(): number[] {
     return this.monitoreo.slice();
   }

   deleteMonitor(id: number): void {
    const deleteIndex = this.monitoreo.findIndex((uid) => uid === id);
    this.monitoreo.splice(deleteIndex, 1);
    console.log(this.monitoreo);
    this.monitorSubject.next(this.getMonitor());
   }
}
