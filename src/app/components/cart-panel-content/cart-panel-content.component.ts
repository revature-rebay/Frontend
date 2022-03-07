
//This component is mostly just a wrapper for the App-Cart element. This could be expanded 
//or taken out as needed. 

import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-cart-panel-content',
  templateUrl: './cart-panel-content.component.html',
  styleUrls: ['./cart-panel-content.component.css']
})
export class CartPanelContentComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {}

}
