import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/Productos/Product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @Input() producto: Product;
  @Input() listMode: boolean;
  @Output() monitorear = new EventEmitter();
  @Output() eliminarProducto = new EventEmitter();
  @Output() eliminarMonitor = new EventEmitter();

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  marcarMonitoreo(): void {
    console.log('Enviando al padre-> uid: ' + this.producto.uid);
    this.monitorear.emit(this.producto.uid);
  }

  eliminarProductoLista(): void {
    this.eliminarProducto.emit(this.producto.uid);
  }

  eliminarProductoMonitoreo(): void {
    this.eliminarMonitor.emit(this.producto.uid);
  }
}
