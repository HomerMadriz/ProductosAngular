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

  constructor() {
    this.products = [
      new Product(this.uid++, 'Smartphone', 'LG', 'QuadCore 3GHZ', 12018.5, 5, []),
      new Product(this.uid++, 'Smartwatch', 'SONY', '3GB RAM', 4999.9, 0, []),
      new Product(this.uid++, 'SmartTV', 'SONY', '52", Conexión WIFI', 8999.9, 3, [])
    ];

    this.monitoreo = [];
   }

   getProductos(): Product[] {
     return this.products.slice();
   }

   getProductById(id: number): Product {
    return this.products.find((prod) => prod.uid === id);
   }

   updateProduct(id: number, nombre: string, marca: string, desc: string, precio: number, existencia: number): void {
     const productPos: number = this.products.findIndex((prod) => prod.uid = id);
     this.products[productPos].nombre = nombre;
     this.products[productPos].marca = marca;
     this.products[productPos].descripcion = desc;
     this.products[productPos].precio = precio;
     this.products[productPos].existencia = existencia;
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

   addProduct(nombre: string, marca: string, desc: string, precio: number, existencia: number, espec: Especificacion[]): void {
     this.products.push(new Product(this.uid++, nombre, marca, desc, precio, existencia, espec));
   }

   addToMonitor(ids: number[]): void {
    ids.forEach((id) => this.monitoreo.push(id));
   }

   getMonitor(): number[] {
     return this.monitoreo.slice();
   }

   deleteMonitor(id: number): void {
    const deleteIndex = this.monitoreo.findIndex((uid) => uid === id);
    this.monitoreo.splice(deleteIndex, 1);
   }
}
