import { Component, OnInit } from '@angular/core';
import { Product } from 'src/Productos/Product';
import { ProductsService } from 'src/Productos/products.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  producto: Product;
  uid: number;
  constructor(private productService: ProductsService, private route: ActivatedRoute) {
   }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.uid = Number(params.id);
      console.log(this.uid);
      this.producto = this.productService.getProductById(this.uid);
      console.log(this.producto);
    });
  }

}
