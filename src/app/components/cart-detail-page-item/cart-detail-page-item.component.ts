import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-cart-detail-page-item',
  templateUrl: './cart-detail-page-item.component.html',
  styleUrls: ['./cart-detail-page-item.component.css']
})
export class CartDetailPageItemComponent implements OnInit {

  @Input() itemQuantity !: number;
  @Input() productName !: string;
  @Input() productPrice !: number;
  @Input() productDesc !: string;
  @Input() productImage !: ArrayBuffer;
  @Input() productId !: number;
  @Input() currentStock !: number;

  constructor() { }

  ngOnInit(): void {
  }
}
