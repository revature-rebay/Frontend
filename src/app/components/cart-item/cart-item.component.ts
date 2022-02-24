import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {
  @Input() itemQuantity !: number;
  @Input()  productName !: string;
  @Input() productPrice !: number;
  @Input() productImage !: ArrayBuffer;
  // @Input() productDesc !: string;

  constructor() { }

 

  ngOnInit(): void {
  }

}
