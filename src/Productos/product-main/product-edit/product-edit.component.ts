import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/Productos/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product, Especificacion } from 'src/Productos/Product';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {
  producto: Product;
  newProduct: Product;
  uid: number;
  creationMode: boolean;
  marcas: string[];
  atributo: string;
  valor: string;
  unidad: string;
  especs: Especificacion[] = [];

  constructor(private productService: ProductsService, private route: ActivatedRoute, private router: Router) {
    this.marcas = ['LG', 'SONY', 'SAMSUNG', 'APPLE', 'DELL'];
   }

  ngOnInit(): void {
    // tslint:disable-next-line: deprecation
    this.creationMode = this.router.url.includes('/new');
    if (!this.creationMode) {
      console.log('Esto no es creationMode');
      this.route.params.subscribe((params) => {
        this.uid = Number(params.id);
        console.log(this.uid);
        this.producto = this.productService.getProductById(this.uid);
        console.log(this.producto);
      });
    } else {
      this.newProduct = new Product(0, '', '', '', 0, 0, this.especs);
    }
  }

  submit(form: NgForm): void {
    console.log(form);
    if (form.valid) {
      this.productService.addProduct(this.newProduct);
      this.router.navigate(['/product']);
    }
  }

  submitUpdate(form: NgForm): void {
    console.log('Submit update');
    if (form.valid) {
      this.productService.updateProduct(this.producto);
      this.router.navigate(['/product']);
    }
  }

  cancelar(): void {
    this.router.navigate(['/product']);
  }

  addEspecificacion(): void {
    this.newProduct.especificacion.push(new Especificacion(this.atributo, this.valor, this.unidad));
  }

  editarEspecificacion(): void {
    this.producto.especificacion.push(new Especificacion(this.atributo, this.valor, this.unidad));
  }

  eliminarEspecificacion(at: string, val: string, un: string): void {
    let pos: number;
    if(this.creationMode) {
      pos = this.newProduct.especificacion.findIndex((esp) => {
        return esp.atributo === at || esp.valor === val || esp.unidad === un;
      });
      this.newProduct.especificacion.splice(pos, 1);
    } else {
      pos = this.producto.especificacion.findIndex((esp) => {
        return esp.atributo === at || esp.valor === val || esp.unidad === un;
      });
      this.producto.especificacion.splice(pos, 1);
    }
  }
}
