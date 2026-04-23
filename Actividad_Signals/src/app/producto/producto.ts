import { Component } from '@angular/core';

@Component({
  selector: 'app-producto',
  imports: [],
  templateUrl: './producto.html',
  styleUrl: './producto.css',
})
export class Producto {
  price = 10;
  quantity = 1;

  total = this.price * this.quantity;
}
